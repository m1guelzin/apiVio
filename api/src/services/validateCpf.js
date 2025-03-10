const connect = require("../db/connect");

module.exports = async function validateCpf(cpf, userId) {
  const query = "select id_usuario from usuario where cpf=?";
  const values = [cpf];

  connect.query(query, values, (err, results) => {
    if (err) {
      //Fazer algo
    } else if (results.length > 0) {
      const idDocpfCadastrado = results[0].id_usuario;

      if (userId && idDocpfCadastrado !== userId) {
        return { error: "CPF ja cadastrado para outro usuário" };
      } else if (!userId) {
        return { error: "CPF ja cadastrado" };
      }
    }
    else{
        return null;
    }
  });
};
