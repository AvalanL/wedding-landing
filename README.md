# 💒 Bröllopssidan.se

> Create beautiful Swedish wedding websites with RSVP management, elegant templates, and email notifications

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)

## ✨ Features

- 🎨 **11 Elegant Templates** - Romantic, Modern, Vintage, Cinematic, Art Deco, Beach, Garden, Rustic, Whimsical, Minimalist, and Elegant
- 📝 **RSVP System** - Guests can RSVP directly on the wedding website
- 📧 **Email Notifications** - Instant email alerts when guests RSVP (powered by Resend)
- 👤 **User Dashboard** - Manage multiple wedding sites, view all RSVPs, export to CSV
- 🔐 **Secure Auth** - Google OAuth via Supabase
- 🎨 **Live Editor** - Real-time preview while customizing your wedding site
- 🌈 **Color Palettes** - Multiple color schemes per template
- 📱 **Responsive Design** - Beautiful on all devices
- 🇸🇪 **Swedish Localization** - Fully localized for Swedish users
- 🔒 **Row Level Security** - Secure data isolation per user

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account
- Resend account (for email notifications)

### Installation

```bash
# Clone the repository
git clone https://github.com/AvalanL/wedding-landing.git
cd wedding-landing

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and Resend credentials

# Run database migrations
# Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new
# Run the SQL files in supabase/migrations/ in order

# Start development server
pnpm dev
```

Visit `http://localhost:3000` and log in with Google!

## 🗄️ Database Setup

Run these migrations in your Supabase SQL Editor:

1. `0001_create_sites.sql` - Creates sites table with RLS
2. `0002_create_rsvp_responses.sql` - Creates RSVP responses table
3. `0003_get_user_email.sql` - Creates function to fetch user emails
4. `0004_fix_rsvp_rls.sql` - Fixes RLS policies for public RSVP submissions

## 📧 Email Setup

1. Get a free API key from [Resend](https://resend.com)
2. Add `RESEND_API_KEY=re_...` to `.env.local`
3. Verify your domain (or use `onboarding@resend.dev` for testing)

When guests RSVP, you'll receive a beautiful branded email with:
- Guest name and attendance status
- Number of guests
- Contact information
- Dietary restrictions
- Personal message
- Link to view all RSVPs in dashboard

## 🎨 Templates

Choose from 11 professionally designed templates:

- **Romantic** - Classic romance with floral accents
- **Modern** - Clean, contemporary design
- **Vintage** - Timeless elegance with sepia tones
- **Cinematic** - Dramatic, movie-inspired layout
- **Art Deco** - Geometric patterns and gold accents
- **Beach** - Light, airy coastal theme
- **Garden** - Natural, botanical aesthetic
- **Rustic** - Warm, countryside charm
- **Whimsical** - Playful and creative
- **Minimalist** - Simple, refined beauty
- **Elegant** - Sophisticated luxury

Each template includes:
- Hero section with couple photo
- Story/About Us section
- Event details (ceremony & reception)
- Schedule/Timeline
- Travel & Accommodation info
- RSVP form
- Multiple color palette options

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (Google OAuth)
- **Email:** Resend + React Email
- **Hosting:** Vercel (recommended)

## 📁 Project Structure

```
wedding-landing/
├── app/
│   ├── api/          # API routes (sites, RSVP)
│   ├── dashboard/    # User dashboard
│   ├── login/        # Login page
│   ├── rsvp/         # RSVP management page
│   └── sites/[slug]/ # Published wedding sites
├── components/
│   ├── auth/         # Auth components
│   ├── ui/           # shadcn/ui components
│   ├── rsvp-form.tsx # RSVP form component
│   └── supabase-provider.tsx
├── lib/
│   ├── emails/       # Email templates
│   ├── supabase-*.ts # Supabase clients
│   └── resend.ts     # Resend client
├── supabase/
│   └── migrations/   # Database migrations
└── public/           # Static assets
```

## 🔧 Configuration

### Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_ANON_KEY=eyJxxx...

# App URLs
NEXT_PUBLIC_BASE_DOMAIN=website.com
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=re_xxx...
```

### Supabase Auth Setup

1. Go to Authentication → Providers in Supabase dashboard
2. Enable Google provider
3. Add OAuth credentials from Google Cloud Console
4. Add authorized redirect URLs

## 🧪 Testing Locally

### Test Subdomains

Add to `/etc/hosts`:
```
127.0.0.1 bengt.localhost
127.0.0.1 yourname.localhost
```

Then visit: `http://bengt.localhost:3000`

### Test RSVP & Emails

1. Publish a site from the dashboard
2. Visit the published site
3. Fill out the RSVP form
4. Check terminal for email log
5. Check your inbox for the notification email

## 📊 RSVP Dashboard

View and manage all RSVPs:
- Total responses count
- Attending vs. not attending
- Total guest count
- Full guest details (name, email, phone, dietary restrictions)
- Export to CSV for further processing

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Set up custom domain
```

### Subdomain Routing

The middleware handles subdomain routing:
- `yourdomain.com` → Main app (dashboard/editor)
- `bengt.yourdomain.com` → Published wedding site for "bengt"

Set `NEXT_PUBLIC_BASE_DOMAIN` to your domain.

## 📝 License

MIT License - feel free to use for your own projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Roadmap

- [ ] Multiple language support (English, Norwegian, Danish)
- [ ] Custom domain support per wedding site
- [ ] Photo gallery upload
- [ ] Gift registry integration
- [ ] WhatsApp/SMS notifications
- [ ] Guest list management
- [ ] Seating chart tool
- [ ] More templates

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with 💒 for couples celebrating their special day

