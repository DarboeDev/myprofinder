# MyProFinder 🚀

**MyProFinder** is a professional marketplace platform that connects clients with verified digital professionals across Africa. Built with Next.js 16, TypeScript, MongoDB, and TailwindCSS.

## 📋 Overview

MyProFinder allows clients to browse and hire digital professionals (developers, designers, marketers, writers, etc.) while providing administrators with a powerful dashboard to manage professionals and client requests.

### Key Features

- 🔍 **Browse Professionals** - Search and filter digital professionals by category, location, and skills
- 👤 **Professional Profiles** - Detailed profiles with portfolios, reviews, and ratings
- 📝 **Service Requests** - Clients can submit project requests
- 🔐 **Admin Dashboard** - Complete CRUD operations for managing professionals and requests
- 🌍 **Bilingual Support** - Full English and French translations
- ✅ **Professional Assignment** - Admins can assign professionals to client requests

## 🛠 Tech Stack

- **Framework**: Next.js 16.2.5 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **Styling**: TailwindCSS 4
- **Runtime**: Node.js

## 📦 Installation

### Prerequisites

- Node.js 20+ installed
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd konnect-af
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/myprofinder
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myprofinder

   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```
   This creates sample professionals and admin account.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Admin Credentials

After running the seed script, use these credentials to access the admin panel:

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@myprofinder.af`
- **Password**: `admin123`

## 📁 Project Structure

```
konnect-af/
├── app/                      # Next.js App Router
│   ├── admin/               # Admin dashboard pages
│   │   ├── login/          # Admin login page
│   │   └── page.tsx        # Main admin dashboard
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── professionals/  # Professional CRUD endpoints
│   │   └── requests/       # Request management endpoints
│   ├── find-professional/  # Professional search page
│   ├── professionals/      # Professional listing & profiles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/             # Reusable React components
│   ├── navbar.tsx         # Navigation bar
│   └── footer.tsx         # Footer
├── lib/                   # Utilities and configuration
│   ├── models/           # Mongoose models
│   │   ├── Admin.ts     # Admin user model
│   │   ├── Professional.ts # Professional model
│   │   └── Request.ts   # Client request model
│   ├── auth-context.tsx # Authentication context
│   ├── auth.ts          # JWT utilities
│   ├── dummy-data.ts    # Sample data
│   ├── language-context.tsx # i18n context
│   ├── mongodb.ts       # Database connection
│   └── translations.ts  # Translation strings
├── scripts/              # Database scripts
│   ├── seed.ts          # Seed database with sample data
│   └── add-titles.ts    # Migration script
└── public/              # Static assets
    └── images/         # Image files
```

## 🚀 Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data
- `npm run add-titles` - Migration script to add titles to professionals

## 📚 Documentation

For detailed usage instructions, features, and admin guide, see [MANUAL.md](MANUAL.md).

## 🌐 Key Pages

- **Homepage** - `/` - Landing page with featured professionals
- **Browse Professionals** - `/professionals` - List all active professionals
- **Professional Profile** - `/professionals/[id]` - Detailed profile page
- **Find Professional** - `/find-professional` - Search and filter
- **Admin Login** - `/admin/login` - Admin authentication
- **Admin Dashboard** - `/admin` - Manage professionals and requests

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new admin (disabled by default)

### Professionals
- `GET /api/professionals` - List all active professionals
- `GET /api/professionals?admin=true` - List all professionals (admin only)
- `GET /api/professionals/[id]` - Get single professional
- `POST /api/professionals` - Create professional (admin only)
- `PUT /api/professionals/[id]` - Update professional (admin only)
- `DELETE /api/professionals/[id]` - Delete professional (admin only)

### Requests
- `GET /api/requests` - List all requests
- `GET /api/requests/[id]` - Get single request
- `POST /api/requests` - Create new request
- `PUT /api/requests/[id]` - Update request (admin only)

## 🎨 Features in Detail

### For Clients
- Browse verified professionals by category
- View detailed profiles with portfolios and reviews
- Submit service requests with project details
- Bilingual interface (English/French)

### For Admins
- Complete professional management (Create, Read, Update, Delete)
- Request management and professional assignment
- Real-time data updates with cache busting
- Secure authentication with JWT tokens
- Dashboard with tabbed interface

## 🔧 Development

The project uses Next.js 16 App Router with the following conventions:

- **Server Components** by default
- **Client Components** marked with `'use client'`
- **API Routes** in `app/api/` directory
- **Layouts** for shared UI structure
- **Metadata** for SEO optimization

## 📄 License

This project is private and proprietary.

## 👨‍💻 Developer

Designed and developed by [Darboe Dev](https://darboe-dev-portfolio.vercel.app/)

---

For questions or support, please refer to [MANUAL.md](MANUAL.md) for detailed documentation.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
