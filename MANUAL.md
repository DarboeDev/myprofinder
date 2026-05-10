# MyProFinder — User Guide 📖

**Live Platform:** [https://myprofinder-sn.vercel.app/](https://myprofinder-sn.vercel.app/)

---

## Table of Contents

1. [What is MyProFinder?](#what-is-myprofinder)
2. [How the Platform Works](#how-the-platform-works)
3. [For Clients — Finding & Hiring a Professional](#for-clients--finding--hiring-a-professional)
4. [For Administrators — Managing the Platform](#for-administrators--managing-the-platform)
5. [Language Support](#language-support)
6. [Frequently Asked Questions](#frequently-asked-questions)
7. [Support](#support)

---

## What is MyProFinder?

**MyProFinder** is an online marketplace that connects clients across Africa with verified digital professionals in Senegal and The Gambia.

Whether you need a web developer, graphic designer, content writer, or social media manager, MyProFinder makes it easy to:

- **Browse** a curated list of verified professionals
- **View** detailed profiles with bios, skills, portfolio, and ratings
- **Submit a request** and get matched with the right professional for your project
- **Communicate** and track your project from start to finish

The platform is fully bilingual — available in both **English** and **French**.

---

## How the Platform Works

MyProFinder follows a simple three-step process:

### Step 1 — Submit Your Request

Fill out the request form at [Find a Professional](https://myprofinder-sn.vercel.app/find-professional) with details about your project: what you need, your budget, and your timeline.

### Step 2 — Get Matched

Our team reviews your request and assigns the best-suited professional from our verified network within 24 hours.

### Step 3 — Work Together

You are connected directly with your professional to discuss the project, track progress, and approve the final work.

---

## For Clients — Finding & Hiring a Professional

### Accessing the Platform

Visit the live site: **[https://myprofinder-sn.vercel.app/](https://myprofinder-sn.vercel.app/)**

No account or registration is needed to browse or submit a request.

---

### Page 1 — Homepage

**URL:** [https://myprofinder-sn.vercel.app/](https://myprofinder-sn.vercel.app/)

The homepage gives you a full overview of the platform:

- **Hero Banner** — Highlights the platform's purpose and links to key actions
- **Popular Categories** — Quick links to professionals by type (Web, Design, Writing, etc.)
- **Featured Professionals** — A preview of top-rated professionals on the platform
- **How It Works** — A simple step-by-step explanation of the process

From here you can navigate to browse professionals or submit a request directly.

---

### Page 2 — Browse Professionals

**URL:** [https://myprofinder-sn.vercel.app/professionals](https://myprofinder-sn.vercel.app/professionals)

This page shows all verified professionals available on the platform.

**What you see for each professional:**

- Profile photo, name, and professional title
- Location (e.g., Dakar, Senegal)
- Star rating and number of reviews
- Hourly rate
- Top skills (tags)
- A "View Profile" button

**How to search:**

- Use the search bar to find professionals by name or skill
- Filter by category (Web Development, Design, Writing, etc.)
- Results update in real time as you type

---

### Page 3 — Professional Profile

**URL:** `https://myprofinder-sn.vercel.app/professionals/[profile-id]`

Clicking on any professional card opens their full profile page.

**What is included:**
| Section | Details |
|---|---|
| **About** | Biography in your selected language (EN or FR) |
| **Languages** | Languages the professional speaks |
| **Skills** | List of technical and professional skills |
| **Hourly Rate** | Rate displayed in USD |
| **Rating** | Average star rating from past clients |
| **Portfolio** | Samples of past work with images and descriptions |
| **Reviews** | Feedback from previous clients with dates and star ratings |
| **Request to Hire** | Button to go directly to the request form |

---

### Page 4 — Submit a Request (Find a Professional)

**URL:** [https://myprofinder-sn.vercel.app/find-professional](https://myprofinder-sn.vercel.app/find-professional)

This is where you submit your project request. Fill in the form with the following information:

| Field                    | What to Enter                                     |
| ------------------------ | ------------------------------------------------- |
| **Your Name**            | Your full name                                    |
| **Email Address**        | Your email for follow-up                          |
| **Phone Number**         | Your WhatsApp number or phone                     |
| **Type of Professional** | e.g., "Web Developer", "Graphic Designer"         |
| **Project Title**        | A short title for your project                    |
| **Project Description**  | Detailed description of what you need             |
| **Budget**               | Your available budget (e.g., "$500", "5,000 CFA") |
| **Timeline**             | When you need the work completed                  |

After submitting:

- You will see a **"Request Received"** confirmation message
- Our team will contact you within **24 hours**
- A professional will be matched to your project

> **Note:** All fields marked with \* are required.

---

## For Administrators — Managing the Platform

The Admin Dashboard is the control center for managing all professionals and client requests on MyProFinder.

### Accessing the Admin Dashboard

1. Go to: **[https://myprofinder-sn.vercel.app/admin/login](https://myprofinder-sn.vercel.app/admin/login)**
2. Enter your admin credentials (email and password)
3. Click **"Sign In"**

Once logged in, you land on the Admin Dashboard with two main tabs: **Client Requests** and **Professionals**.

---

### Tab 1 — Client Requests

This tab shows all project requests submitted by clients through the platform.

#### Viewing All Requests

The requests table displays:

| Column                | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| **Client**            | Name, email, and phone number                               |
| **Professional Type** | The type of professional the client needs                   |
| **Budget**            | Client's stated budget                                      |
| **Status**            | Current status (Pending, In Progress, Completed, Cancelled) |
| **Assigned To**       | Which professional has been assigned (if any)               |
| **Actions**           | View details or delete the request                          |

**Status badge colors:**

- 🟡 **Yellow** — Pending (new request, not yet actioned)
- 🔵 **Blue** — In Progress (work has started)
- 🟢 **Green** — Completed (work finished and approved)
- 🔴 **Red** — Cancelled

---

#### Viewing Request Details

Click **"View"** on any request to open the details modal. Inside you will see:

- Full client information (name, email, phone)
- Project category, title, and full description
- Budget and timeline
- Current status
- Assigned professional (if any)

From the details modal you can:

1. **Assign a Professional** — Opens a list of all professionals so you can select and assign the right one to this project
2. **Update the Status** — Change the status to Pending, In Progress, Completed, or Cancelled as the project progresses
3. **Delete the Request** — Permanently remove the request from the system

---

#### Assigning a Professional

1. Open the request details modal
2. Click **"Assign / Change Professional"**
3. A list of all active professionals appears with their names, titles, and locations
4. Click **"Assign"** next to the professional you want
5. The request is updated immediately and the assigned professional's name appears in the table

---

#### Deleting a Request

Requests can be deleted in two ways:

- Click **"Delete"** in the actions column of the table
- Click **"Delete Request"** at the bottom of the request details modal

Both methods will ask for confirmation before permanently removing the request.

> ⚠️ Deletion is permanent and cannot be undone.

---

### Tab 2 — Professionals

This tab is where you manage the full list of professionals on the platform. All create, edit, and delete actions happen here.

#### Viewing All Professionals

The table shows:

| Column          | Description                                      |
| --------------- | ------------------------------------------------ |
| **Name**        | Profile photo and full name                      |
| **Title**       | Professional title (e.g., "UI/UX Designer")      |
| **Location**    | City and country                                 |
| **Hourly Rate** | Rate in USD                                      |
| **Status**      | Active (visible to clients) or Inactive (hidden) |
| **Actions**     | Edit or Delete buttons                           |

---

#### Adding a New Professional

1. Click **"Add Professional"** (top right of the Professionals tab)
2. Fill in the form:

   **Basic Info:**
   - Name (required)
   - Title — e.g., "Full Stack Developer" (optional)
   - Location — e.g., "Banjul, Gambia" (required)
   - Hourly Rate — number only, e.g., `25` for $25/hr (required)

   **Bios:**
   - Biography in English (required) — Shown to English-speaking visitors
   - Biography in French (required) — Shown to French-speaking visitors

   **Skills & Languages:**
   - Skills — comma-separated, e.g., `React, Node.js, Figma`
   - Languages spoken — comma-separated, e.g., `English, French, Wolof`

   **Other:**
   - Categories — comma-separated, e.g., `Web Development, Mobile`
   - Avatar URL — link to a profile photo (leave blank for default)
   - Active Status — toggle ON to make visible on the public site

3. Click **"Create"** — the professional is saved and appears in the table immediately

---

#### Editing a Professional

1. Click **"Edit"** next to the professional in the table
2. The form opens with all current information pre-filled
3. Change any fields you need to update
4. Click **"Update"** to save

Changes take effect immediately and the table refreshes automatically.

---

#### Deleting a Professional

1. Click **"Delete"** next to the professional in the table
2. A confirmation dialog appears
3. Confirm to permanently remove the professional from the platform

> ⚠️ Deletion is permanent. The professional will be removed from all public pages immediately.

---

#### Managing Visibility (Active / Inactive)

Each professional has an **Active Status** toggle:

- **Active (ON)** — The professional appears on the public Browse Professionals page and in search results
- **Inactive (OFF)** — The professional is hidden from clients but remains in the admin panel

Use this to temporarily hide professionals without deleting their profile.

---

## Language Support

MyProFinder is fully bilingual. Visitors can switch between **English** and **French** at any time using the language toggle in the navigation bar (top right: **EN / FR**).

When French is selected:

- All navigation labels, buttons, and headings switch to French
- Professional biographies display in French (if a French bio has been added)
- Form labels and placeholders update to French
- The selected language is remembered across pages

When a professional profile is added via the admin panel, both an English and a French biography are required to ensure all visitors have a full experience in their preferred language.

---

## Frequently Asked Questions

**Q: Do I need an account to browse professionals?**
No. The entire public site — homepage, professionals list, and individual profiles — is freely accessible without any registration.

**Q: How do I get a response after submitting a request?**
After you submit your request at [Find a Professional](https://myprofinder-sn.vercel.app/find-professional), our team will contact you via the email or phone number you provided within 24 hours.

**Q: Can I choose my own professional?**
You can browse the professionals and view their profiles to find someone suitable. When you submit your request, you can mention a preferred professional in the project description, and the admin team will take that into account during assignment.

**Q: Is the platform available on mobile?**
Yes. The site is fully responsive and works on smartphones, tablets, and desktop computers.

**Q: What languages is the platform available in?**
English and French. Use the EN/FR toggle in the top navigation bar to switch.

**Q: How do I contact a professional directly?**
After your request is reviewed and a professional is assigned, our team will facilitate the introduction and provide you with contact details.

**Q: Is there a fee to submit a request?**
Submitting a request is free. Fees are agreed directly between you and the professional for the project work.

**Q: How are professionals verified?**
All professionals listed on MyProFinder are reviewed and approved by the admin team before their profiles go live on the platform.

---

## Support

If you have questions or need help:

- **Email / Contact:** Reach out through the platform's contact page
- **Live Site:** [https://myprofinder-sn.vercel.app/](https://myprofinder-sn.vercel.app/)
- **Developer:** [Darboe Dev](https://darboe-dev-portfolio.vercel.app/)

---

**Last Updated:** May 10, 2026
**Version:** 1.0
**Platform:** [https://myprofinder-sn.vercel.app/](https://myprofinder-sn.vercel.app/)
