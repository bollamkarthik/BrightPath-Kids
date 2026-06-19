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

create or replace function public.academy_roster()
returns jsonb
language sql
security definer
set search_path = public
as $$
  select public.academy_roster('dashboard');
$$;

create or replace function public.academy_delete_student(target_student_id uuid)
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

create or replace function public.academy_delete_parent(target_parent_id uuid)
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
grant execute on function public.academy_delete_student(uuid) to anon, authenticated;
grant execute on function public.academy_delete_parent(uuid) to anon, authenticated;

notify pgrst, 'reload schema';
