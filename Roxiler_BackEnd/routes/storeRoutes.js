const express = require('express');
const router = express.Router();
const { getStores, getStoreById ,getStoreByEmail, updateStore, rateStore } = require('../controllers/storeController');
const { protect, admin } = require('../middleware/authMiddleware'); 

// Route to get all stores and add a new store
router.route('/')
  .get(getStores)
router.route('/byemail').get(getStoreByEmail)
// Route to get, update, or delete a store by ID
router.route('/:id')
  .get(protect,getStoreById)
  .put(protect,admin, updateStore)

router.route('/:storeId/rate')
  .post(protect, rateStore);

module.exports = router;
