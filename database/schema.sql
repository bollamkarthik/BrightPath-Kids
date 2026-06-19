create extension if not exists pgcrypto;

create table if not exists public.parents (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.parents(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  age integer not null check (age between 4 and 18),
  state text not null default 'NA',
  code text not null unique,
  placement jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.students(id) on delete cascade,
  subject text not null check (subject in ('math', 'english')),
  path text,
  mode text,
  skill text,
  difficulty text,
  question text not null,
  answer text not null,
  correct_answer text not null,
  explanation text,
  correct boolean not null,
  created_at timestamptz not null default now()
);

create table if not exists public.academy_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.parents enable row level security;
alter table public.students enable row level security;
alter table public.attempts enable row level security;
alter table public.academy_admins enable row level security;

create or replace function public.is_academy_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.academy_admins
    where user_id = auth.uid()
  );
$$;

drop policy if exists "parents can read own profile" on public.parents;
create policy "parents can read own profile"
on public.parents for select
using (id = auth.uid() or public.is_academy_admin());

drop policy if exists "parents can insert own profile" on public.parents;
create policy "parents can insert own profile"
on public.parents for insert
with check (id = auth.uid());

drop policy if exists "parents can update own profile" on public.parents;
create policy "parents can update own profile"
on public.parents for update
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "admins can delete parents" on public.parents;
create policy "admins can delete parents"
on public.parents for delete
using (public.is_academy_admin());

drop policy if exists "parents and admins can read students" on public.students;
create policy "parents and admins can read students"
on public.students for select
using (parent_id = auth.uid() or public.is_academy_admin());

drop policy if exists "parents can add own students" on public.students;
create policy "parents can add own students"
on public.students for insert
with check (parent_id = auth.uid());

drop policy if exists "parents can update own students" on public.students;
create policy "parents can update own students"
on public.students for update
using (parent_id = auth.uid())
with check (parent_id = auth.uid());

drop policy if exists "parents and admins can delete students" on public.students;
create policy "parents and admins can delete students"
on public.students for delete
using (parent_id = auth.uid() or public.is_academy_admin());

drop policy if exists "parents and admins can read attempts" on public.attempts;
create policy "parents and admins can read attempts"
on public.attempts for select
using (
  public.is_academy_admin()
  or exists (
    select 1
    from public.students
    where students.id = attempts.child_id
      and students.parent_id = auth.uid()
  )
);

drop policy if exists "parents can add attempts for own students" on public.attempts;
create policy "parents can add attempts for own students"
on public.attempts for insert
with check (
  exists (
    select 1
    from public.students
    where students.id = attempts.child_id
      and students.parent_id = auth.uid()
  )
);

drop policy if exists "parents and admins can delete attempts" on public.attempts;
create policy "parents and admins can delete attempts"
on public.attempts for delete
using (
  public.is_academy_admin()
  or exists (
    select 1
    from public.students
    where students.id = attempts.child_id
      and students.parent_id = auth.uid()
  )
);

drop policy if exists "admins can read academy admin table" on public.academy_admins;
create policy "admins can read academy admin table"
on public.academy_admins for select
using (user_id = auth.uid());

