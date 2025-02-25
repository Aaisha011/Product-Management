const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const JWT_SECRET = "jwt-secret"; 
const User = require("../models/user");


exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role: role || 'user' });

    res.status(201).json({ message: 'User registered', user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error('User not found');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid password');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id,email: user.email, role: user.role}, JWT_SECRET, { expiresIn: '1h' });
    const role =  user.role 
    // console.log('Token generated:', token, role);

    res.status(200).json({ message: 'Login successful', token, role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
};
