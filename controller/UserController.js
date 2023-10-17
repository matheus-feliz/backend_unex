const express = require('express');
const router = express.Router();
const {execSQLQuery} =require('../dataBase/conection');
const middlewareAuth = require('../middlewares/auth');
const tipo = require('../config/tipoUser');

router.use(middlewareAuth)

router.get('/list', async (req, res) =>{
        return res.send(await execSQLQuery('SELECT * FROM VW_LOGIN_ACESSO_API'));
});

router.post('/listid',async(req,res)=>{
  let {
    id, tipo_usuario,
  } = req.body;
  try{
    if(tipo(tipo_usuario)){
      const result = await execSQLQuery(`EXEC SP_LIST_USER_ID${""+id+""}`);
     return res.send(result)
    }else{
      return res.send("UNAUTHORIZED USER");
    }
  }catch(e){

  }
})

router.put('/altera',async (req,res)=>{
    try {
        let {
          id,nome, registro, data_de_nascimento, telefone, celular,email, usuario, senha, tipo_usuario,
        } = req.body;
       if(tipo(tipo_usuario)){
           senha = bcrypt.hashSync(senha, bcrypt.genSaltSync());
           let result = await execSQLQuery(
             `EXEC SP_USUARIO_UPDATE ${
               "" + id+",'"+ nome +"','" + registro + "'," + data_de_nascimento + "," + telefone + ",'" + celular + "','" + email + "','" + usuario +"','" +senha + "'" } `
           );
           return res.send(result.message);
       }else{
        return res.send("UNAUTHORIZED USER"); 
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
         if(tipo(tipo_usuario)){
            let result = await execSQLQuery(
                 `EXEC SP_USUARIO_DELETE ${
                     "" + id +""} `
                     );
          return res.send(result.message); 
        }else{
          return res.send("UNAUTHORIZED USER");          
         }
    }catch(err){
        console.warn(err)
    }
})

module.exports = app => app.use('/user',router);