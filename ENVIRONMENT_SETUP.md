# Environment Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Database Configuration
```bash
# For local development with PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/cyberbyte_db?schema=public"

# For production (Vercel), use a PostgreSQL connection string like:
# DATABASE_URL="postgresql://username:password@hostname:5432/database_name?schema=public"
```

### Email Configuration (for password reset)
```bash
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

### NextAuth Configuration
```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# For production, update NEXTAUTH_URL to your domain:
# NEXTAUTH_URL="https://your-domain.vercel.app"
```

## Database Setup

1. **Local Development**: Set up a PostgreSQL database locally
2. **Production**: Use Vercel's PostgreSQL addon or any PostgreSQL provider
3. **Database Migration**: Run `npx prisma db push` locally to create tables

## Important Notes

- The application now uses PostgreSQL instead of SQLite
- Make sure your `DATABASE_URL` starts with `postgresql://` not `file://`
- For Vercel deployment, set the `DATABASE_URL` environment variable in your Vercel project settings
