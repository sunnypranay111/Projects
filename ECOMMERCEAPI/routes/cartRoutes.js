const router = require('express').Router();
const Cart = require('../model/cartSchema')
const { verifyToken, VerifyTokenAndAuth, VerifyTokenAndAdmin } = require('./verifyToken');

// CREATE
router.post('/', verifyToken, async(req, res)=>{
    try {
        const addCart = await Cart.insertMany(req.body);
        res.status(201).json(addCart);
    } catch (err) {
        res.status(500).json(err);
    }
});


// // Update Product
router.put('/:id', VerifyTokenAndAuth, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            }, 
            { 
                new: true 
            }
        );
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
})

// // Delete Product
router.delete('/:id', VerifyTokenAndAuth, async(req, res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({msg : "Product has been deleted...!!!"});
    } catch (error) {
        res.status(500).json(error)
    }
});

// // Get Product
router.get('/find/:id', VerifyTokenAndAuth,async(req, res)=>{
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart);
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