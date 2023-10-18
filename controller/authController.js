const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const { execSQLQuery } = require("../dataBase/conection");
const bcrypt = require("bcrypt");
const {verificacao} = require('../config/tipoUser');

router.post("/login", async (req, res) => {
  try {
    let { email, senha} = req.body;
    let result = await execSQLQuery(
      `EXEC SP_LOGIN_ACESSO_EMAIL ${"'" + email + "'"} `
    );
    if(result.message) return res.send(result.message);
    let user = Object.assign(...result);
    if (!bcrypt.compareSync(senha, user.DS_SENHA)) {
      return res.send("senha ou email invalido");
    }
    res.send({
      user: user,
      token: generateToken({ id: user.ID_PESSOA_USUARIO }),
    });
  } catch (err) {}
});

router.post("/register", async (req, res) => {
  try {
    let {
      nome, registro, data_de_nascimento, telefone, celular,email, usuario, senha, tipo_usuario,
    } = req.body;
  if(verificacao(tipo_usuario)){
    senha = bcrypt.hashSync(senha, bcrypt.genSaltSync());
    let result = await execSQLQuery(
      `EXEC SP_USUARIO_INSERT ${
        "'" + nome +"','" + registro + "'," + data_de_nascimento + "," + telefone + ",'" + celular + "','" + email + "','" + usuario +"','" +senha +"','" +tipo_usuario + "'"
      } `
    );
    res.send(result.message);
  }else{
    return res.send("User type must be student, employee, admin or teacher"); 
  }
  } catch (err) {
    console.warn(err);
  }
});

router.put("/esqueceusenha", async (req, res) => {
    try {
        let {
          email,
          senha,
        } = req.body;
        senha = bcrypt.hashSync(senha,bcrypt.genSaltSync());
        let result = await execSQLQuery(
          `EXEC SP_ESQUECEU_SENHA ${
            "'" +
            email +
            "','" +
            senha +
            "'"
          } `
        );
        res.send(result.message);
      } catch (err) {
        console.warn(err);
      }
});
function generateToken(params = {}) {
  return jwt.sign(params, secret.secret, { expiresIn: 86400 });
}

module.exports = (app) => app.use("/auth", router);
