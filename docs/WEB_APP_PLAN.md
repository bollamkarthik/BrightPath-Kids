# BrightPath Kids Web App Plan

This folder is the first conversion step from the local prototype into a real web app.

## Current State

- The working prototype is copied into `public/prototype`.
- The React shell in `src/` can run the prototype inside a web-app project.
- The next engineering step is to move data out of browser storage and into backend APIs.

## Recommended Stack

- Frontend: React with Vite now, Next.js later if server-side routing is needed.
- Auth and database: Supabase is the fastest path for parent, student, and admin accounts.
- Payments later: Stripe subscriptions.
- Hosting: Vercel for frontend, Supabase for database and auth.

## Database Tables

- `parents`: parent profile and auth user id.
- `students`: first name, last name, level, state, parent id.
- `academy_admins`: owner/admin accounts.
- `questions`: subject, topic, level, prompt, answer, explanation.
- `student_attempts`: student answer, correct answer, correctness, date, topic.
- `placement_results`: subject, score, judged level, date.
- `daily_assignments`: generated daily question sets by student.

## API Routes To Build

- `POST /auth/parent-login`
- `POST /auth/student-login`
- `GET /students`
- `POST /students`
- `DELETE /students/:id`
- `GET /questions/daily`
- `POST /attempts`
- `GET /reports/parent`
- `GET /reports/academy`

## Data Migration Notes

The current prototype stores data in browser `localStorage`. A production version should never rely on browser-only storage for student records.

Each answer attempt should store:

- student id
- question id
- subject
- topic
- level
- question text
- kid answer
- correct answer
- explanation
- correct or wrong
- created date

## Immediate Next Step

Replace the prototype iframe with React screens one role at a time:

1. Parent login and parent dashboard.
2. Student login and practice screen.
3. Academy dashboard.
4. Reports and history.
5. Real backend connection.
