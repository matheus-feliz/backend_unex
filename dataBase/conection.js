sql  = require ( 'mssql' ) 
const connStr = 'Server=sql5094.site4now.net;Database=db_a9df84_unexutility;User Id=db_a9df84_unexutility_admin;Password=unex03*25*03;Encrypt=true';

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