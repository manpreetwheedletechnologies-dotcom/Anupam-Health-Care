# Anupam Health Care Services — Dynamic Site + Admin Dashboard

This project is now fully dynamic. Every piece of content that used to be
hardcoded in the frontend — services, care packages, testimonials, team
members, blog posts, and leads — lives in a database and is managed from
an admin dashboard at `/admin`.

## What changed

**Backend (NestJS)**
- Added a MongoDB database via Prisma (`prisma/schema.prisma`) — one model
  each for `Service`, `Package`, `Testimonial`, `TeamMember`, `BlogPost`,
  and `Lead`.
- Added single-admin JWT authentication (`/auth/login`) protecting every
  create/update/delete route. Public `GET` routes stay open for the
  marketing site.
- Added full CRUD modules: `services`, `packages`, `testimonials`, `team`,
  `blog`, plus an upgraded `leads` module (status tracking + `/leads/stats`
  for the dashboard).
- Fixed a bug in the original code: `app.module.ts` had empty
  imports/controllers/providers, so the leads endpoint was never actually
  reachable. It's wired in now.
- Added a seed script that loads the database with the content that was
  previously hardcoded, so nothing is lost.

**Frontend (Next.js)**
- Added `lib/api.ts` — a typed client for every backend endpoint.
- Added `context/SiteDataContext.tsx` — fetches services, packages,
  testimonials, team, and blog posts once and shares them across the
  whole app (Header, Footer, Hero, homepage sections, forms).
- Header, Hero, Footer, homepage sections, the booking modal, the contact
  page, `/services`, `/services/[slug]`, `/our-team`, and `/blog` all now
  read from the API instead of a static array.
- Added a new `/blog/[slug]` post page (previously blog cards didn't link
  anywhere).
- Added the admin dashboard at `/admin` (see below).

## Admin dashboard

URL: `/admin` (redirects to `/admin/login` if not signed in)

- **Dashboard** — lead counts, today's leads, content counts, recent leads
- **Leads** — every form submission, with status (new/contacted/converted/closed) you can update inline, and delete
- **Services / Packages / Testimonials / Team / Blog** — full add / edit /
  publish-toggle / delete for each, reflected on the live site immediately
  (no rebuild needed — pages fetch fresh on every request)

There's a single admin account, configured through environment variables
(no signup flow, no user table — see setup below).

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Generate a password hash for your admin login and paste it into `.env`:

```bash
npm run hash-password -- "yourStrongPassword"
# copy the printed ADMIN_PASSWORD_HASH line into .env
```

Also set `ADMIN_EMAIL` in `.env` to whatever email you want to log in
with, and set `JWT_SECRET` to any long random string.

**Database — MongoDB.** Set `DATABASE_URL` in `.env` to your MongoDB
connection string. One important thing: **Prisma requires MongoDB to run
as a replica set**, even locally — a plain standalone `mongod` will fail
on writes (create/update/delete) with a transactions error. Two easy
options:

- **MongoDB Atlas** (recommended, free tier works) — already runs as a
  replica set, just paste its connection string in.
- **Local MongoDB** — start it with `mongod --replSet rs0`, then once,
  run `mongosh --eval "rs.initiate()"` to initialize the replica set.

Push the schema to your database and load the starter content:

```bash
npm run prisma:push
npm run seed
```

Start the server:

```bash
npm run start:dev
```

Backend runs at `http://localhost:4000`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs at `http://localhost:3000`. Log into the dashboard at
`http://localhost:3000/admin/login` with the email/password you set above.

## Everyday use

- Add a new service, package, testimonial, team member, or blog post from
  `/admin` → it appears on the live site right away.
- Toggle the eye icon in any admin list to hide/show an item without
  deleting it (unpublish instead of delete).
- Leads submitted through the homepage form, the booking modal, or the
  contact page all land in `/admin/leads`.

## Notes for going to production

- This already uses MongoDB — for production, point `DATABASE_URL` at
  your production MongoDB (Atlas is the easiest managed option and
  already satisfies the replica-set requirement Prisma needs).
- Put the backend behind HTTPS and set `FRONTEND_URL` to your real
  frontend domain (used for CORS).
- Rotate `JWT_SECRET` to a strong random value and keep `.env` out of
  version control (already gitignored by the Nest/Next defaults — double
  check before pushing).
