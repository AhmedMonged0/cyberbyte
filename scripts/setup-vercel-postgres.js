const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Vercel with PostgreSQL...\n');

// Check if we're in the right directory
if (!fs.existsSync('vercel.json')) {
  console.error('❌ Error: vercel.json not found. Make sure you\'re in the project root.');
  process.exit(1);
}

console.log('📋 Vercel Setup Instructions:');
console.log('=====================================\n');

console.log('1. 🗄️  Create PostgreSQL Database:');
console.log('   Option A - Vercel Postgres (Recommended):');
console.log('   - Go to Vercel Dashboard');
console.log('   - Select your project');
console.log('   - Go to Storage → Create Database → Postgres');
console.log('   - Copy the DATABASE_URL\n');

console.log('   Option B - Neon (Free):');
console.log('   - Go to https://neon.tech');
console.log('   - Create free account');
console.log('   - Create new project');
console.log('   - Copy the DATABASE_URL\n');

console.log('   Option C - Supabase (Free):');
console.log('   - Go to https://supabase.com');
console.log('   - Create new project');
console.log('   - Go to Settings → Database');
console.log('   - Copy the DATABASE_URL\n');

console.log('2. 🔧 Set Environment Variables in Vercel:');
console.log('   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables');
console.log('   - Add these variables:');
console.log('   DATABASE_URL=postgresql://username:password@host:port/database?schema=public');
console.log('   NEXTAUTH_SECRET=your-super-secret-key');
console.log('   NEXTAUTH_URL=https://your-domain.vercel.app\n');

console.log('3. 🚀 Deploy to Vercel:');
console.log('   - Run: vercel --prod');
console.log('   - Or push to GitHub if connected\n');

console.log('4. 🗃️  Setup Database:');
console.log('   - After deployment, run:');
console.log('   npx prisma db push --schema=./prisma/schema.production.prisma');
console.log('   npx prisma db seed --schema=./prisma/schema.production.prisma\n');

console.log('5. 🌱 Seed Database:');
console.log('   - Run: npm run db:seed\n');

console.log('📝 Current Configuration:');
console.log('=====================================');

// Check current vercel.json
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
console.log('✅ Vercel config:', JSON.stringify(vercelConfig, null, 2));

// Check if production schema exists
if (fs.existsSync('prisma/schema.production.prisma')) {
  console.log('✅ Production schema exists');
} else {
  console.log('❌ Production schema missing');
}

// Check if .env.local exists
if (fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  if (envContent.includes('postgresql://')) {
    console.log('✅ PostgreSQL DATABASE_URL found in .env.local');
  } else {
    console.log('⚠️  No PostgreSQL DATABASE_URL in .env.local');
  }
} else {
  console.log('❌ .env.local not found');
}

console.log('\n🎯 Next Steps:');
console.log('1. Create PostgreSQL database (choose one option above)');
console.log('2. Add DATABASE_URL to Vercel environment variables');
console.log('3. Deploy: vercel --prod');
console.log('4. Setup database: npx prisma db push --schema=./prisma/schema.production.prisma');
console.log('5. Seed database: npm run db:seed');
