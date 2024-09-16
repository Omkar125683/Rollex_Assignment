const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 60, minlength: 20 },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    address: { type: String, required: true, maxlength: 400 },
    role: { type: String, enum: ['Admin', 'User', 'StoreOwner'],default:'User' },
    ratings: [{
        store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
        rating: { type: Number, min: 1, max: 5 }
    }]
});

userSchema.pre('save', async function(next) {
    next();
});


module.exports = mongoose.model('User', userSchema);
