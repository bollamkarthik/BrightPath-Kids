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
