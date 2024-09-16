const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const logger = require('../utils/logger');
const {roleEnum} = require('../utils/RoleEnum');

const connectDB = async () => {
    try {
        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
        
        // Seed the first admin user if not present
        await seedAdminUser();

    } catch (error) {
        logger.error(`Database connection error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

// Seeding first admin user
const seedAdminUser = async () => {
    try {
        // Check if an admin user exists
        logger.info(roleEnum[0]);

        const adminExists = await User.findOne({ role: roleEnum[0] });

        if (!adminExists) {
            logger.info('No Admin found, creating initial admin...');

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

            const adminUser = new User({
                name: 'Admin Rolixer From Section A',
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword,
                role: roleEnum[0],
                address: 'Admin Office Address',
            });

            await adminUser.save();
            logger.info('Admin user created successfully');
        } else {
            logger.info('Admin user already exists, no need to create one.');
        }
    } catch (error) {
        logger.error(`Error seeding admin user: ${error.message}`);
    }
};

module.exports = connectDB;
