const express = require('express');
const router = express.Router();
const {execSQLQuery} =require('../dataBase/conection');
const middlewareAuth = require('../middlewares/auth');

//router.use(middlewareAuth);

router.post('/register',async(req,res)=>{

});

module.exports = app => app.use('/obj',router)