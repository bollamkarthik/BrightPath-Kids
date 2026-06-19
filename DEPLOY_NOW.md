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

For a real working app, the next phase is:

1. Add Supabase authentication.
2. Add database tables for parents, students, questions, attempts, and placement results.
3. Move answer saving from browser storage to the database.
4. Protect each parent dashboard so parents only see their own children.
5. Add admin/master permissions.
