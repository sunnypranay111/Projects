const jwt = require('jsonwebtoken');



const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.jwt_key, (err, user)=>{
            if(err) res.status(403).json("Token is not valid Expired");
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You are not authourized")
    }
}

const VerifyTokenAndAuth = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do this ")
        }
    })
}

const VerifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do this ")
        }
    })
}
module.exports = {verifyToken, VerifyTokenAndAuth, VerifyTokenAndAdmin};