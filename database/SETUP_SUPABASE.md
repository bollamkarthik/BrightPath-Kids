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

## 2. Add Your Public Key

Open:

`public/prototype/config.js`

Replace:

`PASTE_SUPABASE_ANON_PUBLIC_KEY_HERE`

with your Supabase **publishable** key.

You can find it in Supabase:

**Project Settings -> API -> Project API keys -> publishable key**

## 3. Upload Changes To GitHub

Upload these changed files to the same GitHub repo:

- `public/prototype/index.html`
- `public/prototype/config.js`
- `database/schema.sql`
- `database/SETUP_SUPABASE.md`

Vercel will redeploy after GitHub updates.

## Important Security Note

For a real student app, child login should not use only first and last name. Use a child code or PIN so two students with the same name do not get mixed up and student data stays private.
