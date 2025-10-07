# 📧 Email Notifications Setup Guide

## Overview
När gäster skickar OSA-svar får bröllopsparet (site owners) **instant email-notifikationer** med all information.

---

## 🎨 **Email Features**

✅ **Beautiful branded design** matching Bröllopssidan.se  
✅ **Instant delivery** via Resend  
✅ **Complete guest info:**
- Name & attendance status
- Number of guests
- Contact info (email/phone)
- Dietary restrictions
- Personal message

✅ **Direct CTA button** to view all RSVPs in dashboard  
✅ **Mobile-optimized** HTML email template  
✅ **Graceful error handling** - RSVPs saved even if email fails

---

## 🚀 **Setup Steps**

### 1. **Get Resend API Key** (FREE - 3,000 emails/month)

```bash
1. Gå till https://resend.com/signup
2. Skapa konto (GitHub login rekommenderas)
3. Verifiera din email
4. Gå till "API Keys" i dashboard
5. Klicka "Create API Key"
6. Ge den ett namn: "Bröllopssidan Production"
7. Kopiera API-nyckeln (börjar med re_...)
```

### 2. **Add API Key to Environment Variables**

```bash
# Open .env.local
nano .env.local

# Add this line:
RESEND_API_KEY=re_your_api_key_here

# Save and close (Ctrl+O, Enter, Ctrl+X)
```

### 3. **Domain Setup** (PRODUCTION ONLY - Skip för localhost testing)

För att skicka från din egen domän:

```bash
1. Gå till Resend Dashboard → Domains
2. Klicka "Add Domain"
3. Lägg till: bröllopssidan.se
4. Lägg till DNS records (SPF, DKIM, DMARC):
   - Kopiera DNS records från Resend
   - Lägg till i din DNS provider (CloudFlare, AWS Route53, etc.)
5. Vänta på verifiering (~5-10 min)
6. Status blir "Verified" ✅
```

**För localhost/testing:**
- Resend skickar från `onboarding@resend.dev`
- Fungerar direkt utan domain setup!
- Perfekt för development

### 4. **Restart Server**

```bash
# Kill current dev server
pkill -9 -f "next"

# Start again
cd /Users/benjamin/Downloads/wedding-landing && pnpm dev
```

---

## 🧪 **Testing Email Notifications**

### 1. **Submit Test RSVP:**

```bash
1. Besök: http://bengt.localhost:3000
2. Scrolla till OSA-sektionen
3. Fyll i formuläret:
   - Namn: "Test Gäst"
   - Email: test@example.com
   - Välj: "Jag kommer"
   - Antal gäster: 2
   - Allergier: "Glutenfri"
   - Meddelande: "Ser fram emot bröllopet!"
4. Klicka "Skicka OSA"
```

### 2. **Check Your Email:**

Kolla din inbox (den email du använde för Google OAuth login):
- **Subject:** "Nytt OSA-svar från Test Gäst"
- **From:** Bröllopssidan <notifications@bröllopssidan.se> (eller onboarding@resend.dev)
- **Content:** Vacker HTML-email med all gästinfo

### 3. **Check Logs:**

I terminalen där servern kör ska du se:
```
✅ Email notification sent to your@email.com
```

---

## 📊 **Email Template Preview**

```
┌─────────────────────────────────────────┐
│                                         │
│            💌                           │
│      Nytt OSA-svar!                     │
│     från bengt                          │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────────────┐          │
│  │ ✓ Kommer                 │          │
│  └──────────────────────────┘          │
│                                         │
│  Test Gäst                              │
│                                         │
│  Antal gäster: 2 personer               │
│  E-post: test@example.com               │
│  Telefon: 070-123 45 67                 │
│                                         │
│  🍽️ Matpreferenser                     │
│  Glutenfri                              │
│                                         │
│  💬 Meddelande                          │
│  "Ser fram emot bröllopet!"             │
│                                         │
│  [ Visa alla OSA-svar → ]               │
│                                         │
├─────────────────────────────────────────┤
│  Bröllopssidan.se                       │
│  Skapar minnesvärda bröllopssidor       │
└─────────────────────────────────────────┘
```

---

## 🔍 **Troubleshooting**

### Problem: "Skipping email: RESEND_API_KEY not configured"

**Solution:**
1. Check `.env.local` exists and has `RESEND_API_KEY`
2. Restart dev server
3. Make sure no extra spaces or quotes around the key

### Problem: "Could not fetch owner email"

**Solution:**
- SQL function might not be created
- Run migrations again: Check Supabase dashboard → SQL Editor
- Verify function exists: `SELECT * FROM pg_proc WHERE proname = 'get_user_email'`

### Problem: Email not received

**Possible causes:**
1. **Spam folder** - Check junk/spam
2. **Wrong email** - Verify the email you used for Google OAuth
3. **Resend quota** - Free tier: 3,000 emails/month
4. **Domain not verified** - Use `onboarding@resend.dev` for testing

**Check Resend Dashboard:**
- Go to Logs
- See delivery status
- Check bounce/complaint rates

### Problem: "Failed to send email notification"

**Solution:**
- Check Resend API key is valid
- Check internet connection
- Verify Resend service status: https://resend.com/status

---

## 📈 **Production Checklist**

Before going live:

- [ ] Verify domain in Resend
- [ ] Add all DNS records (SPF, DKIM, DMARC)
- [ ] Update `RESEND_API_KEY` in production environment variables (Vercel/Railway/etc.)
- [ ] Test email delivery from production domain
- [ ] Set up `NEXT_PUBLIC_APP_URL` to production URL
- [ ] Monitor Resend dashboard for delivery metrics

---

## 💰 **Resend Pricing** (as of 2024)

**Free Tier:**
- 3,000 emails/month
- 100 emails/day
- Perfect for small-medium weddings!

**Pro Plan ($20/month):**
- 50,000 emails/month
- For wedding services managing multiple sites

---

## 🎯 **Email Sending Logic**

```typescript
// When guest submits RSVP:
1. Save RSVP to database ✅
2. Get site owner's email from auth.users
3. Render beautiful HTML email template
4. Send via Resend API
5. Log success/failure
6. Return response to guest (even if email fails)
```

**Important:** Email sending is async and won't block the RSVP submission. Even if email fails, the RSVP is saved!

---

## 🔒 **Security Notes**

- ✅ API key stored in environment variables (never in code)
- ✅ Owner email fetched via secure SQL function
- ✅ No guest email addresses stored without consent
- ✅ Emails sent only to verified site owners
- ✅ Rate limiting handled by Resend

---

## 🎨 **Customization**

### Change Email Branding:

Edit `lib/emails/rsvp-notification.tsx`:
- Colors: Update `#B26D4A`, `#F3D4C2`, etc.
- Logo: Add `<img>` tag in header
- Footer text: Modify footer section
- Subject line: Change in `app/api/rsvp/route.ts`

### Change "From" Address:

In `app/api/rsvp/route.ts`, line ~167:
```typescript
from: 'Your Name <your@domain.com>',
```

---

## ✅ **Success!**

You now have world-class email notifications! 🎊

Every time someone RSVPs, you'll get an instant, beautiful email notification with all the details.

**Next steps:**
- Test with different RSVP scenarios (attending vs not attending)
- Check Resend dashboard for analytics
- Customize email template if needed
- Deploy to production!

