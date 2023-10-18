const express = require("express");
const router = express.Router();
const { execSQLQuery } = require("../dataBase/conection");
const middlewareAuth = require("../middlewares/auth");
const multer = require("multer");
const config = require("../config/multer");
const tipo = require("../config/tipoUser");

const upload = multer(config).array("foto");

router.use(middlewareAuth);

router.post("/register", async (req, res) => {
  try {
    upload(req, res, async (err) => {
      let {
        nome,
        descricao,
        local,
        status,
        nome_do_dono,
        telefone_dono_item,
        id_pessoa,
        tipo_usuario,
        categoria,
        celular,
        identificacao,
        unidade,
      } = req.body;
      if (tipo(tipo_usuario)) {
          let sql = "";
          for (i = 0; i < req.files.length; i++) {
            var str = req.files[i].originalname.replace(/\s/g, "");
            sql += `${
              ",'" +
              str +
              "','" +
              req.files[i].filename +
              "','" +
              "http://localhost:3000/" +
              req.files[i].filename +
              "'"
            }`;
          }
          const result = await execSQLQuery(
            `EXEC SP_ACHADOS_INSERT ${req.files.length} ${
              ",'" +
              nome +
              "','" +
              descricao +
              "','" +
              local +
              "','" +
              status +
              "','" +
              nome_do_dono +
              "','" +
              telefone_dono_item+
              "','"+categoria+"','"+celular+"','"+identificacao+"','"+unidade+"',"
            } ${id_pessoa} ${sql}`
          );
          return res.send(result.message);
      } else {
        return res.send("UNAUTHORIZED USER"); 
      }
    });
  } catch (err) {}
});

router.put("/atualizar", async (req, res) => {
  try {
    let { id, nome, descricao, local, nome_do_dono, telefone_dono_item, tipo_usuario,  categoria,
        celular,
        identificacao,
        unidade, } =
      req.body;
    if (tipo(tipo_usuario)) {
        const result = await execSQLQuery(
            `EXEC SP_ACHADOS_UPDATE ${
              "" +
              id +
              ",'" +
              nome +
              "','" +
              descricao +
              "','" +
              local +
              "','" +
              nome_do_dono +
              "','" +
              telefone_dono_item +
              "','"+categoria+"','"+celular+"','"+identificacao+"','"+unidade+"'"
            }`
          );
          return res.send(result.message);
    } else {
      return res.send("UNAUTHORIZED USER"); 
    }
  } catch (err) {}
});

router.delete("/delete", async (req, res) => {
  try {
    let { id, tipo_usuario } = req.body;
    if (tipo(tipo_usuario)) {
      const result = await execSQLQuery(
        `EXEC SP_ACHADOS_DELETE ${"" + id + ""}`
      );
      return res.send(result.message);
    } else {
        return res.send("UNAUTHORIZED USER"); 
    }
  } catch (err) {}
});

router.post("/finalizar", async (req, res) => {
  try {
    let { id, tipo_usuario, tipo_achados } = req.body;
    if (tipo(tipo_usuario)) {
        const result = await execSQLQuery(
            `EXEC SP_ACHADOS_FINALIZA ${"" + id + ",'" + tipo_achados + "'"}`
          );
          return res.send(result.message);
    } else {
      return res.send("UNAUTHORIZED USER");    }
  } catch (err) {}
});
router.get("/list", async (req, res) => {
  res.send(await execSQLQuery("SELECT * from VW_ACHADOS"));
});

router.post("/listid", async (req, res) => {
  try {
    let { id, tipo_usuario } = req.body;

    if (tipo(tipo_usuario)) {
      const result = await execSQLQuery(`EXEC SP_LIST_OBJ_ID${"" + id + ""}`);
      return res.send(result);
    } else {
      return res
        .status(400)
        .send("UNAUTHORIZED USER");
    }
  } catch (err) {}
});

module.exports = (app) => app.use("/obj", router);
