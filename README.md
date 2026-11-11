# Gridly

Platform link-in-bio modular multi-user SaaS bergaya bento grid dengan tema visual **Neobrutalism**, dibangun menggunakan Next.js App Router, Tailwind CSS, dan Supabase.

## Fitur Utama

- **Bento Grid Modular:** Susunan kartu fleksibel (1x1, 2x1, atau 2x2 span) yang responsif dan interaktif.
- **Dukungan Multi-Card:** Tautan website, repositori GitHub, badge Discord, Spotify track, dan teks/bio kustom.
- **Desain Neobrutalism:** Border tegas, hard shadow tanpa blur, palet warna pastel kontras tinggi.
- **Multi-User SaaS:** Isolasi data antar-pengguna dengan **Row Level Security (RLS)** PostgreSQL.
- **Profil Publik Dinamis:** Halaman profil kustom berbasis username (`/[username]`).
- **Dashboard Editor:** Tambah kartu, atur grid layout, edit profil, dan upload/preview avatar instan.
- **Keamanan Berlapis:** Sanitasi skema URI (mencegah XSS/malicious protocol injection) dan HTTP Security Headers (X-Frame-Options DENY, nosniff, strict-origin).

## Tech Stack

- **Framework:** Next.js (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS (v4) + Lucide React Icons
- **Database & Auth:** Supabase (PostgreSQL, Supabase Auth, Row Level Security)
- **Deployment:** Vercel

## Setup Lokal

1. Clone repositori:
   ```bash
   git clone https://github.com/HyuraFE/gridly.git
   cd gridly
   ```

2. Pasang dependensi:
   ```bash
   npm install
   ```

3. Konfigurasi Environment Variable (`.env.local`):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Jalankan migrasi SQL dari file `supabase/schema.sql` di Supabase SQL Editor.

5. Jalankan server lokal:
   ```bash
   npm run dev
   ```
