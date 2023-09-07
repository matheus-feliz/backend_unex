const express = require('express')
const router = express.Router();

router.get('/',(req , res)=>{
    try{
        res.send('tela de usuário')
    }catch(e){
    }
});

module.exports = app => app.use('/',router)