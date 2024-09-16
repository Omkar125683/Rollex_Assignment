const Store = require('../models/Store');

exports.getStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStoreByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const store = await Store.findOne({ email: email });
    
        if (!store) {
          console.log('Store not found');
          return null;
        }
        res.status(200).json(store);
        
        console.log('Store found:', store);
        return store;
      } catch (error) {
        console.error('Error finding store by email:', error);
        throw error;
      }
};


exports.getStoreById = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStore = async (req, res) => {
    const { name, email, address, id } = req.body;

    try {
        const store = await Store.findById(id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        store.name = name || store.name;
        store.email = email || store.email;
        store.address = address || store.address;

        const updatedStore = await store.save();
        res.status(200).json(updatedStore);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.rateStore = async (req, res) => {
    try {
        console.log("Im Here Bady");
        
        const store = await Store.findById(req.params.storeId);
        const { rating } = req.body;

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        store.ratings.push({ user: req.user._id, rating });
        store.calculateAverageRating();
        await store.save();

        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

