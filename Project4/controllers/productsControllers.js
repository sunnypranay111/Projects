const Category = require('../models/categoryModel');
const Products = require('../models/productsModel');
const mongoose = require('mongoose');

 const createProduct = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if(!category) return res.status(400).json(`Invalid Category`);
        const newProduct = new Products({
            name : req.body.name,
            description : req.body.description,
            richDescription : req.body.richDescription,
            image : req.body.image,
            brand : req.body.brand,
            price : req.body.price,
            category : req.body.category,
            countInStock : req.body.countInStock,
            rating : req.body.rating,
            numReviews : req.body.numReviews,
            isFutured : req.body.isFutured
        });
        await newProduct.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(400).json({errMassage : `Unable to the Product`, Error : error});
    };
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find().select('name price');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error });
    };
};

const getProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id).populate('category');
        return res.status(200).json(product);
    } catch (error) {
        return res.status(404).json({errMassage : `${req.params.id} not found product`});
    };
};


const updateProduct = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) 
        return res.status(400).json(`Invalid Product ID`)
        const category = await Category.findById(req.body.category);
        if(!category) {
            return res.status(400).json(`Invalid Category`);
        }
        const product = await Products.findByIdAndUpdate(
            req.params.id,
            {
                name : req.body.name,
                description : req.body.description,
                richDescription : req.body.richDescription,
                image : req.body.image,
                brand : req.body.brand,
                price : req.body.price,
                category : req.body.category,
                countInStock : req.body.countInStock,
                rating : req.body.rating,
                numReviews : req.body.numReviews,
                isFutured : req.body.isFutured  
            },
            {
                new : true
            }
        );
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({errMassage: `Unable to update the product`, ErrorMesssage : error});
    };
};

const deleteProduct = async (req, res) => {
    try{
        const deleted = await Products.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json(`${req.params.id} product id not found`);
        return res.status(200).json({message : `${req.params.id} product ID has been deleted`,
    data : deleted});
    }catch(error){
        return res.status(400).json({errMassage : `${req.params.id} product id unable to delete`, error})
    }
};


module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct}