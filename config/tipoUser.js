
module.exports = function tipo(tipo_user){
    const tipo = {admin: 'admin',administrador:'administrador'}
    return tipo[tipo_user]
}, function verificacao(tipo_user){
    const tipo = {admin: 'admin',administrador:'administrador', aluno: 'aluno', professor:'professor',funcionario:'funcionario'}
    return tipo[tipo_user]
}