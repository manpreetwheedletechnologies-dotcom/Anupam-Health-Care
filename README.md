# Anupam Health Care Services — Website

Monorepo-style layout (two independent apps, run separately):

```
anupam-website/
  frontend/   -> Next.js 14 (App Router) + Tailwind CSS
  backend/    -> NestJS API (leads capture)
```

## Frontend

```
cd frontend
npm install
npm run dev        # http://localhost:3000
```

Brand colors are defined in `tailwind.config.ts`:
- `brand.navy`  = #0C447C
- `brand.green` = #3B6D11

The homepage (`app/page.tsx`) is built from small components in `components/`:
`Header, Hero, StatsBar, Services, Packages, Testimonials, Footer` — matches
the approved design (header/footer navy, white body, alternating navy/green
service icons, hero lead form, care packages, testimonials).

The lead form in `Hero.tsx` posts to `NEXT_PUBLIC_API_URL + /leads`.
Set that in `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Backend

```
cd backend
npm install
npm run start:dev  # http://localhost:4000
```

Exposes `POST /leads` which the hero form and mid-page form call.
Currently stores leads in memory (`leads.service.ts`) — swap the
array for Prisma + Postgres when you're ready to persist (see
comment block in that file for the schema to use).

## Next steps (not yet built)

- Individual service pages (`/services/[slug]`) and equipment pages
- Admin view to see submitted leads
- Prisma + Postgres wiring for the backend
- Blog / CMS content



Drop your service photos into this folder using these EXACT filenames
(JPG format, landscape orientation works best — roughly 600x400px or larger).
Once a file is added here, it will automatically show up on:
  - the Services grid on the homepage
  - the /services listing page
  - the /services/[slug] detail page banner
 
No code changes needed — just add the file with the matching name below.
 
  nursing-care.jpg              -> Nursing Staff
  elder-care.jpg                -> GDA Staff
  equipment-rent.jpg            -> All Medical Equipment on Rent
  blood-sample-collection.jpg   -> Blood Sample Collection at Home
  patient-care.jpg              -> Patient Care at Home
  physiotherapy-at-home.jpg     -> Physiotherapy at Home
  doctor-consultation.jpg       -> Doctor Consultation
  ambulance-service.jpg         -> Ambulance Service
  quality-care-at-home.jpg      -> Quality Care at Home
  24x7-customer-support.jpg     -> 24x7 Customer Support
 
If you'd rather use .png instead of .jpg for any of these, just update the
matching "image" path in lib/services.ts to end in .png instead.