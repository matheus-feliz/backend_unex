
module.exports = function(tipo_user){
    const tipo = {aluno:'aluno',funcionario:'funcionario',professor:'professor'}
    return tipo[tipo_user]
}