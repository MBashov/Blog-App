# 📝 Blog App

A **feature-rich, user-friendly full-stack** blog application built with **Angular** for the frontend and **Node.js/Express** for the backend. It allows users to create, edit, and browse blog posts with a clean and intuitive interface.

## ✨ Features
- 🖋 **Create & Edit Posts** – Easy-to-use forms for writing and updating blog content  
- 🖼 **Image Upload** – Add images to your posts with a live preview before publishing  
- 👍👎 **Like & Unlike Posts** – Interact with posts by liking or unliking them  
- 💬 **Comment on Posts** – Add comments to posts  
- ✏️ **Update & Delete Comments** – Manage your comments easily  
- 👤 **Profile Page** – View your profile and your posts, comments or likes  
- 🛠 **Update Profile Data** – Edit your username, email, and other info  
- 🔑 **Change Password** – Securely update your password  
- 🗑 **Delete Account** – Permanently remove your account  
- 🎨 **Material UI** – Styled with Angular Material for a sleek, modern look  
- 📂 **Post List & Detail Views** – Browse and read blog posts in a clear layout  
- 🔍 **Search Functionality** – Quickly find posts by keywords  
- 🔢 **Pagination** – Browse posts page by page  
- 🛡 **Public & Private Parts** – Some pages require authentication, others are public  
- 🌀 **Custom Pipes** – Transform and format data easily in templates  
- ⚡ **Angular Interceptors & Guards** – Handle API requests, authentication, and route protection  


## 🛠 Tech Stack
- [Angular](https://angular.io/) – Framework for building the app  
- [Angular Material](https://material.angular.io/) – UI components  
- [RxJS](https://rxjs.dev/) – Reactive programming  
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript  
- [SCSS/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) – Styling  
- [Node.js](https://nodejs.org/) – Backend runtime environment  
- [Express](https://expressjs.com/) – Web framework for building the API  
- [MongoDB](https://www.mongodb.com/) – Database  

## 🚀 Getting Started

## FrontEnd  
**1️⃣ Clone the repository**  
```bash
git clone https://github.com/MBashov/Blog-App.git
cd blog-app

```
**2️⃣ Install dependencies**  
```bash
npm install

```
**3️⃣ Run the app**  
```bash
ng serve

```
## Backend  
**1️⃣ Clone the the backend repository**  
```bash
git clone https://github.com/MBashov/Blog_Api.git
cd Blog_Api
**3️⃣ Run the development server**  
```bash
npm run dev
```

The app will be available at **http://localhost:4200/**  
The server will run at **http://localhost:3000/**    

## ⚙️ Environment Variables

Create a `.env` file in your backend folder and add the following variables:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=<your-mongodb-uri>
LOG_LEVEL=info
JWT_ACCESS_SECRET=<your-access-token-secret>
JWT_REFRESH_SECRET=<your-refresh-token-secret>
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_EXPIRY=1w
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

## 📂 Project Structure
```
Blog-App/
├── angular
├── public
├── package.json
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── core/                  # API services / Interceptors / Guards / Auth logic
│   │   ├── features/              # Feature modules (Post List, Post Detail, Create Post, Comments, Profile)
│   │   ├── layout/                # Page-level views (Home, Header, Footer)
│   │   ├── models/                # TypeScript interfaces and models
│   │   └── shared/                # Reusable UI components / Pipes / Utility services
│   ├── environments/              # Environment configuration files
│   ├── main.ts
│   ├── styles.css
│   └── index.html
└── README.md

```

## 📸 Screenshots / Demo
### Home Page
![Home](public/home.png) 


## 🤝 Contributing
1. Fork the project  
2. Create a feature branch (`git checkout -b feature/new-feature`)  
3. Commit your changes (`git commit -m "Add some feature"`)  
4. Push to the branch (`git push origin feature/new-feature`)  
5. Open a Pull Request  