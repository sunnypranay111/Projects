const productRoute = require('express').Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productsControllers');


productRoute.post('/create', createProduct);
productRoute.get('/', getAllProducts);
productRoute.get('/:id', getProductById);
productRoute.put('/update/:id', updateProduct);
productRoute.delete('/delete/:id', deleteProduct);

module.exports = productRoute;