# AGRIVISION — "AI-powered intelligence for smarter farming"

![AgriVision Banner](https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200)

**AgriVision** is a production-grade agriculture technology platform designed primarily for Indian small and marginal farmers. It consolidates fragmented farm parameters — location, soil pH/NPK, crop cycles, satellite weather forecasts, image-based crop disease diagnosis, and net-return mandi pricing — into simple, personalized, and actionable farming decisions.

---

## 🌟 Key Platform Features

1. **KrishiMitra AI Companion**: Multilingual AI assistant supporting natural conversation in **Hinglish**, **Hindi**, and **English** with voice input capability (`🎤 Speak`) and automatic farm context integration.
2. **AI Vision Crop Disease Scanner**: Image-first leaf diagnosis providing instant disease identification (e.g. Yellow Rust, Blight) with confidence scores, organic remedies, and chemical precautions.
3. **Net-Return Mandi Price Radar**: Calculates transport costs per quintal across regional mandis (e.g. Mathura, Agra, Aligarh) to highlight true net profit.
4. **Satellite Weather & Irrigation Advisor**: Micro-climate forecasts translated directly into field water management advice.
5. **Farm Health Index**: Real-time progress monitoring across Crop Health (82%), Soil Health (71%), Water Status (90%), and Risk Level.
6. **Expert Verification Ecosystem**: Escalation flow to verified agricultural scientists and agronomists.
7. **Bilingual i18n Architecture**: Seamless English (`en`) and Hindi (`hi`) toggle with persistent preference storage.

---

## 🏗 Technology Architecture

```
                         AGRIVISION
                              |
                     Next.js (App Router)
                              |
             -----------------------------------
             |                                 |
          Frontend                         Server/API
                                               |
                                            Supabase
                                               |
                    -------------------------------------------
                    |                    |                    |
                PostgreSQL              Auth               Storage
                    |
                   RLS
                    |
                Realtime
                    |
               AI / ML Services
                    |
              Python/FastAPI (Optional ML Backend)
```

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide React, Framer Motion
- **Backend / BaaS**: Supabase (PostgreSQL, Auth, SSR, Storage, Realtime, Row Level Security)
- **Deployment**: Vercel (No separate traditional backend server required for normal CRUD operations)

---

## 📁 Repository Project Structure

```
08-Agri/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── farmer/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── assistant/page.tsx
│   │   ├── disease/page.tsx
│   │   ├── weather/page.tsx
│   │   └── markets/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx (18 Story-Driven Landing Sections)
├── components/
│   └── shared/
│       └── Navbar.tsx
├── lib/
│   ├── i18n/
│   │   └── context.tsx
│   ├── services/
│   │   ├── ai.ts
│   │   ├── weather.ts
│   │   └── market.ts
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── middleware.ts
├── messages/
│   ├── en.json
│   └── hi.json
├── supabase/
│   └── migrations/
│       └── 00001_initial_schema.sql
├── .env.example
├── middleware.ts
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🗄 Supabase Database & Security Setup

All SQL schema definitions, indexes, Row Level Security (RLS) policies, and storage bucket definitions are located in:
`supabase/migrations/00001_initial_schema.sql`

### Standard Setup:
1. Create a project at [supabase.com](https://supabase.com).
2. Execute `supabase/migrations/00001_initial_schema.sql` in the Supabase SQL Editor.
3. Configure environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 🚀 Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production (Vercel compliance check)
npm run build

# 4. Start production server
npm run start
```

---

## ☁️ DEPLOY AGRIVISION TO VERCEL

1. Push this repository to GitHub.
2. Log into **Vercel** and select **Import Project**.
3. Set the root directory to `./` (or `08-Agri`).
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `AI_API_KEY` (Optional)
5. Click **Deploy**. Vercel will build and host AgriVision instantaneously!
