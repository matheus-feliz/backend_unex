sql  = require ( 'mssql' ) 
const connStr ='Server=sql5094.site4now.net;Database=db_a9df84_unexutility;User Id=db_a9df84_unexutility_admin;Password=unex03*25*03;Encrypt=true';

const connect = async()=>{
   await sql.connect(connStr)
   .then(conn => {global.conn = conn;
    console.log('certo')})
   .catch(err => console.log(err));
}

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

module.exports = {connect, execSQLQuery};
