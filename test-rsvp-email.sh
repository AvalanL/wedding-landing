#!/bin/bash

echo "🧪 Skickar test-RSVP för att trigga email..."
echo ""

# Get site ID from database (assuming lustigkurre is published)
SITE_ID="14621a23-267a-4c28-bba3-d497e6fd1e8b"

# Send RSVP
curl -X POST http://localhost:3000/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{
    "site_id": "'"$SITE_ID"'",
    "guest_name": "Test Testsson",
    "email": "test@example.com",
    "phone": "070-123 45 67",
    "attending": true,
    "number_of_guests": 3,
    "dietary_restrictions": "Glutenfri, vegansk",
    "message": "Vi ser verkligen fram emot denna fantastiska dag! 🎉"
  }'

echo ""
echo ""
echo "✅ RSVP skickat!"
echo "👀 Kolla terminalen (där servern kör) för email-log"
echo "📧 Kolla din inbox!"
