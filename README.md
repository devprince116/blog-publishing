# Blog Publishing Platform

## 🚀 Project Overview
A **blog publishing site** where creators can write blogs, and an admin approves them before they are published. The platform supports **SEO-friendly metadata**, versioning for blog edits, and interactive features like **likes and comments** for guest users.

## 🛠 Tech Stack
- **Frontend:** [Next.js](https://nextjs.org/) (React framework)
- **Backend:** [Strapi.js](https://strapi.io/) (Headless CMS)
- **Database:** SQlite (or any supported database by Strapi)
- **Styling:** Material UI (MUI)
- **Notifications:** React Hot Toast

## ✨ Features
### 🔹 Blog Management
- **Creators** can write blogs and submit them for admin approval.
- **Admins** review and approve blogs before they are published.
- **Versioning:** When a blog is edited, a new version is created instead of modifying the existing one.

### 🔹 User Interaction
- **Guest users (without login)** can:
  - Like blogs
  - Comment on blogs (pending admin approval)
- **Admin Approval for Comments:** Only approved comments are displayed on blogs.

### 🔹 SEO Optimization
- **SEO-friendly metadata** for better search engine visibility.
- **Optimized performance** using Next.js features like SSR & SSG.

### 🔹 UI & UX Enhancements
- Modern and responsive UI using **Material UI**.
- Clean blog layout with images, authorship, category tags.
- Interactive like & comment buttons with real-time UI updates.

## 🔧 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/blog-app.git
cd blog-app
```

### **2️⃣ Install Dependencies**
```sh
yarn install  # or npm install
```

### **3️⃣ Set Up Environment Variables**
Create a **.env.local** file in the Next.js project and add:
```sh
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337  # Update if hosted
```

### **4️⃣ Start the Development Server**
#### **Run Strapi Backend**
```sh
cd backend  # Navigate to Strapi project
npm run develop
```

#### **Run Next.js Frontend**
```sh
yarn dev  # or npm run dev
```

Now visit **http://localhost:3000** to see the app in action!

## 📌 API Endpoints
| Method | Endpoint          | Description               |
|--------|------------------|---------------------------|
| GET    | `/blogs`         | Fetch all approved blogs  |
| POST   | `/blogs`         | Create a new blog (admin approval required) |
| PATCH  | `/blogs/:id`     | Edit an existing blog (creates a new version) |
| GET    | `/comments`      | Fetch all approved comments |
| POST   | `/comments`      | Add a comment (admin approval required) |

## 🔥 Future Enhancements
- **User Authentication**: Enable login/signup for registered users.
- **Categories & Tags**: Allow filtering blogs by category and tags.
- **Real-time Notifications**: Notify users when their comment is approved.

---
📢 **Contributions & Feedback:** Feel free to contribute or report issues in the repository!

