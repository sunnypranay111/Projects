const mongoose = require('mongoose');

const phoneSchema = mongoose.Schema({
    brandname : {
        type : String,
        required : true,
    },
    model : {
        type : String,
        required : true,
        unique : true
    },
    price : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
},{timestamps : true});

module.exports = mongoose.model('phones', phoneSchema);