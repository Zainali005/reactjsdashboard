const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const BankAccount = require('./models/BankAccount');
const SECRET_KEY = 'allahisone786';
const app = express();
const PORT = 3001;

const uri = "mongodb+srv://zainali5002:allahisone786@cluster0.qlu6prv.mongodb.net/dashreact?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB Atlas!');
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/accounts', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const accounts = await BankAccount.find({ userId });
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching bank accounts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/accounts', authenticateToken, async (req, res) => {
  try {
    const { bankName, accountNumber, accountType } = req.body;
    const userId = req.user.userId;
    const newAccount = new BankAccount({
      userId,
      bankName,
      accountNumber,
      accountType,
    });

    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error adding bank account:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/accounts/:accountId', authenticateToken, async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const userId = req.user.userId;

    const account = await BankAccount.findOne({ _id: accountId, userId });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json(account);
  } catch (error) {
    console.error('Error fetching account details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
