const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true , ref: 'User'},
    address: { type: String, required: true, maxlength: 400 },
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 }
    }],
    averageRating: { type: Number, default: 0 }
});

storeSchema.methods.calculateAverageRating = function() {
    const ratingsSum = this.ratings.reduce((sum, r) => sum + r.rating, 0);
    this.averageRating = ratingsSum / this.ratings.length;
    return this.averageRating;
};

module.exports = mongoose.model('Store', storeSchema);

