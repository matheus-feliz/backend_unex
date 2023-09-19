const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const secret = require('../config/secret');

router.post('/login',(req, res)=>{
    try{
        console.log(generateToken({id : 1}))
        res.send({
            token: generateToken({id : 1})
        })
    }catch(err){

    }
});

function generateToken(params={}){
    console.log(params)
    return jwt.sign(params,secret.secret,
        { expiresIn: 86400})
}

module.exports = app => app.use('/',router);