const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
	if(!this.isModified('password')) return next();
	
	this.password = await bycrpt.hash(this.password, 10);
	next();
});

// Method to compare password
userSchema.methods.comparePassword = function (password) {
	return bycrpt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;