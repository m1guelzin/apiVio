const connect = require('../db/connect');
module.exports = class orgController {
  static async createOrganizador(req, res) {
    const {telefone, email, senha, nome } = req.body;

    if (!telefone || !email || !senha || !nome) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(telefone) || telefone.length !== 11) {
      return res.status(400).json({ error: "Telefone inválido. Deve conter exatamente 11 dígitos numéricos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } 
    
  else{
    // Construção da query INSERT
    const query = `INSERT INTO organizador (telefone, senha, email, name) VALUES(
      '${telefone}',
      '${senha}',
      '${email}',
      '${nome}')`;
      // Executando a query criada
      try{
        connect.query(query, function(err){
          if(err){
            console.log(err);
            console.log(err.code);
            if(err.code === 'ER_DUP_ENTRY'){
              return res.status(400).json({error:"O Email ja está vinculado a outro organizador",});
            }else{
              return res.status(500).json({error:"Erro interno do servidor",});
            }
          }else{
            return res.status(201).json({message: "Usuário cadastrado com sucesso"})
          }
        });
      }catch(error){
        console.error(error);
        res.status(500).json({error: "Erro interno do servidor"})
      }
    }
  }

  static async getAllOrganizadores(req, res) {
    const query = `SELECT * FROM organizador`;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return req.status(500).json({ error: "Erro interno do Servidor" });
        }
        return res
          .status(200)
          .json({ message: "Lista de Organizadores", orgs: results });
      });
    } 
    catch (error) {
      console.error("Erro ao executar consulta:", error)
      return res.status(500).json({error: "Erro interno do Servidor"})
    }
  }


  static async updateOrganizador(req, res) {
    // Desestrutura e recupera os dados enviados via corpo da requisição
    const {id, telefone, email, senha, nome } = req.body;

    // Validar se todos os campos foram preenchidos
    if(!id || !telefone || !email || !senha || !nome) {
        return res.status(400).json({error:"Todos os campos devem ser preenchidos"});
    }
    const query = `UPDATE organizador SET nome=?, email=?, senha=?, telefone=? WHERE id_organizador = ?`;
    const values = [nome,email,senha,telefone, id]
    
    try{
      connect.query(query,values,function(err,results){
        if(err){
          
        }
      })
    }
    catch(error){

    }
  }

  static async deleteOrganizador(req, res) {
    // Obtem o parametro 'id' da requisição, que é o id do org a ser deletado
    const orgId = req.params.id

    //Procurar o indice do user no Array 'users' pelo cpf
    const orgIndex = orgs.findIndex((org) => org.id == orgId)
    //Se o usuário não for encontrado userIndex equivale a -1

    // Removendo o usuário do Array 'orgs'
    orgs.splice(orgIndex,1);
    return res.status(200).json({message: "Usuário Apagado!", orgs})
   
};
}