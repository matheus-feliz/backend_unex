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
router.get('/list', async (req, res) =>{
    res.send(await execSQLQuery('SELECT * FROM VW_LOGIN_ACESSO_API'));
});

router.put('/altera',async (req,res)=>{
    try {
        let {
          id,nome, registro, data_de_nascimento, telefone, celular,email, usuario, senha, tipo_usuario,
        } = req.body;
       if(tipo_usuario == 'aluno'|| tipo_usuario == 'ALUNO' ){
        return res.send('USUARIO NÃO AUTORIZADO')
       }else{
        senha = bcrypt.hashSync(senha, bcrypt.genSaltSync());
        let result = await execSQLQuery(
          `EXEC SP_USUARIO_UPDATE ${
            "'" + id+"','"+ nome +"','" + registro + "'," + data_de_nascimento + "," + telefone + ",'" + celular + "','" + email + "','" + usuario +"','" +senha + "'" } `
        );
        return res.send(result.message);
       }
      } catch (err) {
        console.warn(err);
      }
});

router.delete('/delete', async(req,res)=>{
    try{
        let {
            id,
            tipo_usuario
          } = req.body;
         if(tipo_usuario == 'aluno' || tipo_usuario == 'ALUNO' ){
            return res.send('USUARIO NÃO AUTORIZADO')
        }else{
           let result = await execSQLQuery(
                `EXEC SP_USUARIO_DELETE ${
                    "'" + id +"'"} `
                    );
          res.send(result.message);          
         }
    }catch(err){
        console.warn(err)
    }
})

module.exports = app => app.use('/user',router);