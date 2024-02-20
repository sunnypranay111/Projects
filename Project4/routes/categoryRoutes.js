const categoryRoute = require ('express').Router();
const { createCategory, getAllCategory, getCategoryById, deleteCategoryById, updateCategoryById } = require('../controllers/categoryControllers');


categoryRoute.post('/create', createCategory);
categoryRoute.get('/', getAllCategory);
categoryRoute.get('/:id', getCategoryById);
categoryRoute.put('/update/:id', updateCategoryById);
categoryRoute.delete('/delete/:id', deleteCategoryById);


module.exports = categoryRoute;