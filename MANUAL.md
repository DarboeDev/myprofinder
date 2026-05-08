# MyProFinder - Complete User Manual 📖

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [User Interface Overview](#user-interface-overview)
4. [Admin Panel Guide](#admin-panel-guide)
5. [Features & Usage](#features--usage)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

---

## Introduction

**MyProFinder** is a professional marketplace platform designed to connect clients with verified digital professionals across Africa. This manual covers all features, functionalities, and how to use the admin panel effectively.

### Who Is This For?

- **Administrators** - Managing professionals, requests, and platform content
- **Clients** - Browsing and hiring professionals (future feature)
- **Developers** - Understanding the codebase and extending functionality

---

## Getting Started

### Initial Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Create a `.env` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_minimum_32_characters
   ```

3. **Seed the Database**
   ```bash
   npm run seed
   ```
   
   This command:
   - Clears existing data
   - Creates 6 sample professionals
   - Creates admin account
   - Displays admin credentials

4. **Start the Application**
   ```bash
   npm run dev
   ```
   
   Access at: http://localhost:3000

### Default Admin Credentials

```
Email: admin@myprofinder.af
Password: admin123
```

⚠️ **Important**: Change these credentials in production!

---

## User Interface Overview

### Public Pages

#### 1. Homepage (`/`)
- **Purpose**: Landing page showcasing the platform
- **Features**:
  - Hero section with call-to-action buttons
  - Featured professionals carousel
  - Platform features overview
  - Quick navigation to browse professionals

#### 2. Browse Professionals (`/professionals`)
- **Purpose**: View all active professionals
- **Features**:
  - Grid layout of professional cards
  - Shows: name, title, location, hourly rate, rating
  - Click any card to view full profile
  - Bilingual support (EN/FR toggle in navbar)

#### 3. Professional Profile (`/professionals/[id]`)
- **Purpose**: Detailed view of a single professional
- **Features**:
  - Full biography (English & French)
  - Skills and languages
  - Hourly rate and availability
  - Portfolio showcase
  - Client reviews and ratings
  - Contact information

#### 4. Find Professional (`/find-professional`)
- **Purpose**: Search and filter professionals
- **Features**:
  - Category filtering
  - Location search
  - Skill-based search
  - Real-time results

---

## Admin Panel Guide

### Accessing the Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. Enter credentials:
   - Email: `admin@myprofinder.af`
   - Password: `admin123`
3. Click "Sign In"

### Admin Dashboard Layout

The dashboard has two main tabs:

#### Tab 1: Requests Management
#### Tab 2: Professionals Management (CRUD)

---

### 🔧 Professionals Management (CRUD)

This is the main feature for managing all professionals on the platform.

#### A. View All Professionals

**Location**: Admin Dashboard > Professionals Tab

**What You See**:
- Table with columns: Name, Title, Location, Hourly Rate, Status, Actions
- Each professional shows:
  - Full name
  - Professional title (e.g., "Full Stack Developer")
  - Location (e.g., "Dakar, Senegal")
  - Hourly rate (e.g., "25,000 CFA")
  - Status: Active/Inactive badge
  - Action buttons: Edit, Delete

**Features**:
- Auto-refresh data with cache busting
- Color-coded status badges (green = active, gray = inactive)
- Responsive table design

---

#### B. Create New Professional

**How to Create**:

1. Click the **"Add Professional"** button (top-right of Professionals tab)
2. Fill in the modal form:

   **Basic Information**:
   - **Name** (required): Full name (e.g., "John Doe")
   - **Title** (optional): Professional title (e.g., "UI/UX Designer")
   - **Location** (required): City and country (e.g., "Banjul, Gambia")
   - **Hourly Rate** (required): Number only (e.g., 30000 for 30,000 CFA)

   **Bio Section**:
   - **Biography (English)** (required): Professional description in English
   - **Biography (French)** (required): Professional description in French

   **Skills & Languages**:
   - **Skills** (optional): Comma-separated (e.g., "React, Node.js, MongoDB")
   - **Languages** (optional): Comma-separated (e.g., "English, French, Wolof")

   **Additional**:
   - **Categories** (optional): Comma-separated (e.g., "Web Development, Mobile")
   - **Avatar URL** (optional): Full URL to profile image
   - **Active Status**: Toggle on/off (determines if visible to clients)

3. Click **"Create"** to save
4. Table refreshes automatically with new professional

**Validation**:
- Name, location, hourly rate, and both bios are required
- Hourly rate must be a valid number
- Form shows error if required fields are empty

---

#### C. Edit Professional

**How to Edit**:

1. Find the professional in the table
2. Click the **"Edit"** button (pencil icon)
3. Modal opens with all current data pre-filled
4. Modify any fields you want to change
5. Click **"Update"** to save changes

**What You Can Edit**:
- All fields that were available during creation
- Change active status to hide/show professional
- Update title, rates, bio, skills, languages, etc.

**Tips**:
- Title field is editable and persists to database
- Changes are immediate after clicking Update
- Table refreshes automatically

---

#### D. Delete Professional

**How to Delete**:

1. Find the professional in the table
2. Click the **"Delete"** button (trash icon)
3. Confirmation modal appears asking: "Are you sure you want to delete [Name]?"
4. Click **"Delete"** to confirm, or **"Cancel"** to abort
5. Professional is permanently removed from database
6. Table refreshes automatically

**Warning**: 
⚠️ Deletion is permanent and cannot be undone!

---

### 📋 Requests Management

**Location**: Admin Dashboard > Requests Tab

#### View All Requests

**What You See**:
- Table with columns: Client Name, Contact, Project Title, Budget, Status, Actions
- Each request shows:
  - Client name and email
  - Project title
  - Budget range (e.g., "5k-10k")
  - Status badge (Pending/In Progress/Completed)
  - "View Details" button

#### View Request Details

**How to View**:

1. Click **"View Details"** on any request
2. Modal opens showing:
   - **Client Information**:
     - Full name
     - Email address
     - Phone number
   - **Project Information**:
     - Project title
     - Detailed description
     - Budget range
     - Timeline
     - Required skills
   - **Current Status**
   - **Assigned Professional** (if any)

3. From this modal, you can:
   - **Assign Professional** - Click button to open assignment modal
   - **Close** - Return to requests table

#### Assign Professional to Request

**How to Assign**:

1. Open request details modal
2. Click **"Assign Professional"** button
3. Assignment modal opens showing:
   - List of all professionals
   - Each professional shows: name, title, hourly rate
   - Radio button to select

4. Select a professional by clicking their radio button
5. Click **"Assign"** to confirm
6. Modal closes
7. Request details update showing assigned professional

**Use Case**:
- Client submits a request for a mobile app developer
- Admin reviews request
- Admin assigns appropriate professional from the list
- Professional can be notified (future feature)

---

## Features & Usage

### Language Toggle

**Location**: Navigation bar (top-right)

**How to Use**:
1. Click the language button showing "EN" or "FR"
2. Interface immediately switches language
3. All text, labels, and content update
4. Professional bios show in selected language

**Supported Languages**:
- English (EN)
- French (FR)

---

### Modal System

All admin modals (Create, Edit, Delete, Details, Assign) have:

**Features**:
- Click outside modal to close
- Dark overlay background
- White modal with readable text
- Proper form validation
- Clear action buttons

**Common Actions**:
- **X button** (top-right) - Close modal
- **Cancel button** - Abort action
- **Confirm button** - Execute action (Create/Update/Delete/Assign)

---

### Data Refresh

**Automatic Refresh**:
- After creating a professional
- After editing a professional
- After deleting a professional
- After assigning a professional to request

**Manual Refresh**:
- Switch between tabs
- Reload the page
- Cache busting ensures fresh data

---

## Troubleshooting

### Common Issues

#### 1. "Cannot connect to database"

**Symptoms**: App won't start, connection errors

**Solutions**:
- Check MongoDB is running (if local)
- Verify `MONGODB_URI` in `.env` is correct
- For Atlas: Check IP whitelist and credentials
- Run: `npm run seed` to test connection

---

#### 2. "Title field not showing/saving"

**Symptoms**: Title appears as "-" or doesn't persist

**Solutions**:
- Run migration: `npm run add-titles`
- This adds title field to existing professionals
- Refresh browser after migration

---

#### 3. "Admin login fails"

**Symptoms**: Invalid credentials error

**Solutions**:
- Verify using correct email: `admin@myprofinder.af`
- Password is: `admin123`
- If still fails, reseed database: `npm run seed`
- Check console for JWT errors

---

#### 4. "Modal background is black, can't see text"

**Symptoms**: Forms are unreadable

**Status**: ✅ Fixed in latest version

**If Still Occurs**:
- Clear browser cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check [app/admin/page.tsx](app/admin/page.tsx) has proper styling

---

#### 5. "Changes not appearing after update"

**Symptoms**: Edit professional but changes don't show

**Solutions**:
- Switch to Requests tab, then back to Professionals
- Check browser console for errors
- Verify Network tab shows PUT request
- Check API response in Network tab
- Run: `npm run add-titles` if title-related

---

#### 6. "Professional not appearing in list"

**Symptoms**: Created professional doesn't show

**Solutions**:
- Check "Active Status" is toggled ON
- Admin view shows all professionals (active and inactive)
- Public pages only show active professionals
- Verify in database the professional exists

---

### Debug Mode

**Enable Detailed Logging**:

The admin panel has extensive console logging:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Watch for logs:
   - `=== FETCH PROFESSIONALS ===`
   - `=== CREATE PROFESSIONAL ===`
   - `=== UPDATE PROFESSIONAL ===`
   - `=== DELETE PROFESSIONAL ===`

4. Check Network tab for API calls
5. Look for error messages in red

---

## Best Practices

### For Administrators

#### Professional Management

1. **Always Fill Required Fields**:
   - Name, location, hourly rate
   - Both English and French bios
   - This ensures consistent user experience

2. **Use Clear Titles**:
   - Be specific: "Full Stack Developer" not just "Developer"
   - Match industry standards
   - Helps with searchability

3. **Keep Bios Updated**:
   - Regularly review professional bios
   - Update skills as professionals grow
   - Add new portfolio items

4. **Manage Active Status**:
   - Deactivate professionals who are unavailable
   - Activate only verified professionals
   - Public pages only show active professionals

5. **Regular Database Maintenance**:
   - Periodically review all professionals
   - Remove duplicates
   - Update outdated information

#### Request Management

1. **Review Requests Promptly**:
   - Check new requests daily
   - Respond to clients quickly
   - Keep request statuses updated

2. **Assign Appropriate Professionals**:
   - Match skills to project requirements
   - Consider budget and professional rates
   - Check professional availability

3. **Track Request Progress**:
   - Update status as work progresses
   - Document completed projects
   - Gather client feedback

---

### Security Best Practices

1. **Change Default Credentials**:
   ```bash
   # After first login, update admin password
   # (Feature to be implemented)
   ```

2. **Protect Environment Variables**:
   - Never commit `.env` file
   - Use strong JWT_SECRET (32+ characters)
   - Rotate secrets periodically

3. **Database Security**:
   - Use MongoDB Atlas with IP whitelist
   - Enable database authentication
   - Regular backups

4. **JWT Token Management**:
   - Tokens stored in localStorage
   - Logout clears tokens
   - Tokens expire after set time

---

## Advanced Features

### Database Scripts

#### Seed Database
```bash
npm run seed
```
- Clears all data
- Creates 6 sample professionals
- Creates admin account
- Shows credentials

**Use When**:
- Initial setup
- Testing with fresh data
- Resetting after errors

#### Add Titles Migration
```bash
npm run add-titles
```
- Adds title field to professionals without it
- Maps names to titles from dummy data
- Non-destructive (doesn't delete data)

**Use When**:
- Upgrading from older version
- Title field missing
- After database schema changes

---

### Customization

#### Adding New Professional Fields

1. Update Mongoose model: `lib/models/Professional.ts`
2. Update API endpoints: `app/api/professionals/route.ts` and `[id]/route.ts`
3. Update admin form: `app/admin/page.tsx`
4. Update professional profile: `app/professionals/[id]/page.tsx`
5. Run migration if needed

#### Changing Admin Credentials

1. Edit `scripts/seed.ts`
2. Change email and password
3. Run `npm run seed`
4. Update login page placeholder text

#### Adding New Languages

1. Edit `lib/translations.ts`
2. Add new language object (e.g., `ar: { ... }` for Arabic)
3. Update language toggle in navbar
4. Add language context support

---

## API Reference

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@myprofinder.af",
  "password": "admin123"
}

Response:
{
  "token": "jwt_token_here",
  "admin": {
    "id": "...",
    "email": "admin@myprofinder.af",
    "name": "Admin User"
  }
}
```

### Professionals

#### List All (Admin)
```http
GET /api/professionals?admin=true
Authorization: Bearer {jwt_token}

Response: Array of professionals
```

#### Get Single Professional
```http
GET /api/professionals/[id]

Response: Professional object
```

#### Create Professional
```http
POST /api/professionals
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "title": "Graphic Designer",
  "location": "Accra, Ghana",
  "hourlyRate": 20000,
  "bio": "Creative designer...",
  "bioFr": "Créatif designer...",
  "isActive": true
}
```

#### Update Professional
```http
PUT /api/professionals/[id]
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "title": "Senior Graphic Designer",
  "hourlyRate": 25000
}
```

#### Delete Professional
```http
DELETE /api/professionals/[id]
Authorization: Bearer {jwt_token}

Response: Success message
```

---

## Database Schema

### Professional Model

```typescript
{
  name: string (required)
  title: string (optional)
  bio: string (required)
  bioFr: string (required)
  skills: string[] (optional)
  languages: string[] (optional)
  location: string (required)
  hourlyRate: number (required)
  avatar: string (default: placeholder)
  rating: number (default: 0)
  totalReviews: number (default: 0)
  categories: string[]
  portfolio: Array<{
    title: string
    description: string
    image: string
    link: string
  }>
  reviews: Array<{
    clientName: string
    rating: number
    comment: string
    date: Date
  }>
  isActive: boolean (default: true)
  createdAt: Date
}
```

### Request Model

```typescript
{
  clientName: string (required)
  clientEmail: string (required)
  clientPhone: string (required)
  projectTitle: string (required)
  projectDescription: string (required)
  budget: string (required)
  timeline: string (required)
  skillsNeeded: string[]
  status: "pending" | "in-progress" | "completed"
  assignedProfessional: ObjectId (ref: Professional)
  createdAt: Date
}
```

### Admin Model

```typescript
{
  email: string (required, unique)
  password: string (required, hashed)
  name: string (required)
  createdAt: Date
}
```

---

## FAQ

**Q: Can clients create accounts?**
A: Not in current version. Future feature.

**Q: How do I add more admins?**
A: Currently single admin. Multi-admin requires code changes.

**Q: Can professionals edit their own profiles?**
A: Not yet. Only admins can edit. Professional portal is a future feature.

**Q: How are payments processed?**
A: Payment system not implemented yet. Currently information-only platform.

**Q: Is there a mobile app?**
A: No, but the web app is fully responsive and works on mobile browsers.

**Q: Can I export data?**
A: Not built-in. Use MongoDB tools to export collections.

**Q: How do I backup the database?**
A: Use `mongodump` command or MongoDB Atlas automated backups.

---

## Support

For technical issues or questions:

1. Check this manual
2. Review console logs
3. Check GitHub issues (if applicable)
4. Contact developer: [Darboe Dev](https://darboe-dev-portfolio.vercel.app/)

---

## Changelog

### Version 0.1.0 (Current)
- Initial release
- Professional CRUD operations
- Request management
- Professional assignment
- Bilingual support (EN/FR)
- JWT authentication
- Admin dashboard
- Public professional browsing

---

## Future Enhancements

Planned features for future versions:

- [ ] Professional self-service portal
- [ ] Client account system
- [ ] Real-time notifications
- [ ] Payment integration
- [ ] Advanced search and filtering
- [ ] Messaging system
- [ ] File upload for portfolios
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Multi-admin support
- [ ] Role-based permissions
- [ ] Activity logs

---

**Last Updated**: May 8, 2026  
**Version**: 0.1.0  
**Maintained by**: Darboe Dev