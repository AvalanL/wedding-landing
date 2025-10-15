# 🔧 Railway Environment Variables Setup

Complete checklist for configuring environment variables in Railway for your wedding landing platform.

---

## 📋 Required Environment Variables

### 1. Supabase Configuration

Get these from: [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → Settings → API

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
```
- ✅ Check: Copy from "Project URL"
- 📍 Location: Supabase → Settings → API → Project URL
- ⚠️ Must start with `https://`
- ⚠️ Must end with `.supabase.co`

```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
- ✅ Check: Copy from "Project API keys" → `anon` `public`
- 📍 Location: Supabase → Settings → API → Project API keys
- ⚠️ Very long JWT token (starts with `eyJ`)
- ⚠️ This is PUBLIC - safe to expose to frontend

```bash
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
- ✅ Check: Same value as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- 📍 Same location as above
- ⚠️ Duplicate of above for backend usage

### 2. Domain Configuration

```bash
NEXT_PUBLIC_BASE_DOMAIN=app.yourdomain.com
```
- ✅ Check: Your custom domain WITHOUT `https://` or port
- ✅ Examples:
  - ✅ `brollopssidan.se`
  - ✅ `weddingsites.com`
  - ✅ `myapp.io`
- ❌ Wrong:
  - ❌ `https://brollopssidan.se`
  - ❌ `brollopssidan.se:443`
  - ❌ `www.brollopssidan.se`
- 🎯 **This is critical for subdomain routing!**

```bash
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```
- ✅ Check: Full URL WITH `https://` protocol
- ✅ Examples:
  - ✅ `https://brollopssidan.se`
  - ✅ `https://weddingsites.com`
- ❌ Wrong:
  - ❌ `http://brollopssidan.se` (use https)
  - ❌ `brollopssidan.se` (missing protocol)

### 3. Email Configuration (Resend)

Get API key from: [Resend Dashboard](https://resend.com/api-keys)

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- ✅ Check: Starts with `re_`
- 📍 Location: Resend → API Keys → Create API Key
- 🎯 Required for RSVP email notifications
- 💡 For testing: Use `onboarding@resend.dev` without verification

### 4. Node Environment

```bash
NODE_ENV=production
```
- ✅ Check: Set to `production` for Railway
- 🤖 Railway usually sets this automatically

---

## ✅ Setup Checklist

### Pre-Deployment

- [ ] Supabase project created
- [ ] Database migrations run (all 4 SQL files)
- [ ] Google OAuth enabled in Supabase
- [ ] Resend account created
- [ ] Custom domain registered and ready
- [ ] Railway project created

### Railway Configuration

**In Railway Dashboard → Your Project → Variables:**

- [ ] `NEXT_PUBLIC_SUPABASE_URL` added
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added
- [ ] `SUPABASE_ANON_KEY` added (same as above)
- [ ] `NEXT_PUBLIC_BASE_DOMAIN` added (no https, no port!)
- [ ] `NEXT_PUBLIC_APP_URL` added (with https)
- [ ] `RESEND_API_KEY` added
- [ ] `NODE_ENV=production` verified

### Domain Configuration

- [ ] Custom domain added in Railway: `yourdomain.com`
- [ ] Wildcard domain added in Railway: `*.app.yourdomain.com`
- [ ] DNS CNAME record added: `@ → railway`
- [ ] DNS wildcard CNAME added: `* → railway`
- [ ] DNS propagation verified (use `dig` or online tool)
- [ ] SSL certificate provisioned (green padlock)

### Supabase Configuration

- [ ] Auth redirect URL added: `https://yourdomain.com/auth/callback`
- [ ] Site URL set to: `https://yourdomain.com`
- [ ] RLS policies enabled (via migrations)

### Testing

- [ ] Root domain loads: `https://yourdomain.com`
- [ ] Can login with Google
- [ ] Can create a wedding site
- [ ] Can publish a site
- [ ] Subdomain works: `https://test.app.yourdomain.com`
- [ ] RSVP form submits successfully
- [ ] Email notification received
- [ ] Dashboard shows RSVP data

---

## 🚀 Quick Setup Script

Copy-paste this into Railway Variables (adjust values):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM4OTU2MDAwLCJleHAiOjIwNTQ1MzIwMDB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM4OTU2MDAwLCJleHAiOjIwNTQ1MzIwMDB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Domain
NEXT_PUBLIC_BASE_DOMAIN=app.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Email
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Environment
NODE_ENV=production
```

---

## 🔍 Verification Commands

After setting environment variables in Railway, verify they're correct:

### Check in Railway CLI

```bash
# Login to Railway
railway login

# Link to your project
railway link

# View all variables
railway variables

# Check specific variable
railway variables get NEXT_PUBLIC_BASE_DOMAIN
```

### Check in Deployed App

Add a test page to verify (remove after testing):

```typescript
// app/test-env/page.tsx
export default function TestEnv() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Environment Variables Test</h1>
      <p>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || '❌ Missing'}</p>
      <p>NEXT_PUBLIC_BASE_DOMAIN: {process.env.NEXT_PUBLIC_BASE_DOMAIN || '❌ Missing'}</p>
      <p>NEXT_PUBLIC_APP_URL: {process.env.NEXT_PUBLIC_APP_URL || '❌ Missing'}</p>
      <p>NODE_ENV: {process.env.NODE_ENV || '❌ Missing'}</p>
    </div>
  )
}
```

Visit: `https://yourdomain.com/test-env`

