# Deploy BrightPath Kids

## Fastest Demo Deployment

Use Vercel.

1. Create a GitHub account if you do not already have one.
2. Create a new GitHub repository named `brightpath-kids`.
3. Upload this folder's files to that repository.
4. Go to Vercel and choose **Add New Project**.
5. Select the `brightpath-kids` repository.
6. Vercel should detect Vite automatically.
7. Confirm:
   - Build command: `pnpm run build`
   - Output directory: `dist`
8. Click **Deploy**.

Your public demo website will be live.

## Important

This version is still a demo. It stores parent, student, and answer data in the browser. That is okay for testing the idea, but not for a real academy.

For a real working app, start with:

1. Run `database/schema.sql` in your Supabase SQL Editor.
2. Copy your Supabase anon public key.
3. Paste it into `public/prototype/config.js`.
4. Upload the changed files to GitHub.
5. Let Vercel redeploy.

See `database/SETUP_SUPABASE.md` for the exact database setup steps.
