# Supabase Setup For BrightPath Kids

## 1. Run The Database Setup

1. Open your Supabase project.
2. Go to **SQL Editor**.
3. Open `database/schema.sql` from this project.
4. Copy all of it.
5. Paste it into Supabase SQL Editor.
6. Click **Run**.

This creates:

- parent profiles
- student profiles
- student attempts
- placement results
- academy admin table
- safety rules so parents only see their own students
- child-code login functions so kids only open their own work
- authenticated admin login for the master dashboard
- academy roster and delete functions that only approved admins can use

## 2. Add Your Public Key

Open:

`public/prototype/config.js`

Replace:

`PASTE_SUPABASE_ANON_PUBLIC_KEY_HERE`

with your Supabase **publishable** key.

You can find it in Supabase:

**Project Settings -> API -> Project API keys -> publishable key**

## 3. Create Your First Admin Login

1. In Supabase, go to **Authentication -> Users**.
2. Click **Add user**.
3. Enter the email and password you want to use for the master dashboard.
4. Turn on **Auto Confirm User** if Supabase shows that option.
5. Click **Create user**.

Then open **SQL Editor** and run this, replacing the email:

```sql
insert into public.academy_admins (user_id)
select id
from auth.users
where email = 'YOUR_ADMIN_EMAIL_HERE'
on conflict (user_id) do nothing;
```

Now that email/password can open the master dashboard.

## 4. Upload Changes To GitHub

Upload these changed files to the same GitHub repo:

- `public/prototype/index.html`
- `public/prototype/config.js`
- `public/prototype/script.js`
- `database/schema.sql`
- `database/SETUP_SUPABASE.md`
- `index.html`

Vercel will redeploy after GitHub updates.

After uploading, rerun `database/schema.sql` in Supabase SQL Editor so the master dashboard can load and delete database records.

## Important Security Note

Child login now uses first name, last name, and a child code. Parents can see the code on their dashboard and give it to the child.

The master dashboard now uses real Supabase admin login. Do not share the admin password with parents or students.
