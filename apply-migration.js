const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://ogvcyvuhkinyiymqnwln.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ndmN5dnVoa2lueWl5bXFud2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTQwNDksImV4cCI6MjA3NTM3MDA0OX0.qnvb47T3DhvokvJC_-LFsJZ8qhecRjnBtQ2duLvtJTY'
);

const sql = fs.readFileSync('./supabase/migrations/0004_fix_rsvp_rls.sql', 'utf8');

console.log('📝 Running migration...\n');
console.log('⚠️  Note: This requires service_role key or Supabase dashboard');
console.log('\n🔗 Go to: https://supabase.com/dashboard/project/ogvcyvuhkinyiymqnwln/sql/new');
console.log('\n📋 Copy and paste this SQL:\n');
console.log('─'.repeat(80));
console.log(sql);
console.log('─'.repeat(80));