---

## 🐛 Troubleshooting

### Issue: "Environment variables not showing up"

**Cause:** Variables not set or Railway not redeployed

**Solution:**
1. Verify variables in Railway dashboard
2. Click "Redeploy" or push a new commit
3. Wait for build to complete

### Issue: "NEXT_PUBLIC variables are undefined"

**Cause:** Next.js only includes `NEXT_PUBLIC_` variables at build time

**Solution:**
1. Set the variable in Railway
2. Trigger a NEW build (redeploy)
3. Don't just restart - must rebuild!

### Issue: "Subdomain routing not working"

**Cause:** `NEXT_PUBLIC_BASE_DOMAIN` incorrect

**Solution:**
Verify the value:
```bash
# Check current value
railway variables get NEXT_PUBLIC_BASE_DOMAIN

# Should be (for example):
brollopssidan.se

# NOT:
https://brollopssidan.se  ❌
brollopssidan.se:443      ❌
www.brollopssidan.se      ❌
```

### Issue: "Supabase connection failed"

**Cause:** Wrong Supabase URL or key

**Solution:**
1. Go to Supabase dashboard
2. Settings → API
3. Copy EXACT values (including full JWT token)
4. Update in Railway
5. Redeploy

### Issue: "Emails not sending"

**Cause:** Resend API key invalid or not set

**Solution:**
1. Verify Resend API key in Resend dashboard
2. Check that key starts with `re_`
3. For testing, use `onboarding@resend.dev` as sender
4. For production, verify your domain in Resend

---

## 📚 Additional Resources

- **Railway Variables Docs:** https://docs.railway.app/deploy/variables
- **Supabase API Settings:** https://supabase.com/dashboard/project/_/settings/api
- **Resend API Keys:** https://resend.com/api-keys
- **Next.js Environment Variables:** https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

---

## 💡 Pro Tips

1. **Use Railway CLI for bulk operations:**
   ```bash
   railway variables set KEY=value
   ```

2. **Keep a local backup:**
   Save your `.env.local` (without committing) as reference

3. **Use Railway's built-in secrets:**
   Railway automatically hides sensitive values in logs

4. **Set up multiple environments:**
   Use Railway's environment feature for staging/production

5. **Monitor your variables:**
   Regularly audit which variables are set and remove unused ones

---

## 🎯 Next Steps

After configuring all environment variables:

1. ✅ Deploy: `railway up`
2. ✅ Configure DNS (see [DNS_QUICKSTART.md](./DNS_QUICKSTART.md))
3. ✅ Wait for SSL provisioning
4. ✅ Test all functionality
5. ✅ Launch! 🚀

---

**Need more help?** See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for complete deployment guide.

Made with 🔧 for hassle-free configuration


