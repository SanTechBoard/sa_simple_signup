const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB connection setup
const mongoURI = 'mongodb://localhost:27017/myapp'; // Replace with your MongoDB URI
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the application if unable to connect to MongoDB
  });

// Define Mongoose Schema and Model (Example)
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  gender: String,
});

const user = mongoose.model('user', userSchema);

// Example API endpoints
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint to save a user to MongoDB
app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender } = req.body;

    const newUser = new user({
      firstName,
      lastName,
      email,
      password,
      gender,
    });

    // Save the new user to MongoDB
    const savedUser = await newUser.save();
    console.log('User saved:', savedUser); // Log the saved user object

    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Error saving user');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
