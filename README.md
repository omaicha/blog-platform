**Simple Blog Platform Summary**  

This is a **MERN stack** (MongoDB, Express, React, Node.js) blogging app where users can:  

### **Core Features**  
✅ **User Accounts** – Sign up, log in, and log out  
✅ **Create & Manage Posts** – Write, edit, and delete blog posts  
✅ **View Posts** – Browse all posts or click to read details  
✅ **Protected Routes** – Only logged-in users can create posts or access the dashboard  

### **How It Works**  
1. **Frontend (React)**  
   - Pages: Home, Login, Register, Create Post, Post Details, Dashboard  
   - Uses **Redux** for state management (user auth, posts)  
   - **Protected routes** block unauthorized access  

2. **Backend (Node.js + Express)**  
   - REST API handles:  
     - User authentication (register/login)  
     - CRUD operations for blog posts  
   - Connects to **MongoDB** to store users and posts  

3. **Database (MongoDB)**  
   - Stores:  
     - Users (email, password, role)  
     - Posts (title, content, author, date)  

### **Tech Stack**  
- **Frontend**: React, Redux, React Router, Bootstrap  
- **Backend**: Node.js, Express, JWT (for auth)  
- **Database**: MongoDB  

### **Simple Flow**  
1. User signs up/logs in  
2. Logged-in users can create posts  
3. All users can view posts  
4. Posts are saved in the database  

**Easy to run** with Docker or locally! 🚀  

<https://github.com/omaicha/blog-platform/blob/main/screenshuts/Screenshot%20from%202025-05-21%2012-38-29.png>
