// mongo-init.js
db.auth('root', 'Omani2025');

db = db.getSiblingDB('blog');

db.createUser({
  user: 'blog_user',
  pwd: 'blog_password123',
  roles: [
    { role: 'readWrite', db: 'blog' },
    { role: 'dbAdmin', db: 'blog' }
  ]
});

db.createCollection('posts');
db.posts.insertOne({
  title: 'Test Post',
  content: 'Hello MongoDB!',
  createdAt: new Date()
});

// Sample users
db.users.insertMany([
  {
    username: 'admin',
    email: 'admin@example.com',
    password: '$2a$10$X8z5...hashed...', // hash of 'admin123'
    role: 'admin',
    createdAt: new Date(),
    isActive: true
  },
  {
    username: 'user1',
    email: 'user1@example.com',
    password: '$2a$10$Y7w6...hashed...', // hash of 'user123'
    createdAt: new Date(),
    isActive: true
  }
]);

// Sample posts
db.posts.insertMany([
  {
    title: 'Getting Started with MERN',
    content: 'Full content here...', // 200+ words
    author: ObjectId("..."), // admin's ID
    tags: ['mern', 'tutorial'],
    viewCount: 15,
    isPublished: true,
    createdAt: new Date('2023-01-15')
  },
  {
    title: 'React Hooks Guide',
    content: 'Full content here...', // 200+ words
    author: ObjectId("..."), // user1's ID
    tags: ['react', 'frontend'],
    viewCount: 8,
    isPublished: true,
    createdAt: new Date('2023-02-20')
  }
]);

db.createUser({
  user: "blog_admin",
  pwd: "SecurePassword123!",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }
  ]
});

db = db.getSiblingDB('blog');
db.createUser({
  user: "blog_user",
  pwd: "AppPassword456!",
  roles: [
    { role: "readWrite", db: "blog" },
    { role: "dbAdmin", db: "blog" }
  ]
});
