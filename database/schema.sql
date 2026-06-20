create extension if not exists pgcrypto;

create table if not exists public.parents (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  child_limit integer not null default 999999,
  created_at timestamptz not null default now()
);

alter table public.parents drop constraint if exists parents_id_fkey;
alter table public.parents add column if not exists auth_user_id uuid references auth.users(id) on delete set null;
alter table public.parents add column if not exists child_limit integer not null default 999999;
alter table public.parents drop constraint if exists parents_child_limit_check;
alter table public.parents add constraint parents_child_limit_check check (child_limit >= 1);
update public.parents set child_limit = 999999 where child_limit < 999999;
create unique index if not exists parents_auth_user_id_key on public.parents(auth_user_id) where auth_user_id is not null;
update public.parents
set auth_user_id = id
where auth_user_id is null
  and exists (
    select 1
    from auth.users
    where users.id = parents.id
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
  subject text not null check (subject in ('math', 'english', 'fun')),
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

create table if not exists public.parent_questions (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.parents(id) on delete cascade,
  child_id uuid not null references public.students(id) on delete cascade,
  subject text not null check (subject in ('math', 'english', 'fun')),
  prompt text not null default 'Answer this parent check.',
  question text not null,
  correct_answer text not null,
  explanation text,
  status text not null default 'pending' check (status in ('pending', 'answered')),
  child_answer text,
  correct boolean,
  created_at timestamptz not null default now(),
  answered_at timestamptz,
  test_group_id text,
  timed_challenge boolean not null default false,
  challenge_started_at timestamptz,
  challenge_finished_at timestamptz
);

alter table public.parent_questions add column if not exists test_group_id text;
alter table public.parent_questions add column if not exists timed_challenge boolean not null default false;
alter table public.parent_questions add column if not exists challenge_started_at timestamptz;
alter table public.parent_questions add column if not exists challenge_finished_at timestamptz;
alter table public.attempts drop constraint if exists attempts_subject_check;
alter table public.attempts add constraint attempts_subject_check check (subject in ('math', 'english', 'fun'));
alter table public.parent_questions drop constraint if exists parent_questions_subject_check;
alter table public.parent_questions add constraint parent_questions_subject_check check (subject in ('math', 'english', 'fun'));

create table if not exists public.academy_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.parents enable row level security;
alter table public.students enable row level security;
alter table public.attempts enable row level security;
alter table public.parent_questions enable row level security;
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
using (id = auth.uid() or auth_user_id = auth.uid() or public.is_academy_admin());

drop policy if exists "parents can insert own profile" on public.parents;
create policy "parents can insert own profile"
on public.parents for insert
with check (id = auth.uid() or auth_user_id = auth.uid() or public.is_academy_admin());

drop policy if exists "parents can update own profile" on public.parents;
create policy "parents can update own profile"
on public.parents for update
using (id = auth.uid() or auth_user_id = auth.uid())
with check (id = auth.uid() or auth_user_id = auth.uid());

drop policy if exists "admins can delete parents" on public.parents;
create policy "admins can delete parents"
on public.parents for delete
using (public.is_academy_admin());

drop policy if exists "parents and admins can read students" on public.students;
create policy "parents and admins can read students"
on public.students for select
using (
  public.is_academy_admin()
  or exists (
    select 1
    from public.parents
    where parents.id = students.parent_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
  )
);

drop policy if exists "parents can add own students" on public.students;
create policy "parents can add own students"
on public.students for insert
with check (
  public.is_academy_admin()
  or exists (
    select 1
    from public.parents
    where parents.id = students.parent_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
  )
);

drop policy if exists "parents can update own students" on public.students;
create policy "parents can update own students"
on public.students for update
using (
  public.is_academy_admin()
  or exists (
    select 1
    from public.parents
    where parents.id = students.parent_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
  )
)
with check (
  public.is_academy_admin()
  or exists (
    select 1
    from public.parents
    where parents.id = students.parent_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
  )
);

drop policy if exists "parents and admins can delete students" on public.students;
create policy "parents and admins can delete students"
on public.students for delete
using (
  public.is_academy_admin()
  or exists (
    select 1
    from public.parents
    where parents.id = students.parent_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
  )
);

drop policy if exists "parents and admins can read attempts" on public.attempts;
create policy "parents and admins can read attempts"
on public.attempts for select
using (
  public.is_academy_admin()
  or exists (
    select 1
    from public.students
    join public.parents on parents.id = students.parent_id
    where students.id = attempts.child_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
  )
);

drop policy if exists "parents can add attempts for own students" on public.attempts;
create policy "parents can add attempts for own students"
on public.attempts for insert
with check (
  exists (
    select 1
    from public.students
    join public.parents on parents.id = students.parent_id
    where students.id = attempts.child_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
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
    join public.parents on parents.id = students.parent_id
    where students.id = attempts.child_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
  )
);

drop policy if exists "parents and admins can read parent questions" on public.parent_questions;
create policy "parents and admins can read parent questions"
on public.parent_questions for select
using (
  public.is_academy_admin()
  or exists (
    select 1
    from public.parents
    where parents.id = parent_questions.parent_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
  )
);

drop policy if exists "parents can send own child questions" on public.parent_questions;
create policy "parents can send own child questions"
on public.parent_questions for insert
with check (
  public.is_academy_admin()
  or exists (
    select 1
    from public.students
    join public.parents on parents.id = students.parent_id
    where students.id = parent_questions.child_id
      and parents.id = parent_questions.parent_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
  )
);

drop policy if exists "parents can update own child questions" on public.parent_questions;
create policy "parents can update own child questions"
on public.parent_questions for update
using (
  public.is_academy_admin()
  or exists (
    select 1
    from public.parents
    where parents.id = parent_questions.parent_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
  )
)
with check (
  public.is_academy_admin()
  or exists (
    select 1
    from public.parents
    where parents.id = parent_questions.parent_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
  )
);

drop policy if exists "parents and admins can delete parent questions" on public.parent_questions;
create policy "parents and admins can delete parent questions"
on public.parent_questions for delete
using (
  public.is_academy_admin()
  or exists (
    select 1
    from public.parents
    where parents.id = parent_questions.parent_id
      and (parents.id = auth.uid() or parents.auth_user_id = auth.uid())
  )
);

create or replace function public.claim_parent_profile(
  parent_name text,
  parent_email text
)
returns public.parents
language plpgsql
security definer
set search_path = public
as $$
declare
  saved_parent public.parents%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Login required.';
  end if;

  update public.parents
  set
    auth_user_id = auth.uid(),
    name = coalesce(nullif(trim(parent_name), ''), parents.name),
    email = lower(trim(parent_email))
  where lower(email) = lower(trim(parent_email))
    and (auth_user_id is null or auth_user_id = auth.uid() or id = auth.uid())
  returning * into saved_parent;

  if found then
    return saved_parent;
  end if;

  insert into public.parents (id, auth_user_id, name, email)
  values (
    auth.uid(),
    auth.uid(),
    coalesce(nullif(trim(parent_name), ''), 'Parent'),
    lower(trim(parent_email))
  )
  returning * into saved_parent;

  return saved_parent;
end;
$$;

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
  student_parent_questions jsonb;
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

  select coalesce(jsonb_agg(to_jsonb(parent_questions) order by parent_questions.created_at desc), '[]'::jsonb)
  into student_parent_questions
  from public.parent_questions
  where parent_questions.child_id = selected_student.id;

  return jsonb_build_object(
    'student', to_jsonb(selected_student),
    'attempts', student_attempts,
    'parent_questions', student_parent_questions
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

create or replace function public.complete_parent_question(
  question_id uuid,
  student_code text,
  child_answer text,
  was_correct boolean,
  answered_time timestamptz default now()
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_question public.parent_questions%rowtype;
  pending_count integer;
begin
  select parent_questions.*
  into selected_question
  from public.parent_questions
  join public.students on students.id = parent_questions.child_id
  where parent_questions.id = question_id
    and upper(students.code) = upper(trim(student_code))
  limit 1;

  if not found then
    raise exception 'The child code does not match this parent question.';
  end if;

  update public.parent_questions
  set
    status = 'answered',
    child_answer = complete_parent_question.child_answer,
    correct = was_correct,
    answered_at = coalesce(answered_time, now())
  where id = question_id
  returning * into selected_question;

  if selected_question.test_group_id is not null then
    select count(*)
    into pending_count
    from public.parent_questions
    where child_id = selected_question.child_id
      and test_group_id = selected_question.test_group_id
      and status = 'pending';

    if pending_count = 0 then
      update public.parent_questions
      set challenge_finished_at = coalesce(answered_time, now())
      where child_id = selected_question.child_id
        and test_group_id = selected_question.test_group_id
        and challenge_finished_at is null;
    end if;
  end if;

  return to_jsonb(selected_question);
end;
$$;

create or replace function public.start_parent_question_group(
  group_id text,
  student_code text,
  started_time timestamptz default now()
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.parent_questions
  set challenge_started_at = coalesce(challenge_started_at, coalesce(started_time, now()))
  from public.students
  where students.id = parent_questions.child_id
    and parent_questions.test_group_id = group_id
    and upper(students.code) = upper(trim(student_code));

  if not found then
    raise exception 'The child code does not match this challenge.';
  end if;
end;
$$;

grant execute on function public.student_portal_by_code(text, text, text) to anon, authenticated;
grant execute on function public.submit_student_attempt(uuid, text, text, text, text, text, text, text, text, text, text, boolean, timestamptz, jsonb) to anon, authenticated;
grant execute on function public.complete_parent_question(uuid, text, text, boolean, timestamptz) to anon, authenticated;
grant execute on function public.start_parent_question_group(text, text, timestamptz) to anon, authenticated;

drop function if exists public.academy_roster(text);
drop function if exists public.academy_roster();
drop function if exists public.academy_create_parent(text, text);
drop function if exists public.academy_create_student(uuid, text, text, integer, text, text);
drop function if exists public.academy_update_parent_child_limit(uuid, integer);
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
  parent_question_rows jsonb;
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

  select coalesce(jsonb_agg(to_jsonb(parent_questions) order by parent_questions.created_at desc), '[]'::jsonb)
  into parent_question_rows
  from public.parent_questions;

  return jsonb_build_object(
    'parents', parent_rows,
    'students', student_rows,
    'attempts', attempt_rows,
    'parent_questions', parent_question_rows
  );
end;
$$;

create or replace function public.academy_roster()
returns jsonb
language sql
security definer
set search_path = public
as $$
  select public.academy_roster('dashboard');
$$;

create or replace function public.academy_create_parent(
  parent_name text,
  parent_email text
)
returns public.parents
language plpgsql
security definer
set search_path = public
as $$
declare
  saved_parent public.parents%rowtype;
begin
  if not public.is_academy_admin() then
    raise exception 'This account is not an academy admin.';
  end if;

  if nullif(trim(parent_name), '') is null or nullif(trim(parent_email), '') is null then
    raise exception 'Parent name and email are required.';
  end if;

  insert into public.parents (id, name, email)
  values (gen_random_uuid(), trim(parent_name), lower(trim(parent_email)))
  on conflict (email) do update
  set name = excluded.name
  returning * into saved_parent;

  return saved_parent;
end;
$$;

create or replace function public.academy_create_student(
  target_parent_id uuid,
  student_first_name text,
  student_last_name text,
  student_age integer,
  student_state text,
  requested_code text default null
)
returns public.students
language plpgsql
security definer
set search_path = public
as $$
declare
  saved_student public.students%rowtype;
  base_code text;
  final_code text;
begin
  if not public.is_academy_admin() then
    raise exception 'This account is not an academy admin.';
  end if;

  if not exists (select 1 from public.parents where id = target_parent_id) then
    raise exception 'Choose an existing parent before adding a student.';
  end if;

  if nullif(trim(student_first_name), '') is null or nullif(trim(student_last_name), '') is null then
    raise exception 'Student first and last name are required.';
  end if;

  base_code := upper(regexp_replace(trim(student_first_name || student_last_name), '[^a-zA-Z0-9]', '', 'g'));
  base_code := coalesce(nullif(left(base_code, 6), ''), 'KID');
  final_code := coalesce(nullif(upper(trim(requested_code)), ''), base_code || floor(100 + random() * 900)::int::text);

  while exists (select 1 from public.students where code = final_code) loop
    final_code := base_code || floor(100 + random() * 900)::int::text;
  end loop;

  insert into public.students (
    parent_id,
    first_name,
    last_name,
    age,
    state,
    code
  )
  values (
    target_parent_id,
    trim(student_first_name),
    trim(student_last_name),
    least(18, greatest(4, coalesce(student_age, 8))),
    upper(left(coalesce(nullif(trim(student_state), ''), 'NA'), 2)),
    final_code
  )
  returning * into saved_student;

  return saved_student;
end;
$$;

create or replace function public.academy_update_parent_child_limit(
  target_parent_id uuid,
  new_child_limit integer
)
returns public.parents
language plpgsql
security definer
set search_path = public
as $$
declare
  existing_count integer;
  normalized_limit integer;
  saved_parent public.parents%rowtype;
begin
  if not public.is_academy_admin() then
    raise exception 'This account is not an academy admin.';
  end if;

  normalized_limit := greatest(1, coalesce(new_child_limit, 999999));

  select count(*)
  into existing_count
  from public.students
  where parent_id = target_parent_id;

  if existing_count > normalized_limit then
    raise exception 'The child limit cannot be lower than the number of assigned students.';
  end if;

  update public.parents
  set child_limit = normalized_limit
  where id = target_parent_id
  returning * into saved_parent;

  if not found then
    raise exception 'Parent profile was not found.';
  end if;

  return saved_parent;
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

grant execute on function public.academy_roster(text) to anon, authenticated;
grant execute on function public.academy_roster() to anon, authenticated;
grant execute on function public.claim_parent_profile(text, text) to anon, authenticated;
grant execute on function public.academy_create_parent(text, text) to anon, authenticated;
grant execute on function public.academy_create_student(uuid, text, text, integer, text, text) to anon, authenticated;
grant execute on function public.academy_update_parent_child_limit(uuid, integer) to anon, authenticated;
grant execute on function public.academy_delete_student(uuid) to anon, authenticated;
grant execute on function public.academy_delete_parent(uuid) to anon, authenticated;

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
