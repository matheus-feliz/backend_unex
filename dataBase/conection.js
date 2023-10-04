sql  = require ( 'mssql' ) 
const connStr ='';

sql.connect(connStr)
   .then(conn => {global.conn = conn;
    console.log('certo')})
   .catch(err => console.log(err));

   const execSQLQuery = async function (sqlQry){
      let sql;
    await global.conn.request()
               .query(sqlQry)
               .then(result => {
                  sql = result.recordset
               })
               .catch(err =>{sql=err});
               return sql;
}

module.exports = {sql, execSQLQuery};
