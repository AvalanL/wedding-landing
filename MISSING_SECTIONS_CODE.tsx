/**
 * MISSING SECTIONS FOR ALL TEMPLATES
 *
 * Add these 4 sections before the closing </div> of each template
 * Adjust colors/styling to match each template's aesthetic
 *
 * Order: FAQ → Registry → Accommodation → RSVP
 */

// ==================== FAQ SECTION ====================
{sections.faq && data.faq && data.faq.length > 0 && (
  <section className={`py-16 px-8 bg-${palette.background}`} id="faq">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className={`w-12 h-px bg-${palette.primary}`}></div>
          <HelpCircle className={`w-6 h-6 text-${palette.primary}`} />
          <div className={`w-12 h-px bg-${palette.primary}`}></div>
        </div>
        <h2 className={`text-4xl font-bold text-${palette.text}`} style={{ fontFamily: 'Playfair Display, serif' }}>
          Vanliga Frågor
        </h2>
      </div>

      <div className="space-y-4">
        {data.faq.map((item, index) => (
          <details
            key={index}
            className={`group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-${palette.primary}/10 hover:border-${palette.primary}/30`}
          >
            <summary className={`cursor-pointer flex items-center justify-between text-lg font-semibold text-${palette.text} list-none`}>
              <span>{item.question}</span>
              <span className="ml-4 transform group-open:rotate-180 transition-transform text-${palette.primary}">
                ▼
              </span>
            </summary>
            <p className={`mt-4 text-${palette.text}/80 leading-relaxed`}>
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
)}

// ==================== GIFT REGISTRY SECTION ====================
{sections.registry && data.giftRegistry && (
  <section className={`py-16 px-8 bg-gradient-to-b from-white to-${palette.background}`} id="registry">
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-10">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className={`w-12 h-px bg-${palette.primary}`}></div>
          <Gift className={`w-6 h-6 text-${palette.primary}`} />
          <div className={`w-12 h-px bg-${palette.primary}`}></div>
        </div>
        <h2 className={`text-4xl font-bold text-${palette.text}`} style={{ fontFamily: 'Playfair Display, serif' }}>
          Gåvor
        </h2>
      </div>

      <div className={`bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-${palette.primary}/20`}>
        <p className={`text-xl leading-relaxed text-${palette.text}/90`}>
          {data.giftRegistry}
        </p>
      </div>
    </div>
  </section>
)}

// ==================== ACCOMMODATION SECTION ====================
{sections.accommodation && data.accommodation && (
  <section className={`py-16 px-8 bg-white`} id="accommodation">
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-10">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className={`w-12 h-px bg-${palette.primary}`}></div>
          <Home className={`w-6 h-6 text-${palette.primary}`} />
          <div className={`w-12 h-px bg-${palette.primary}`}></div>
        </div>
        <h2 className={`text-4xl font-bold text-${palette.text}`} style={{ fontFamily: 'Playfair Display, serif' }}>
          Boende
        </h2>
      </div>

      <div className={`bg-${palette.background} p-10 rounded-3xl shadow-lg border border-${palette.primary}/10`}>
        <p className={`text-xl leading-relaxed text-${palette.text}/90`}>
          {data.accommodation}
        </p>
      </div>
    </div>
  </section>
)}

// ==================== RSVP FORM SECTION ====================
{sections.rsvp && data.rsvpMessage && (
  <section className={`py-16 px-8 bg-gradient-to-b from-${palette.background} to-white`} id="rsvp">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className={`w-12 h-px bg-${palette.primary}`}></div>
          <UserCheck className={`w-6 h-6 text-${palette.primary}`} />
          <div className={`w-12 h-px bg-${palette.primary}`}></div>
        </div>
        <h2 className={`text-4xl font-bold text-${palette.text}`} style={{ fontFamily: 'Playfair Display, serif' }}>
          OSA
        </h2>
        {data.rsvpDeadline && (
          <p className={`text-lg text-${palette.text}/60 mt-2`}>
            Svara senast {data.rsvpDeadline}
          </p>
        )}
      </div>

      <div className={`bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-${palette.primary}/20`}>
        <p className={`text-lg leading-relaxed text-${palette.text}/80 mb-8 text-center`}>
          {data.rsvpMessage}
        </p>

        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          alert('RSVP functionality would be implemented here with backend integration');
        }}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className={`text-${palette.text}`}>Namn *</Label>
              <Input
                id="name"
                type="text"
                required
                className="mt-2"
                placeholder="Ditt fullständiga namn"
              />
            </div>
            <div>
              <Label htmlFor="email" className={`text-${palette.text}`}>E-post *</Label>
              <Input
                id="email"
                type="email"
                required
                className="mt-2"
                placeholder="din@email.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="guests" className={`text-${palette.text}`}>Antal gäster *</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              required
              className="mt-2"
              placeholder="1"
            />
          </div>

          <div>
            <Label htmlFor="dietary" className={`text-${palette.text}`}>Matpreferenser / Allergier</Label>
            <Textarea
              id="dietary"
              rows={3}
              className="mt-2"
              placeholder="T.ex. vegetarian, glutenfri, nötallergiker..."
            />
          </div>

          <div>
            <Label htmlFor="message" className={`text-${palette.text}`}>Meddelande till oss (valfritt)</Label>
            <Textarea
              id="message"
              rows={4}
              className="mt-2"
              placeholder="Skriv något fint..."
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className={`w-full bg-${palette.primary} hover:bg-${palette.primary}/90 text-white text-lg py-6 rounded-full shadow-lg hover:shadow-xl transition-all`}
          >
            Skicka OSA ♥
          </Button>
        </form>

        {data.rsvpEmail && (
          <p className={`text-center text-sm text-${palette.text}/60 mt-6`}>
            Eller mejla till:{' '}
            <a
              href={`mailto:${data.rsvpEmail}`}
              className={`text-${palette.primary} underline hover:text-${palette.primary}/80`}
            >
              {data.rsvpEmail}
            </a>
          </p>
        )}
      </div>
    </div>
  </section>
)}

// ==================== FLOATING RSVP BUTTON ====================
{/* Add this at the very end, just before closing </div> */}
<a
  href="#rsvp"
  className={`fixed bottom-8 right-8 bg-${palette.primary} hover:bg-${palette.primary}/90 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-${palette.primary}/50 transition-all duration-300 hover:scale-110 z-50 font-semibold flex items-center gap-2`}
>
  OSA Nu
  <Heart className="w-5 h-5" />
</a>

/**
 * USAGE INSTRUCTIONS:
 *
 * 1. Find where each template's gallery section ends
 * 2. Before the closing </div> of the template, add all 4 sections above
 * 3. Add the floating RSVP button at the very end
 * 4. Adjust styling to match template aesthetic:
 *    - Romantic: Keep Playfair Display font
 *    - Modern: Change to Helvetica Neue, font-light
 *    - Vintage: Change to Georgia, add vintage decorations
 *    - Elegant: Ultra-thin font, extreme tracking
 *    - Bohemian: Add emoji decorations
 *    - Minimalist: Remove decorative lines, minimal styling
 *    - Garden: Add floral emojis
 *    - Art Deco: Add geometric patterns
 *    - Beach: Add ocean colors
 *    - Rustic: Add wood textures
 *    - Whimsical: Comic Sans, colorful, playful
 *    - Cinematic: Film noir styling, dramatic
 *
 * 5. Test all palettes to ensure colors work correctly
 */
