const router = require('express').Router();
const Product = require('../model/poductSchema')
const { verifyToken, VerifyTokenAndAuth, VerifyTokenAndAdmin } = require('./verifyToken');

// CREATE
router.post('/', VerifyTokenAndAdmin, async(req, res)=>{
    // const newProduct = new Product(req.body);
    try {
        // const saveProduct = await newProduct.save();
        const addProduct = await Product.insertMany(req.body);
        console.log(addProduct);
        res.status(201).json(addProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});


// // Update Product
router.put('/:id', VerifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            }, 
            { 
                new: true 
            }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})

// // Delete Product
router.delete('/:id', VerifyTokenAndAdmin, async(req, res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({msg : "Product has been deleted...!!!"});
    } catch (error) {
        res.status(500).json(error)
    }
});

// // Get Product
router.get('/find/:id', async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error)
    }
});

// Get All Users
router.get('/', async(req, res)=>{
    const qNew = req.query.new;
    const qCategories = req.query.categories;
    try {
        let products;
        if (qNew) {
            products  = await Product.find().sort({createdAt: -1}).limit(1);
        } else if(qCategories){
            products = await Product.find({
                categories: {
                    $in:[qCategories]
                }
            })
        }else {
            products  = await Product.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router;