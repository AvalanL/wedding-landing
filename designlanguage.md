# Design- och varumärkesriktning - Bröllopssidan.se

## Positionering
- **Varumärke:** Bröllopssidan.se
- **Värdeproposition:** Inger expertis, trovärdighet och lokal förankring
- **Ton:** Varm, kunnig och inkluderande. Förmedla trygghet snarare än sälj.
- **Målgrupp:** Svenska brudpar som söker en enkel och trygg lösning för sin bröllopssida

---

## Färgpalett

### Primära färger
```css
/* Bas */
--background: #FFFDF8;        /* Krämvit bakgrund för mjuk kontrast */

/* Primär accent */
--primary: #B26D4A;           /* Koppar/terracotta – lyx men jordnära */
--primary-dark: #A25D3B;      /* Mörkare variant för hover-states */

/* Sekundära accenter */
--accent-light: #F3D4C2;      /* Ljus pastell för bakgrunder och ramar */
--text-dark: #1F1C14;         /* Mörkbrun för text, hög läsbarhet */
```

### Design-rationale
- **Dova jordtoner + pastell** = premiumkänsla (feedback från svenska bröllopsmagasin)
- **Koppar/terracotta** förmedlar värme och elegans utan att vara för formell
- **Krämvit bas** ger mjuk kontrast och känns inbjudande
- Paletten fungerar för både sommar- och vinterbröllop

---

## Typografi

### Fonter
```css
/* Primär - systemfont för prestanda och läsbarhet */
--font-primary: 'Inter', system-ui, -apple-system, sans-serif;

/* Sekundär - för rubriker (framtida implementation) */
--font-heading: 'DM Serif Display', Georgia, serif;
```

### Linjehöjder
- **Löpande text:** `line-height: 1.6` (god läsbarhet för långa texter)
- **Rubriker:** `line-height: 1.2` (tightare spacing för visuell impact)
- **Små texter:** `line-height: 1.4` (kompakt men läsbar)

### Storlekar
```css
--text-xs: 0.75rem;    /* 12px - metadata, fotnoter */
--text-sm: 0.875rem;   /* 14px - sekundär text */
--text-base: 1rem;     /* 16px - body text */
--text-lg: 1.125rem;   /* 18px - ingress, viktiga texter */
--text-xl: 1.25rem;    /* 20px - mindre rubriker */
--text-2xl: 1.5rem;    /* 24px - kortrubriker */
--text-4xl: 2.25rem;   /* 36px - huvudrubriker mobil */
--text-6xl: 3.75rem;   /* 60px - hero-rubriker desktop */
```

---

## Layoutprinciper

### Maxbredder
- **Artiklar/innehåll:** `max-width: 960px` (ca 70 tecken per rad)
- **Hero-sektioner:** `max-width: 1200px`
- **Smala formulär:** `max-width: 480px`
- **Dashboard/listor:** `max-width: 1440px`

### Spacing-system
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Navigation
- **Sticky toppnavigering** med snabba hopp till huvudkategorier
- Tydlig breadcrumb-navigation för djupare sidor
- Mobilanpassad hamburgermeny med stor klickyta

### Modulära block
- **Hero-modul** på startsidan med tydlig pitch + interna knappar
- **FAQ-block** strukturerat för AI-snippets
- **Källhänvisningar** för trovärdighet (E-E-A-T)
- **Relaterade artiklar** för intern länkning
- **CTA-block** vid strategiska punkter

---

## Bildspråk

### Principer
- **Autenticitet:** Använd verkliga svenska miljöer
- **Lokalt:** Skärgård, herrgårdar, fjällmiljöer, stadshus
- **Mångfald:** Representera olika par och kulturer
- **Hållbarhet:** Fokus på naturliga material och tidlösa lösningar

### Teknisk implementation
```javascript
// Bildoptimering med @astrojs/image eller next/image
- Format: WebP med fallback till JPEG
- Lazy loading: aktiverat
- Alt-texter: alltid på svenska, beskrivande
- Komprimering: ~70% kvalitet för webb
```

### Stilriktlinjer
- Ljusa, varma toner som matchar färgpaletten
- Naturligt ljus, minimalt med flash
- Fokus på detaljer och känslor
- Undvik för stela "stockfoto"-känslor

---

## SEO & UX-best practices

### Navigation
- ✅ Breadcrumbs på alla djupa sidor
- ✅ Tydlig intern länkstruktur
- ✅ Sidfot med snabblänkar (policy, kontakt, FAQ)

### Formulär & interaktion
- ✅ Nyhetsbrevformulär för E-E-A-T
- ✅ GDPR-godkända opt-ins
- ✅ Tydliga felmeddelanden på svenska
- ✅ Success-states med visuell feedback

### Prestanda
- ✅ Lazy loading av bilder
- ✅ Code splitting
- ✅ Minimal JavaScript för snabb laddning
- ✅ Optimerade fonter (system fonts där möjligt)

---

## Tillgänglighet (WCAG 2.1 AA)

### Kontrast
- **Minst 4.5:1** för normal text mot bakgrund
- **Minst 3:1** för stora texter (18px+ eller 14px+ bold)
- Testad mot både ljusa och mörka bakgrunder

### Interaktiva element
```css
/* Focus-states för tangentbordsnavigation */
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Hover-states */
:hover {
  opacity: 0.9;
  transition: all 0.2s ease;
}
```

