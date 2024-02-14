const router = require('express').Router();
const User = require('../model/userSchema')
const { verifyToken, VerifyTokenAndAuth, VerifyTokenAndAdmin } = require('./verifyToken');


// Update User
router.put('/:id', VerifyTokenAndAuth, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            }, 
            { 
                new: true 
            }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Delete User
router.delete('/:id', VerifyTokenAndAuth, async(req, res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({msg : "User has been deleted...!!!"});
    } catch (error) {
        res.status(500).json(error)
    }
});

// Get User
router.get('/find/:id', VerifyTokenAndAdmin, async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;

        res.status(200).json(others);
        // res.status(200).json(await User.findById(req.params.id));
    } catch (error) {
        res.status(500).json(error)
    }
});

// Get All Users
router.get('/', VerifyTokenAndAdmin, async(req, res)=>{
    try {
        const query = req.query.new
        const users = query ? await User.find().sort({_id : -1}).limit(5) : await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error)
    }
});

// Get User Stats
router.get("/stats", VerifyTokenAndAdmin, async(req, res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

try {
    const data = await User.aggregate([
        {$match: {createdAt: {$gte : lastYear}}},
        {
            $project:{
                month: {$month: "$createdAt"},
            },
        },
        {
            $group:{
                _id: "$month",
                total: {$sum:1},
            },
        },
    ]);
    res.status(200).json(data);
} catch (err) {
    res.status(400).json(err);
}
});

module.exports = router;