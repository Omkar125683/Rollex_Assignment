const User = require('../models/User');
const Store = require('../models/Store');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { roleEnum } = require('../utils/RoleEnum');

// Sign up a user
exports.signup = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword, address, role });
        await newUser.save();
        if(role===roleEnum[2]){
            const store = new Store({ name, email, address });
            await store.save();
        }

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        console.log(password)
        console.log(user.password)
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)

        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.setHeader('authorization', token);
        res.status(200).json({ token, role: user.role, email: user.email, id:user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

