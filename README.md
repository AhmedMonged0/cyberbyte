# CyberByte E-commerce

A modern, responsive e-commerce website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog**: Browse and search through a comprehensive product catalog
- 🎯 **Featured Products**: Highlighted products on the homepage
- 🔍 **Advanced Search & Filtering**: Search by name, brand, category, and price range
- 📱 **Responsive Design**: Optimized for all devices
- 🎨 **Modern UI**: Cyber-themed design with animations and effects
- 🛒 **Shopping Cart**: Add products to cart (local storage)
- 👤 **User Authentication**: Login and registration system
- 🔐 **Admin Dashboard**: Manage products, users, and orders
- 📊 **Analytics**: Track sales and user activity

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom JWT-based auth
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cyberbyte-ecommerce.git
   cd cyberbyte-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/cyberbyte_db?schema=public"
   
   # Email configuration (for password reset)
   EMAIL_HOST="smtp.gmail.com"
   EMAIL_PORT=587
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-password"
   
   # NextAuth configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # Seed sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed sample data
- `npm run create-admin` - Create admin user

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard pages
│   ├── products/          # Product pages
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Home/             # Homepage components
│   ├── Layout/           # Layout components
│   └── ProductImage.tsx  # Product image component
├── contexts/             # React contexts
├── lib/                  # Utility functions
└── data/                 # Static data
```

## Database Schema

The application uses the following main models:

- **User**: Customer accounts
- **Admin**: Admin accounts
- **Product**: Product catalog
- **Order**: Customer orders
- **OrderItem**: Order line items
- **ResetToken**: Password reset tokens
- **SiteSettings**: Site configuration

## Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `EMAIL_HOST` | SMTP server host | No |
| `EMAIL_PORT` | SMTP server port | No |
| `EMAIL_USER` | SMTP username | No |
| `EMAIL_PASS` | SMTP password | No |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | JWT secret key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub.

---

**Note**: This is a demo project. For production use, ensure you:
- Use a secure database
- Implement proper error handling
- Add comprehensive testing
- Set up monitoring and logging
- Follow security best practices