const { model } = require('mongoose');
const Category = require('../models/categoryModel');

const createCategory = async (req, res) => {
    try {
        const category = new Category({
            name : req.body.name,
            icon : req.body.icon,
            color : req.body.color
        });
        await category.save();
        res.status(201).json({success : true, data : category});
    } catch (error) {
        res.status(500).json({success : false, errorMessage : "Unable to create the ccategoty", Error : error})
    }
};

const getAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find();
        res.status(200).json({success : true, data : allCategory});
    } catch (error) {
        res.status(404).json({success : false, errorMessage : "Unable to get the ccategories", Error : error})
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category) res.status(404).json({success : false, errorMessage : `${req.params.id} not found`});
        res.status(200).json({success : true, data : category})
    } catch (error) {
        res.status(500).json({success : false, errorMessage : "Unable to get the category", Error : error})
    }
};

const updateCategoryById = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name : req.body.name,
                icon : req.body.icon,
                color : req.body.color
            },{
                new : true
            });
            if(!updatedCategory)
            res.status(404).json({errorMessage : `${req.params.id} unable to find`})
            res.status(200).json({data : updatedCategory});
    } catch (error) {
        res.status(400).json({errorMessage : `Unable to update`, error : error});
    }
};

const deleteCategoryById = (req, res) => {
        Category.findByIdAndDelete(req.params.id).then((deleteCategory) => {
            if(!deleteCategory) res.status(404).json({errorMessage : `${req.params.id} not found`});
            res.status(200).json({success : true, message : `${req.params.id} has deleted`});
        }).catch(error => res.status(400).json({errorMessage : `Unable to delete`, error}))
};


module.exports = {createCategory, getAllCategory, getCategoryById, deleteCategoryById, updateCategoryById}