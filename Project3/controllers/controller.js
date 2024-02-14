const Phone = require('../model/model');

//Creating Phone
//POST @ method
//access http://localhost:3000/addPhone

const addPhone = async (req, res) => {
    try {
        const added = await Phone.create(req.body);
        await added.save();
        res.json({
            messgae : "Hello...!! requested data has been added to the database successfully",
            data : added
        });
        
    } catch (error) {
        res.json({
            messgae : "Oops...!! requested data has not able to add to the database",
            data : error
        });
    }
};

//Get All Phones
//Get @ method
//access http://localhost:3000/getAll

const getAllPhones = async (req, res) => {
    try {
        const getAll = await Phone.find();
        res.json({
            messgae : "Hello...!! Get request successfull",
            data : getAll
        });
        
    } catch (error) {
        res.json({
            messgae : "Hello...!! Get request failed",
            data : error
        });
    }
    
}

//Get Phones by Id
//Get @ method
//access http://localhost:3000/getOne/:id

const getPhonesById = async (req, res) => {
    try {
        const getData = await Phone.findById(req.params.id);
        res.json({
            messgae : "Hello...!! Get request successfull",
            data : getData
        });
    } catch (error) {
        res.json({
            messgae : "Hello...!! Get request failed",
            data : error
        });
    }
   
}

//Delete Phones by Id
//Delete @ method
//access http://localhost:3000/delete:id

const deleteById = async (req, res) => {
    try {
        const deleted = await Phone.findByIdAndDelete(req.params.id);
        res.json({
            messgae : "Hello...!! Requested id data has been deleted",
            deletedData: deleted
        });
    } catch (error) {
        res.json({
            messgae : "Hello...!! unable to delete requested data",
            Error : error
        });
    }
    
}

//Update Phones by Id
//PUT @ method
//access http://localhost:3000/update:id

const updateById = async (req, res) => {
    
    try {
        const id = req.params.id;
        const update = req.body;
        const result = await Phone.findByIdAndUpdate(id, update, {new :true})
        res.json({
            messgae : "Hello...!! requested data has been updated",
            data : result
        });
    } catch (error) {
        res.json({
            messgae : "Hello...!! unable to update requested data",
            Error : error
        });
    }
};

module.exports = {addPhone, getAllPhones, getPhonesById, deleteById, updateById}