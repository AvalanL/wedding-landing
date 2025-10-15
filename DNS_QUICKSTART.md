# 🌐 DNS Quick Start for Wildcard Subdomains

> **Note:** Couples' wedding sites are hosted at `*.app.yourdomain.com` (e.g., `bengt.app.yourdomain.com`)

A concise reference for setting up DNS to enable user subdomains on your wedding site platform.

---

## ⚡ TL;DR

Add these 3 DNS records to your domain provider:

```
CNAME  @      your-project.up.railway.app
CNAME  app    your-project.up.railway.app
CNAME  *.app  your-project.up.railway.app  ← WILDCARD (Critical!)
CNAME  www    your-project.up.railway.app
```

Wait 10-30 minutes. Done! 🎉

---

## 📝 Provider-Specific Instructions

### Cloudflare (Recommended)

| Type  | Name | Content                     | Proxy Status | TTL  |
|-------|------|-----------------------------|--------------|------|
| CNAME | @    | your-project.up.railway.app | ✅ Proxied   | Auto |
| CNAME | *    | your-project.up.railway.app | ✅ Proxied   | Auto |
| CNAME | www  | your-project.up.railway.app | ✅ Proxied   | Auto |

**Additional Cloudflare Settings:**
1. SSL/TLS → Overview → Set to **"Full"** or **"Full (strict)"**
2. SSL/TLS → Edge Certificates → Enable **"Always Use HTTPS"**
3. Speed → Optimization → Enable **"Auto Minify"** for HTML, CSS, JS

### Namecheap

1. Go to Domain List → Manage → Advanced DNS
2. Add these records:

| Type  | Host | Value                       | TTL       |
|-------|------|-----------------------------|-----------|
| CNAME | @    | your-project.up.railway.app | Automatic |
| CNAME | *    | your-project.up.railway.app | Automatic |
| CNAME | www  | your-project.up.railway.app | Automatic |

**Note:** Add a trailing dot if Namecheap requires it: `your-project.up.railway.app.`

### GoDaddy

1. Go to My Products → DNS → Manage DNS
2. Add these records:

| Type  | Name | Value                       | TTL    |
|-------|------|-----------------------------|--------|
| CNAME | @    | your-project.up.railway.app | 1 Hour |
| CNAME | *    | your-project.up.railway.app | 1 Hour |
| CNAME | www  | your-project.up.railway.app | 1 Hour |

**Note:** GoDaddy sometimes requires you to remove the default A record for `@` first.

### Google Domains (now Squarespace Domains)

1. Go to DNS → Custom records
2. Add these records:

| Host name | Type  | TTL  | Data                        |
|-----------|-------|------|-----------------------------|
| @         | CNAME | 1h   | your-project.up.railway.app |
| *         | CNAME | 1h   | your-project.up.railway.app |
| www       | CNAME | 1h   | your-project.up.railway.app |

### Other Providers

**General Pattern:**
```
Record Type: CNAME
Name/Host:   @ (or blank, or your domain)
Value/Target: your-project.up.railway.app
TTL: 300-3600 (5 minutes to 1 hour)

Record Type: CNAME
Name/Host:   *.app (wildcard for app subdomain)
Value/Target: your-project.up.railway.app
TTL: 300-3600
```

---

## 🔍 Verify DNS Configuration

### Command Line

```bash
# Check root domain
dig yourdomain.com

# Check wildcard subdomain (use any random subdomain)
dig random-test-123.app.yourdomain.com

# Both should resolve to Railway's IP or CNAME
```

### Online Tools

- **DNS Propagation Checker:** https://www.whatsmydns.net/
- **DNS Lookup:** https://mxtoolbox.com/SuperTool.aspx
- **What's My DNS:** https://www.whatsmydns.net/

### Expected Results

```bash
# dig yourdomain.com should show:
yourdomain.com.  300  IN  CNAME  your-project.up.railway.app.

# dig test.app.yourdomain.com should show:
test.app.yourdomain.com.  300  IN  CNAME  your-project.up.railway.app.
```

---

## ⏱️ DNS Propagation Timeline

