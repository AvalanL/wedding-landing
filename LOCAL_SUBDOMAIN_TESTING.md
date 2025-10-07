# 🧪 Lokal Subdomain-testning

## Problem
Du vill testa subdomäner (t.ex. `bengt.bröllopssidan.se`) lokalt innan deploy.

## Lösning
Jag har uppdaterat `middleware.ts` för att hantera lokala subdomäner!

---

## ✅ **Alternativ 1: bengt.localhost (Enklast, fungerar direkt!)**

### Steg:
1. **Servern körs redan på `localhost:3000`**
2. **Besök i browsern:**
   ```
   http://bengt.localhost:3000
   ```

3. **Middleware kommer automatiskt:**
   - Identifiera `bengt` som subdomain
   - Rewrite till `/sites/bengt`
   - Rendera din publicerade sida med RSVP-formulär!

### Exempel:
```bash
# Main app (dashboard, editor)
http://localhost:3000          → Dashboard/Editor

# Publicerade sidor (subdomäner)
http://bengt.localhost:3000    → /sites/bengt
http://emma-james.localhost:3000 → /sites/emma-james
http://test.localhost:3000     → /sites/test
```

### ✨ Fördelar:
- ✅ Inget setup krävs
- ✅ Fungerar på alla moderna browsers
- ✅ Chrome, Firefox, Safari stöder detta natively
- ✅ Inget behov att redigera system-filer

---

## ✅ **Alternativ 2: localhost.direct (Backup om .localhost inte fungerar)**

Om din browser inte stöder `.localhost` kan du använda `localhost.direct`:

### Steg:
1. **Uppdatera `.env.local`:**
   ```bash
   NEXT_PUBLIC_BASE_DOMAIN=localhost.direct:3000
   ```

2. **Starta om servern:**
   ```bash
   pkill -9 -f "next" && sleep 2 && pnpm dev
   ```

3. **Besök:**
   ```
   http://bengt.localhost.direct:3000
   ```

### ✨ Fördelar:
- ✅ DNS pekar automatiskt till 127.0.0.1
- ✅ Alla subdomäner fungerar
- ✅ Inget behov att redigera `/etc/hosts`

---

## ✅ **Alternativ 3: /etc/hosts (Mest realistiskt)**

För att simulera riktiga domäner:

### Steg:
1. **Redigera `/etc/hosts` (kräver sudo):**
   ```bash
   sudo nano /etc/hosts
   ```

2. **Lägg till:**
   ```
   127.0.0.1 brollopssidan.local
   127.0.0.1 bengt.brollopssidan.local
   127.0.0.1 emma-james.brollopssidan.local
   127.0.0.1 test.brollopssidan.local
   ```

3. **Spara och stäng (Ctrl+O, Enter, Ctrl+X)**

4. **Uppdatera `.env.local`:**
   ```bash
   NEXT_PUBLIC_BASE_DOMAIN=brollopssidan.local:3000
   ```

5. **Starta om servern**

6. **Besök:**
   ```
   http://bengt.brollopssidan.local:3000
   ```

### ✨ Fördelar:
- ✅ Mest likt production
- ✅ Kan använda vilka domäner som helst
- ✅ Bra för staging/demo

---

## 🧪 **Test Checklist**

När du väl har valt ett alternativ, testa följande:

### 1. **Publicera en sida först:**
```
1. Gå till http://localhost:3000
2. Logga in
3. Skapa/redigera en sida
4. Sätt slug till "bengt" (eller vad du vill)
5. Klicka "Publicera"
```

### 2. **Besök subdomain:**
```
http://bengt.localhost:3000
```

### 3. **Du ska se:**
- ✅ Din publicerade bröllopssida
- ✅ Alla sektioner (Hero, Story, Details, etc.)
- ✅ **OSA-formulär i RSVP-sektionen** (om aktiverad)

### 4. **Testa RSVP:**
```
1. Scrolla till OSA-sektionen
2. Fyll i formuläret:
   - Välj "Jag kommer" eller "Kan inte"
   - Fyll i namn (required)
   - Fyll i email, telefon (optional)
   - Antal gäster (om kommer)
   - Allergier (optional)
   - Meddelande (optional)
3. Klicka "Skicka OSA"
4. Du ska se success-meddelande! 🎉
```

### 5. **Verifiera som ägare:**
```
1. Gå till http://localhost:3000/dashboard
2. Klicka på MessageSquare-ikonen på din publicerade sida
3. Du ska se ditt OSA-svar i dashboarden!
```

---

## 🔍 **Hur Middleware Fungerar**

```typescript
// Input: bengt.localhost:3000
// ↓
// Middleware detekterar subdomain "bengt"
// ↓
// Rewrite till: /sites/bengt
// ↓
// Next.js renderar: app/sites/[slug]/page.tsx
// ↓
// Fetchar published data från DB
// ↓
// Renderar template med siteId
// ↓
// RSVPForm får siteId och fungerar!
```

---

## 🐛 **Troubleshooting**

### Problem: "Sidan hittades inte"
**Lösning:**
1. Kontrollera att sidan är publicerad (inte bara sparad som draft)
2. Verifiera slug matchar subdomain (`bengt` → `bengt.localhost:3000`)
3. Kolla att servern är igång

### Problem: "OSA-formulär visas inte"
**Lösning:**
1. Kontrollera att RSVP-sektionen är aktiverad i editorn
2. Verifiera att `siteId` skickas korrekt (öppna DevTools → Console)
3. Kolla att sidan är publicerad (inte draft)

### Problem: "Cannot submit RSVP"
**Lösning:**
1. Öppna DevTools → Network tab
2. Kolla POST till `/api/rsvp`
3. Verifiera error message
4. Kontrollera att sidan är publicerad i databasen

### Problem: ".localhost fungerar inte i min browser"
**Lösning:**
Använd Alternativ 2 (localhost.direct) eller Alternativ 3 (/etc/hosts)

---

## ✅ **Rekommendation**

**För snabb testning:** Använd **Alternativ 1** (`bengt.localhost:3000`)

**Det fungerar direkt utan någon konfiguration!**

---

## 🚀 **Production Setup (senare)**

När du deploya till Vercel/production:

1. **Uppdatera `.env` på Vercel:**
   ```
   NEXT_PUBLIC_BASE_DOMAIN=bröllopssidan.se
   ```

2. **Konfigurera DNS:**
   ```
   A    @                  → Vercel IP
   A    *                  → Vercel IP (wildcard för subdomäner)
   ```

3. **Lägg till domain i Vercel:**
   - Add Domain: `bröllopssidan.se`
   - Add Domain: `*.bröllopssidan.se`

4. **Middleware fungerar automatiskt för:**
   ```
   https://bengt.bröllopssidan.se
   https://emma-james.bröllopssidan.se
   etc.
   ```

**Allt fungerar redan - ingen kod behöver ändras!** 🎉