create or replace function public.student_portal_by_code(
  student_first_name text,
  student_last_name text,
  student_code text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_student public.students%rowtype;
  student_attempts jsonb;
begin
  select *
  into selected_student
  from public.students
  where lower(first_name) = lower(trim(student_first_name))
    and lower(last_name) = lower(trim(student_last_name))
    and upper(code) = upper(trim(student_code))
  limit 1;

  if not found then
    raise exception 'No student matches that name and child code.';
  end if;

  select coalesce(jsonb_agg(to_jsonb(attempts) order by attempts.created_at desc), '[]'::jsonb)
  into student_attempts
  from public.attempts
  where attempts.child_id = selected_student.id;

  return jsonb_build_object(
    'student', to_jsonb(selected_student),
    'attempts', student_attempts
  );
end;
$$;

create or replace function public.submit_student_attempt(
  student_id uuid,
  student_code text,
  attempt_subject text,
  attempt_path text,
  attempt_mode text,
  attempt_skill text,
  attempt_difficulty text,
  attempt_question text,
  attempt_answer text,
  attempt_correct_answer text,
  attempt_explanation text,
  attempt_correct boolean,
  attempt_created_at timestamptz,
  student_placement jsonb default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_student public.students%rowtype;
  saved_attempt public.attempts%rowtype;
begin
  select *
  into selected_student
  from public.students
  where id = student_id
    and upper(code) = upper(trim(student_code))
  limit 1;

  if not found then
    raise exception 'The child code does not match this student.';
  end if;

  insert into public.attempts (
    child_id,
    subject,
    path,
    mode,
    skill,
    difficulty,
    question,
    answer,
    correct_answer,
    explanation,
    correct,
    created_at
  )
  values (
    selected_student.id,
    attempt_subject,
    attempt_path,
    attempt_mode,
    attempt_skill,
    attempt_difficulty,
    attempt_question,
    attempt_answer,
    attempt_correct_answer,
    attempt_explanation,
    attempt_correct,
    coalesce(attempt_created_at, now())
  )
  returning * into saved_attempt;

  if student_placement is not null then
    update public.students
    set placement = student_placement
    where id = selected_student.id;
  end if;

  return to_jsonb(saved_attempt);
end;
$$;

grant execute on function public.student_portal_by_code(text, text, text) to anon, authenticated;
grant execute on function public.submit_student_attempt(uuid, text, text, text, text, text, text, text, text, text, text, boolean, timestamptz, jsonb) to anon, authenticated;

drop function if exists public.academy_roster(text);
drop function if exists public.academy_roster();
drop function if exists public.academy_delete_student(text, uuid);
drop function if exists public.academy_delete_parent(text, uuid);

create or replace function public.academy_roster(request_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  parent_rows jsonb;
  student_rows jsonb;
  attempt_rows jsonb;
begin
  if request_token <> 'dashboard' then
    raise exception 'Invalid academy request.';
  end if;

  if not public.is_academy_admin() then
    raise exception 'This account is not an academy admin.';
  end if;

  select coalesce(jsonb_agg(to_jsonb(parents) order by parents.created_at), '[]'::jsonb)
  into parent_rows
  from public.parents;

  select coalesce(jsonb_agg(to_jsonb(students) order by students.created_at), '[]'::jsonb)
  into student_rows
  from public.students;

  select coalesce(jsonb_agg(to_jsonb(attempts) order by attempts.created_at desc), '[]'::jsonb)
  into attempt_rows
  from public.attempts;

  return jsonb_build_object(
    'parents', parent_rows,
    'students', student_rows,
    'attempts', attempt_rows
  );
end;
$$;

create or replace function public.academy_delete_student(
  target_student_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_academy_admin() then
    raise exception 'This account is not an academy admin.';
  end if;

  delete from public.students
  where id = target_student_id;
end;
$$;

create or replace function public.academy_delete_parent(
  target_parent_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_academy_admin() then
    raise exception 'This account is not an academy admin.';
  end if;

  delete from public.parents
  where id = target_parent_id;
end;
$$;

grant execute on function public.academy_roster(text) to authenticated;
grant execute on function public.academy_delete_student(uuid) to authenticated;
grant execute on function public.academy_delete_parent(uuid) to authenticated;

create or replace view public.student_work_summary as
select
  students.id as child_id,
  students.parent_id,
  students.first_name,
  students.last_name,
  students.state,
  attempts.subject,
  count(attempts.id) as total_answers,
  count(attempts.id) filter (where attempts.correct) as right_answers,
  count(attempts.id) filter (where not attempts.correct) as wrong_answers,
  round(
    case
      when count(attempts.id) = 0 then 0
      else (count(attempts.id) filter (where attempts.correct)::numeric / count(attempts.id)::numeric) * 100
    end
  ) as score_percent
from public.students
left join public.attempts on attempts.child_id = students.id
group by students.id, attempts.subject;

notify pgrst, 'reload schema';