### Formulär
- ✅ `<label>` kopplat till varje input
- ✅ `aria-label` där visuella labels saknas
- ✅ `aria-required` för obligatoriska fält
- ✅ `aria-invalid` vid valideringsfel
- ✅ Felmeddelanden kopplade med `aria-describedby`

### Semantisk HTML
```html
<!-- Använd rätt element -->
<header>, <nav>, <main>, <article>, <aside>, <footer>
<button> för knappar (inte <div>)
<a> för länkar med href
<h1>-<h6> i logisk ordning
```

---

## Komponentarkitektur

### Struktur
```
Layout (Header, Footer, Meta)
  ↓
Sektion (Hero, Features, CTA)
  ↓
Block (Card, FAQ, Form)
  ↓
Element (Button, Input, Icon)
```

### Namngivning
- **Komponenter:** PascalCase (t.ex. `HeroSection.tsx`)
- **Utilities:** camelCase (t.ex. `formatDate.ts`)
- **Filer:** kebab-case (t.ex. `user-profile.tsx`)

### Design tokens
```typescript
// /styles/tokens.ts
export const colors = {
  background: '#FFFDF8',
  primary: '#B26D4A',
  primaryDark: '#A25D3B',
  accentLight: '#F3D4C2',
  textDark: '#1F1C14',
}

export const typography = {
  fontPrimary: "'Inter', system-ui, sans-serif",
  lineHeightBody: '1.6',
  lineHeightHeading: '1.2',
}

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
}
```

---

## Ton & röst

### Vad vi är
✅ **Varma:** "Vi hjälper er skapa något vackert tillsammans"  
✅ **Kunniga:** "Här är våra tips baserat på 500+ bröllop"  
✅ **Inkluderande:** "Oavsett stil eller budget – vi stöttar er"  
✅ **Trygga:** "Era uppgifter är säkra hos oss"

### Vad vi INTE är
❌ Säljiga: "Köp nu! Begränsat erbjudande!"  
❌ Formella: "Vänligen bevaka era användaruppgifter"  
❌ Tekniska: "Implementera SSL-certifikat för er domän"  
❌ Opersonliga: "Användaren måste fylla i formuläret"

### Exempel på svenska texter
```
Rubrik: "Skapa er drömwebbplats för bröllopet"
Inte: "Bygg din bröllopssida" (för kort, opersonligt)

CTA: "Kom igång gratis"
Inte: "Starta nu" (för generisk)

Feature: "Håll koll på era gäster och deras matpreferenser"
Inte: "RSVP-hantering" (för tekniskt)

Social proof: "Används av hundratals svenska par"
Inte: "500+ aktiva användare" (för opersonligt)
```

---

## Responsiv design

### Breakpoints
```css
/* Mobile first */
--screen-sm: 640px;   /* Tablets */
--screen-md: 768px;   /* Small laptops */
--screen-lg: 1024px;  /* Desktop */
--screen-xl: 1280px;  /* Large desktop */
```

### Mobiloptimering
- Hamburgermeny under 768px
- Single column layout under 640px
- Touch-targets minst 44x44px
- Ingen hover-beroende funktionalitet

---

## Varumärkeselement

### Logotyp
- **Namn:** Bröllopssidan.se
- **Ikon:** Hjärta eller vigselringar (subtilt)
- **Färg:** Primär (#B26D4A) eller textfärg (#1F1C14)

### Tagline (förslag)
- "Din bröllopssida – enkelt och tryggt"
- "Samla allt om ert bröllop på ett ställe"
- "För det viktigaste i livet"

### USP (Unique Selling Points)
1. **Svenskt** – Lokal förankring, svenska serverhallar
2. **Enkelt** – Klart på minuter, inget krångel
3. **Tryggt** – GDPR-säkert, transparenta policies
4. **Vackert** – Professionella designer, mobilanpassat

---

## Implementation checklist

### Per komponent
- [ ] Använder design tokens från tokens.ts
- [ ] Följer färgpaletten exakt
- [ ] Inter som primär font
- [ ] Line-height 1.6 för body text
- [ ] Kontrast minst 4.5:1
- [ ] Focus-states synliga
- [ ] Mobiloptimerad
- [ ] Semantisk HTML
- [ ] Svensk text med rätt ton
- [ ] Alt-texter på svenska

### Per sida
- [ ] Max-width enligt riktlinjer
- [ ] Breadcrumbs (om djup sida)
- [ ] Meta-description på svenska
- [ ] Open Graph-bilder
- [ ] Strukturerad data (Schema.org)
- [ ] Intern länkning
- [ ] CTA synlig utan scroll (where applicable)

---

## Resurser & referenser

### Design inspiration
- Svenska bröllopsmagasin (Martha Stewart Weddings Sverige, Bröllopsguiden)
- Nordisk designtradition (enkelhet, funktionalitet)
- Premium SaaS-produkter (Linear, Notion, Figma)

### Typsnitt
- [Inter på Google Fonts](https://fonts.google.com/specimen/Inter)
- [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display)

### Verktyg
- Kontrastkoll: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Tillgänglighet: [WAVE](https://wave.webaim.org/)
- Prestanda: [PageSpeed Insights](https://pagespeed.web.dev/)

---

**Senast uppdaterad:** 2025-10-07  
**Version:** 1.0  
**Underhålls av:** Produktteamet

