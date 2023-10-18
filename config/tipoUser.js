
module.exports = function(tipo_user){
    const tipo = {admin: 'admin',administrador:'administrador'}
    return tipo[tipo_user]
}