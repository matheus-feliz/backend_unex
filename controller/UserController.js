const express = require('express');
const router = express.Router();
const {execSQLQuery} =require('../dataBase/conection');
const middlewareAuth = require('../middlewares/auth');

router.use(middlewareAuth)

router.get('/',(req , res)=>{
    try{
        res.send('tela de usuário')
    }catch(e){
    };
});
router.get('/list', (req, res) =>{
    execSQLQuery('SELECT * FROM VW_LOGIN_ACESSO_API', res);
});

module.exports = app => app.use('/user',router);