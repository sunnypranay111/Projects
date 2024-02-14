const router = require('express').Router();
const User = require('../model/userSchema');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


router.get('/usertest', (req, res)=>{
    res.send("User test is successfull");
});

//Register User
router.post('/register', async (req, res)=>{
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString()
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json("Unable to create user");
    };
    
});

//Login User
router.post('/login', async(req, res)=>{
    try {
        const user = await User.findOne({username : req.body.username});
        !user && res.status(400).json("Username is not valid");
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(400).json("Password mismatch");

        const accessToken = jwt.sign({
            id : user._id, isAdmin : user.isAdmin
        }, process.env.jwt_key,
        {expiresIn : "3d"});

        const {password, ...others} = user._doc;

        res.status(200).json({...others, accessToken});
        
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router;