| Time     | Status                      |
|----------|-----------------------------|
| 0-5 min  | Changes submitted           |
| 5-30 min | Usually propagated globally |
| 30-2 hrs | Maximum wait (99% cases)    |
| 2-48 hrs | Rare edge cases             |

**Pro tip:** Use Cloudflare for fastest propagation (often < 5 minutes).

---

## 🚨 Common Issues

### Issue: "Site cannot be reached"

**Check 1:** DNS configured correctly?
```bash
dig yourdomain.com
# Should show CNAME to Railway
```

**Check 2:** Wildcard record added?
```bash
dig anything.app.yourdomain.com
# Should also show CNAME to Railway
```

**Check 3:** Railway custom domain added?
- Go to Railway Dashboard → Domains
- Add `yourdomain.com`, `app.yourdomain.com`, and `*.app.yourdomain.com`

### Issue: "SSL Certificate Error"

**Cause:** Railway hasn't provisioned SSL yet (needs DNS to propagate first)

**Solution:**
1. Wait 30 minutes after DNS propagation
2. Verify both domains added in Railway
3. Check Railway logs for certificate status

### Issue: "Only root domain works, subdomains don't"

**Cause:** Forgot wildcard DNS record!

**Solution:**
Add the wildcard record for `*.app`:
```
CNAME  *  your-project.up.railway.app
```

### Issue: "Subdomains show the dashboard instead of wedding site"

**Cause:** `NEXT_PUBLIC_BASE_DOMAIN` not set correctly

**Solution:**
In Railway environment variables:
```bash
NEXT_PUBLIC_BASE_DOMAIN=app.yourdomain.com  # NO https://, NO port
```

---

## ✅ Testing Checklist

After DNS configuration:

- [ ] Wait 10-30 minutes for propagation
- [ ] Test root domain: `https://yourdomain.com`
- [ ] Test www: `https://www.yourdomain.com`
- [ ] Create a test site with slug `test-wedding`
- [ ] Test subdomain: `https://test-wedding.app.yourdomain.com`
- [ ] Verify SSL works (green padlock)
- [ ] Test RSVP form on subdomain
- [ ] Test email notifications

---

## 🎯 What Each Record Does

### Root Domain (`@` or blank)
```
CNAME @ your-project.up.railway.app
```
- Routes `yourdomain.com` → Railway
- Shows your dashboard/editor
- Handles user login/auth

### Wildcard (`*.app`)
```
CNAME *.app your-project.up.railway.app
```
- Routes ALL subdomains under `app` → Railway
- Enables `anything.app.yourdomain.com` to work
- **This is what makes user subdomains possible!**
- Examples:
  - `bengt.app.yourdomain.com` → Wedding site for "bengt"
  - `emma-james.app.yourdomain.com` → Wedding site for "emma-james"
  - `test-123.app.yourdomain.com` → Wedding site for "test-123"

### WWW
```
CNAME www your-project.up.railway.app
```
- Routes `www.yourdomain.com` → Railway
- Optional but recommended for compatibility

---

## 🔗 Next Steps

After DNS is configured:

1. **Set Environment Variable in Railway:**
   ```bash
   NEXT_PUBLIC_BASE_DOMAIN=app.yourdomain.com
   ```

2. **Update Supabase Auth:**
   - Add redirect URL: `https://yourdomain.com/auth/callback`
   - Add redirect URL: `https://app.yourdomain.com/auth/callback`

3. **Verify Resend Domain:**
   - Add TXT and CNAME records for email sending

4. **Test Everything:**
   - Create a test wedding site
   - Publish it with a slug (e.g., `test`)
   - Visit `https://test.app.yourdomain.com`
   - Submit RSVP form
   - Check email notification

---

## 📚 Learn More

- **Full Deployment Guide:** [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)
- **Railway DNS Docs:** https://docs.railway.app/deploy/deployments#custom-domains
- **Cloudflare DNS Docs:** https://developers.cloudflare.com/dns/
- **Let's Encrypt SSL:** https://letsencrypt.org/

---

**Questions?** Check [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed troubleshooting!

Made with 🌐 for seamless subdomain routing


