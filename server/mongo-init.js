db = db.getSiblingDB('blog');

db.createUser({
  user: 'blog_user',
  pwd: 'blog_password',
  roles: [{ role: 'readWrite', db: 'blog' }]
});

// Initial collections
db.createCollection('users');
db.createCollection('posts');

// Sample data
db.users.insertMany([
  {
    username: 'admin',
    email: 'admin@example.com',
    password: '$2a$10$X8z5...hashed_password...', // Hash of 'password123'
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

db.posts.insertMany([
  {
    title: 'Welcome to our Blog',
    content: 'This is the first post on our amazing blog platform!',
    author: ObjectId("..."), // Replace with actual user ID
    comments: [],
    views: 0,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
