const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel deployment preparation...\n');

// Check if DATABASE_URL is set for production
const envFile = path.join(process.cwd(), '.env.local');
let envContent = '';

if (fs.existsSync(envFile)) {
  envContent = fs.readFileSync(envFile, 'utf8');
}

if (!envContent.includes('postgresql://')) {
  console.log('⚠️  WARNING: No PostgreSQL DATABASE_URL found in .env.local');
  console.log('📝 Please set up a PostgreSQL database and add DATABASE_URL to Vercel environment variables');
  console.log('📖 See VERCEL_DEPLOYMENT.md for detailed instructions\n');
}

// Generate Prisma client for production
console.log('🔧 Generating Prisma client for production...');
try {
  execSync('npx prisma generate --schema=./prisma/schema.production.prisma', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully\n');
} catch (error) {
  console.error('❌ Failed to generate Prisma client:', error.message);
  process.exit(1);
}

// Build the application
console.log('🏗️  Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Application built successfully\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

console.log('🎉 Ready for deployment!');
console.log('📋 Next steps:');
console.log('1. Set up PostgreSQL database (see VERCEL_DEPLOYMENT.md)');
console.log('2. Add DATABASE_URL to Vercel environment variables');
console.log('3. Deploy to Vercel: vercel --prod');
console.log('4. Run database migration: npx prisma db push --schema=./prisma/schema.production.prisma');
console.log('5. Seed the database: npm run db:seed');
