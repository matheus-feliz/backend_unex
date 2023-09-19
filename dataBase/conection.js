sql  = require ( 'mssql' ) 
const connStr ='';

sql.connect(connStr)
   .then(conn => {global.conn = conn;
    console.log('certo')})
   .catch(err => console.log(err));

   const execSQLQuery = async function (sqlQry, res){
    global.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}

module.exports = {sql, execSQLQuery};
