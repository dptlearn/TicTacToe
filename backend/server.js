const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to mongoDB
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err));

// Sign-up route
app.post('/api/sign-up', async(req, res) => {
	const { username, password } = req.body;
	
	try{
		// Check if user already exists
		const existingUser = await User.findOne({ username });
		if(existingUser)
		{
			return res.status(400).json({ message: 'User already exists' });
		}
		
		// Create new user
		const newUser = new User({ username, password: hashedPassword });
		await newUser.save();
		
		res.status(201).json({ message: 'User created successfully' });
	}catch(error){
		res.status(500).json({ message: 'Error creating user', error });
	}
});

// Sign-in route
app.post('/api/sign-in', async(req, res) => {
	const { username, password } = req.body;
	
	try{
		const user = await User.findOne({ username });
		
		if(!user)
		{
			return res.status(404).json({ message: 'User not found' });
		}
		
		// Comapre the password 
		const isMatch = await user.comparePassword(password);
		if(!isMatch)
		{
			return res.status(400).json({ message: 'Invalid password' });
		}
		
		// Create and return a JWT token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
		res.status(200).json({ message: 'Sign-in successful!', token });
	}catch(error){
		res.status(500).json({ message: 'Sign-in error', error });
	}
});

// Reset password route
app.post('/api/reset-password', async(req, res) => {
	const { username, newPassword } = req.body;
	
	try{
		const user = await User.findOne({ username });
		
		if(!user)
		{
			return res.status(404).json({ message: 'User not found' });
		}
		
		user.password = newPassword;
		await user.save();
		
		res.status(200).json({ message: 'Password reset successfully' });
	}catch(error){
		res.status(500).json({ message: 'Error resetting password', error });
	}
	
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});