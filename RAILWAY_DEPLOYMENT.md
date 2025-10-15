# 🚂 Railway Deployment Guide with Wildcard Subdomains

Complete guide to deploying your multi-tenant wedding site platform on Railway with custom domain and wildcard subdomain support.

> **Note:** Couples' wedding sites are hosted at `*.app.yourdomain.com` (e.g., `bengt.app.yourdomain.com`)

---

## 📋 Prerequisites

- Railway account ([railway.app](https://railway.app))
- Custom domain (e.g., `brollopssidan.se`)
- Supabase project set up
- Resend API key for emails
- DNS provider with wildcard subdomain support (most providers support this)

---

## 🚀 Part 1: Deploy to Railway

### Step 1: Create Railway Project

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project from your repo
railway init
```

Or use the Railway dashboard:

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your `wedding-landing` repository

### Step 2: Configure Build Settings

Railway should auto-detect Next.js, but verify these settings:

**In Railway Dashboard → Your Project → Settings:**

- **Build Command:** `pnpm install && pnpm build`
- **Start Command:** `pnpm start`
- **Install Command:** `pnpm install`

**Add `railway.json` to your project root (optional but recommended):**

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "pnpm install && pnpm build"
  },
  "deploy": {
    "numReplicas": 1,
    "startCommand": "pnpm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Step 3: Configure Environment Variables

In Railway Dashboard → Your Project → Variables, add:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_ANON_KEY=eyJxxx...

# Your custom domain (WITHOUT protocol, WITHOUT port)
NEXT_PUBLIC_BASE_DOMAIN=app.brollopssidan.se

# App URL (your Railway domain initially, then your custom domain)
NEXT_PUBLIC_APP_URL=https://brollopssidan.se

# Resend (Email notifications)
RESEND_API_KEY=re_xxx...

# Node environment
NODE_ENV=production
```

**Important:** Set `NEXT_PUBLIC_BASE_DOMAIN` to your custom domain without `https://` and without any port. For example:
- ✅ `brollopssidan.se`
- ✅ `example.com`
- ❌ `https://brollopssidan.se`
- ❌ `brollopssidan.se:443`

### Step 4: Deploy

Railway will automatically deploy when you push to your main branch.

Initial deployment URL will be something like: `https://your-project.up.railway.app`

---

## 🌐 Part 2: DNS Configuration for Wildcard Subdomains

This is the crucial part for enabling user subdomains like `bengt.app.brollopssidan.se`, `emma-james.app.brollopssidan.se`, etc.

### Step 1: Get Railway's Custom Domain Settings

1. In Railway Dashboard → Your Project
2. Click **"Settings"** tab
3. Click **"Domains"** or **"Networking"**
4. Click **"Add Custom Domain"**

### Step 2: Add Your Root Domain

1. Enter your root domain: `brollopssidan.se`
2. Railway will show you DNS records to add

You'll typically see something like:

**Option A: CNAME Setup (Recommended)**
```
Type: CNAME
Name: @
Value: your-project.up.railway.app
```

**Option B: A Record Setup**
```
Type: A
Name: @
Value: 104.21.xxx.xxx (Railway's IP)
```

### Step 3: Add Wildcard Subdomain (CRITICAL!)

This is what allows ALL user-generated subdomains to work under the `app` subdomain.

**Add the app subdomain in Railway:**
1. Click **"Add Custom Domain"**
2. Enter: `app.brollopssidan.se`
3. Railway will provide a DNS record

**In your DNS provider, add:**

```
Type: CNAME
Name: app
Value: your-project.up.railway.app
TTL: 300 (or Auto)
```

**Add wildcard for user subdomains:**
1. Click **"Add Custom Domain"** again
2. Enter: `*.app.brollopssidan.se`
3. Railway will provide another DNS record

**In your DNS provider, add:**

```
Type: CNAME
Name: *.app
Value: your-project.up.railway.app
TTL: 300 (or Auto)
```

Or if using A records:

```
Type: A
Name: *
Value: 104.21.xxx.xxx (same Railway IP)
TTL: 300 (or Auto)
```

### Step 4: Configure DNS Provider

Go to your DNS provider (Cloudflare, Namecheap, GoDaddy, etc.) and add these records:

#### Example: Cloudflare DNS

| Type  | Name  | Content                          | Proxy | TTL  |
|-------|-------|----------------------------------|-------|------|
| CNAME | @     | your-project.up.railway.app      | ✅    | Auto |
| CNAME | *     | your-project.up.railway.app      | ✅    | Auto |
| CNAME | www   | your-project.up.railway.app      | ✅    | Auto |

**Important Cloudflare Settings:**
- Enable "Proxy status" (orange cloud) for SSL
- Set SSL/TLS mode to **"Full"** or **"Full (strict)"**
- Enable **"Always Use HTTPS"**

#### Example: Namecheap DNS

| Type  | Host  | Value                          | TTL      |
|-------|-------|--------------------------------|----------|
| CNAME | @     | your-project.up.railway.app.   | Automatic|
| CNAME | *     | your-project.up.railway.app.   | Automatic|
| CNAME | www   | your-project.up.railway.app.   | Automatic|

#### Example: GoDaddy DNS

| Type  | Name  | Value                          | TTL  |
|-------|-------|--------------------------------|------|
| CNAME | @     | your-project.up.railway.app    | 1 Hour |
| CNAME | *     | your-project.up.railway.app    | 1 Hour |
| CNAME | www   | your-project.up.railway.app    | 1 Hour |

### Step 5: Verify DNS Propagation

DNS changes can take 5 minutes to 48 hours. Check status:

```bash
# Check root domain
dig brollopssidan.se

# Check wildcard subdomain
dig test.app.brollopssidan.se

# Or use online tools
# https://www.whatsmydns.net/
```

You should see CNAME records pointing to Railway.

---

## 🔒 Part 3: SSL Certificates (Automatic with Railway)

Railway automatically provisions SSL certificates via Let's Encrypt for:
- Your root domain (`brollopssidan.se`)
- Wildcard subdomains (`*.brollopssidan.se`)

**No manual configuration needed!** 🎉

After DNS propagation, Railway will:
1. Detect your custom domains
2. Request SSL certificates from Let's Encrypt
3. Auto-renew certificates before expiry

---

## ✅ Part 4: Testing Your Setup

### Test 1: Root Domain

Visit your main app:
```
https://brollopssidan.se
```

You should see:
- ✅ Dashboard/login page
- ✅ Green padlock (SSL working)
- ✅ No certificate errors

### Test 2: www Subdomain

```
https://www.brollopssidan.se
```

Should redirect or show the same main app.

### Test 3: User Subdomains

First, create a test site:
1. Login at `https://brollopssidan.se`
2. Create a wedding site with slug `test-wedding`
3. Publish it

Then visit:
```
https://test-wedding.app.brollopssidan.se
```

You should see:
- ✅ The published wedding site
- ✅ Green padlock (SSL working)
- ✅ RSVP form working

### Test 4: RSVP Functionality

1. Fill out the RSVP form on a subdomain
2. Check that email notifications arrive
3. Verify RSVP appears in dashboard

---

## 🔧 Part 5: Supabase Configuration

Update Supabase Auth settings to allow your custom domain:

### In Supabase Dashboard → Authentication → URL Configuration:

**Site URL:**
```
https://brollopssidan.se
```

**Redirect URLs (add all):**
```
https://brollopssidan.se/auth/callback
https://*.brollopssidan.se/auth/callback
http://localhost:3000/auth/callback
```

**Note:** Supabase might not support wildcard redirect URLs. If that's the case, you have two options:

1. **Add subdomains manually as users create them** (not scalable)
2. **Use the root domain for auth only** (recommended):
   - Users always login at `brollopssidan.se`
   - After login, they can access their subdomain sites
   - No auth callbacks on subdomains needed

The current architecture already handles this correctly! Auth happens on the root domain only.

---

## 🐛 Troubleshooting

### Issue: "Site cannot be reached"

**Cause:** DNS not propagated or misconfigured

**Solution:**
1. Wait 10-30 minutes for DNS propagation
2. Verify DNS records with `dig` or online tools
3. Check that Railway domains are correctly configured

### Issue: "SSL Certificate Error"

**Cause:** Railway hasn't provisioned SSL yet

**Solution:**
1. Wait 10-30 minutes after DNS propagation
2. Verify custom domain is added in Railway
3. Check Railway logs for certificate provisioning status
4. Try forcing HTTPS redirection in Railway settings

### Issue: "Subdomain shows 404"

**Cause:** Either DNS issue or site not published

**Solution:**
1. Verify wildcard DNS record: `dig random-test.app.yourdomain.com`
2. Check that site is published in dashboard
3. Check that `NEXT_PUBLIC_BASE_DOMAIN` matches your domain exactly
4. Verify middleware.ts is handling subdomains correctly

### Issue: "Middleware not routing correctly"

**Cause:** `NEXT_PUBLIC_BASE_DOMAIN` mismatch

**Solution:**
Ensure in Railway environment variables:
```bash
NEXT_PUBLIC_BASE_DOMAIN=app.yourdomain.com  # NO https://, NO port
```

Then redeploy:
```bash
railway up
```

### Issue: "Auth callback fails"

**Cause:** Supabase redirect URL not configured

**Solution:**
Add your domain to Supabase Auth → URL Configuration → Redirect URLs:
```
https://yourdomain.com/auth/callback
```

### Issue: "RSVP emails not sending"

**Cause:** Resend domain not verified

**Solution:**
1. Go to Resend dashboard
2. Verify your domain
3. Add DNS records (TXT, CNAME) to your DNS provider
4. Or use `onboarding@resend.dev` for testing

---

## 📊 Part 6: Monitoring & Logs

### View Railway Logs

```bash
# Via CLI
railway logs

# Or in Railway Dashboard → Project → Deployments → View Logs
```

### Monitor Usage

Railway Dashboard shows:
- CPU usage
- Memory usage
- Bandwidth
- Build times

### Set Up Alerts

In Railway Dashboard → Project → Settings → Alerts:
- Set up alerts for high CPU/memory
- Configure webhook notifications

---

## 💰 Pricing Considerations

### Railway Pricing (as of 2024)

**Hobby Plan ($5/month):**
- $5 credit monthly
- Pay for what you use beyond credits
- ~$0.000463/GB-hour for memory
- Good for small-medium sites

**Pro Plan ($20/month):**
- $20 credit monthly
- Priority support
- Better for production/high traffic

### Estimated Costs for Wedding Site Platform

**Small scale (< 100 sites):**
- ~$5-15/month on Hobby plan

**Medium scale (100-1000 sites):**
- ~$20-50/month on Pro plan

**Large scale (1000+ sites):**
- ~$50-200+/month depending on traffic

**Additional costs:**
- Supabase: Free tier generous, $25/month Pro
- Resend: Free tier 100 emails/day, $10/month Pro

---

## 🚀 Part 7: Continuous Deployment

### Automatic Deployments

Railway automatically deploys when you push to your main branch.

**Setup GitHub webhook (already done if you connected via GitHub):**
1. Railway → Project → Settings → GitHub
2. Verify webhook is connected
3. Choose branch to deploy (e.g., `main`)

### Deploy Manually

```bash
# Via CLI
railway up

# Or trigger in dashboard
# Railway Dashboard → Project → Deployments → Trigger Deploy
```

### Rollback

If something breaks:
1. Railway Dashboard → Project → Deployments
2. Find previous successful deployment
3. Click **"Redeploy"**

---

## 📝 Deployment Checklist

Before going live, verify:

- [ ] Railway project created and deployed
- [ ] Environment variables configured
- [ ] Custom domain added in Railway
- [ ] Root domain DNS record added (CNAME or A)
- [ ] **Wildcard subdomain DNS record added** (`*.app.yourdomain.com`)
- [ ] www subdomain DNS record added (optional)
- [ ] DNS propagated (check with `dig`)
- [ ] SSL certificates provisioned (green padlock)
- [ ] Supabase auth redirect URLs updated
- [ ] Resend domain verified (or using test domain)
- [ ] Root domain loads dashboard (`https://yourdomain.com`)
- [ ] Test subdomain works (`https://test.app.yourdomain.com`)
- [ ] Auth login/logout works
- [ ] RSVP submission works
- [ ] Email notifications arrive
- [ ] Dashboard shows RSVP data
- [ ] Railway logs show no errors

---

## 🎯 Quick Start (TL;DR)

```bash
# 1. Deploy to Railway
railway init
railway up

# 2. Add environment variables in Railway dashboard
NEXT_PUBLIC_BASE_DOMAIN=yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
RESEND_API_KEY=...

# 3. Add custom domains in Railway
# - yourdomain.com
# - app.yourdomain.com
# - *.app.yourdomain.com

# 4. Configure DNS (Cloudflare example)
# CNAME @ your-project.up.railway.app
# CNAME * your-project.up.railway.app

# 5. Wait for DNS propagation (10-30 min)

# 6. Verify SSL and test subdomains

# Done! 🎉
```

---

## 🔗 Helpful Resources

- **Railway Docs:** https://docs.railway.app/
- **Railway Discord:** https://discord.gg/railway
- **DNS Propagation Checker:** https://www.whatsmydns.net/
- **SSL Checker:** https://www.ssllabs.com/ssltest/
- **Cloudflare DNS:** https://www.cloudflare.com/
- **Supabase Docs:** https://supabase.com/docs

---

## 💡 Pro Tips

1. **Use Cloudflare for DNS:** Free, fast DNS with great wildcard support
2. **Enable caching:** Use Cloudflare's CDN to cache static assets
3. **Set up monitoring:** Railway provides basic monitoring, consider adding Sentry for error tracking
4. **Database connection pooling:** If you hit connection limits, use Supabase connection pooler
5. **Image optimization:** Next.js handles this, but consider using Cloudflare Image Resizing for extra optimization

---

## 🆘 Need Help?

If you encounter issues:

1. Check Railway logs: `railway logs`
2. Verify DNS: `dig yourdomain.com` and `dig test.app.yourdomain.com`
3. Check Railway status: https://railway.statuspage.io/
4. Ask in Railway Discord: https://discord.gg/railway
5. Review Next.js middleware.ts for subdomain routing logic

---

Made with 🚂 for Railway • Updated 2024


