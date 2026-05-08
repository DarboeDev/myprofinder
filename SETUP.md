# Konnect.af - MVP Setup Guide

## Overview
Konnect.af is a freelance marketplace platform connecting clients with digital professionals in Africa (Gambia & Senegal). The platform includes:
- Client request submission
- Professional listings
- Admin dashboard with authentication
- Bilingual support (English/French)
- MongoDB backend with Node.js API routes

## Prerequisites
- Node.js 18+ installed
- MongoDB installed and running locally (or MongoDB Atlas connection string)
- Git

## Installation

### 1. Clone and Install Dependencies
```bash
cd konnect-af
npm install
```

### 2. Environment Setup
The `.env.local` file has been created with default values:
```env
MONGODB_URI=mongodb://localhost:27017/konnect-af
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Important**: Change the `JWT_SECRET` to a secure random string for production!

### 3. Start MongoDB
Make sure MongoDB is running locally:
```bash
# Windows (if installed as service)
net start MongoDB

# Or start manually
mongod
```

Alternatively, use MongoDB Atlas and update `MONGODB_URI` in `.env.local`

### 4. Seed the Database
Run the seed script to populate the database with:
- Admin user
- 6 sample professionals
- 3 sample client requests

```bash
npm run seed
```

This will output:
```
Admin Login Credentials:
Email: admin@konnect.af
Password: admin123
```

### 5. Start the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Features

### Public Pages
1. **Home** (`/`) - Hero section, featured professionals, categories, how it works
2. **Professionals** (`/professionals`) - Browse and search professionals
3. **Professional Profile** (`/professionals/[id]`) - Individual professional details
4. **Find Professional** (`/find-professional`) - Client request submission form

### Admin Panel
1. **Admin Login** (`/admin/login`) - Secure authentication with JWT
2. **Admin Dashboard** (`/admin`) - Protected dashboard showing:
   - Statistics (pending, active, completed requests)
   - All client requests in table format
   - Request status management
   - Request details modal

### Authentication
- JWT-based authentication
- 7-day token expiration
- Token stored in localStorage
- Protected admin routes

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Create new admin (for initial setup)
- `GET /api/auth/verify` - Verify JWT token (protected)

### Professionals
- `GET /api/professionals` - Get all professionals (public, supports search & category filter)
- `POST /api/professionals` - Create professional (protected, admin only)
- `GET /api/professionals/[id]` - Get single professional (public)

### Requests
- `GET /api/requests` - Get all requests (protected, admin only)
- `POST /api/requests` - Submit client request (public)
- `GET /api/requests/[id]` - Get single request (protected)
- `PATCH /api/requests/[id]` - Update request status (protected, admin only)

## Database Models

### Admin
```typescript
{
  email: string (unique)
  password: string (hashed with bcrypt)
  name: string
  createdAt: Date
}
```

### Professional
```typescript
{
  name: string
  bio: string (English)
  bioFr: string (French)
  skills: string[]
  location: string
  hourlyRate: number
  avatar: string
  rating: number
  totalReviews: number
  categories: string[]
  portfolio: Array<{title, titleFr, image, description, descriptionFr}>
  reviews: Array<{clientName, rating, comment, commentFr, date}>
  isActive: boolean
  createdAt: Date
}
```

### Request
```typescript
{
  clientName: string
  clientEmail: string
  clientPhone: string
  category: string
  projectTitle: string
  projectDescription: string
  budget: string
  timeline: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  assignedProfessional: ObjectId (ref: Professional)
  notes: string
  createdAt: Date
  updatedAt: Date
}
```

## Default Admin Credentials
```
Email: admin@konnect.af
Password: admin123
```

**⚠️ Change this password immediately in production!**

## Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes (Node.js)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Image Optimization**: Next.js Image component

## Project Structure
```
konnect-af/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx          # Admin login form
│   │   └── page.tsx                 # Admin dashboard (protected)
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts      # Login endpoint
│   │   │   ├── register/route.ts   # Register endpoint
│   │   │   └── verify/route.ts     # Token verification
│   │   ├── professionals/
│   │   │   ├── [id]/route.ts       # Single professional
│   │   │   └── route.ts             # List/create professionals
│   │   └── requests/
│   │       ├── [id]/route.ts       # Single request
│   │       └── route.ts             # List/create requests
│   ├── find-professional/page.tsx   # Client request form
│   ├── professionals/
│   │   ├── [id]/page.tsx           # Professional profile
│   │   └── page.tsx                 # Professionals listing
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page
│   └── globals.css                  # Global styles
├── components/
│   ├── navbar.tsx                   # Navigation with language toggle
│   └── footer.tsx                   # Footer with links
├── lib/
│   ├── models/
│   │   ├── Admin.ts                 # Admin Mongoose model
│   │   ├── Professional.ts          # Professional Mongoose model
│   │   └── Request.ts               # Request Mongoose model
│   ├── auth.ts                      # JWT utilities
│   ├── auth-context.tsx             # Auth state management
│   ├── dummy-data.ts                # Sample data for seeding
│   ├── language-context.tsx         # Language state
│   ├── mongodb.ts                   # Database connection
│   └── translations.ts              # Bilingual content
├── scripts/
│   └── seed.ts                      # Database seeding script
├── .env.local                       # Environment variables (not in git)
├── .env.example                     # Environment template
└── package.json
```

## Development Workflow

1. **Make changes** to code
2. **Test locally** with `npm run dev`
3. **Check database** using MongoDB Compass or CLI
4. **Re-seed if needed** with `npm run seed`

## Common Tasks

### Reset Database
```bash
npm run seed
```

### Create New Admin
```bash
# Using curl or Postman
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "newadmin@konnect.af",
  "password": "secure_password_123",
  "name": "New Admin"
}
```

### View MongoDB Data
```bash
# Using MongoDB shell
mongosh
use konnect-af
db.professionals.find()
db.requests.find()
db.admins.find()
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `net start MongoDB` (Windows) or `sudo systemctl start mongod` (Linux)
- Check `MONGODB_URI` in `.env.local`
- For MongoDB Atlas, ensure IP whitelist is configured

### JWT Token Invalid
- Clear localStorage in browser devtools
- Re-login at `/admin/login`

### Cannot Access Admin Dashboard
- Ensure you're logged in
- Check browser console for errors
- Verify token in localStorage

### API Endpoints Returning 500
- Check server console for error logs
- Verify MongoDB connection
- Ensure environment variables are set

## Next Steps (Production)

1. **Security**:
   - Change JWT_SECRET
   - Change admin password
   - Add rate limiting
   - Enable CORS restrictions
   
2. **Database**:
   - Use MongoDB Atlas for production
   - Set up automated backups
   - Add indexes for performance
   
3. **Deployment**:
   - Deploy to Vercel, Railway, or AWS
   - Set environment variables in hosting platform
   - Configure custom domain
   
4. **Features**:
   - Email notifications
   - Payment integration (Stripe, PayPal)
   - File upload for portfolios
   - Real-time chat between clients and professionals
   - Review/rating system

## Support
For issues or questions, contact the development team or check the codebase documentation.

---

**Built with ❤️ by Darboedev**
