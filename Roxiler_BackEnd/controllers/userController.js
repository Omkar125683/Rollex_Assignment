const User = require('../models/User');
const bcrypt = require('bcrypt');
const { roleEnum } = require('../utils/RoleEnum');


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        
        const user = await User.findById(req.query.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserDetails = async (req, res) => {
    try {
        const { name, email, address, oldpass } = req.body;

        const user = await User.findById(req.query.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(oldpass, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        if(user.role==roleEnum[2]){
            let data = {name, email, address, id: req.query.id}
            updateStore(data, res);
        }
        
        user.name = name || user.name;
        user.email = email || user.email;
        user.address = address || user.address;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { oldpass, password } = req.body;

        const user = await User.findById(req.query.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(oldpass, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        
        if(password && password!=''){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

