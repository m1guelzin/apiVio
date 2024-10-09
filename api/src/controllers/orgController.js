const connect = require('../db/connect');
module.exports = class orgController {
  static async createOrganizador(req, res) {
    const {telefone, email, password, name } = req.body;

    if (!telefone || !email || !password || !name) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(telefone) || telefone.length !== 11) {
      return res.status(400).json({ error: "Telefone inválido. Deve conter exatamente 11 dígitos numéricos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } 
    
  else{
    // Construção da query INSERT
    const query = `INSERT INTO organizador (telefone, password, email, name) VALUES(
      '${telefone}',
      '${password}',
      '${email}',
      '${name}')`;
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
    return res.status(200).json({ message: "Obtendo todos os usuários", orgs });
  }


  static async updateOrganizador(req, res) {
    // Desestrutura e recupera os dados enviados via corpo da requisição
    const {id, telefone, email, password, name } = req.body;

    // Validar se todos os campos foram preenchidos
    if(!id || !telefone || !email || !password || !name) {
        return res.status(400).json({error:"Todos os campos devem ser preenchidos"});
    }
    //Procurar o indice do user no Array 'orgs' pelo id
    const orgIndex = orgs.findIndex(org => org.id == id)
    //Se o usuário não for encontrado userIndex equivale a -1
    if(orgIndex === -1){
        return res.status(400).json({error: "Usuário não encontrado"});
    }

    //Atualiza os dados do usuário no Array 'users'
    orgs[orgIndex] = {id, telefone, email, password, name }
    
    return res.status(200).json({message: "Usuário atualizado", org:orgs[orgIndex]})
  }

  static async deleteOrganizador(req, res) {
    // Obtem o parametro 'id' da requisição, que é o id do org a ser deletado
    const orgId = req.params.id

    //Procurar o indice do user no Array 'users' pelo cpf
    const orgIndex = orgs.findIndex((org) => org.id == orgId)
    //Se o usuário não for encontrado userIndex equivale a -1
    if(orgIndex == -1){
        return res.status(400).json({error: "Usuário não encontrado"});
    }

    // Removendo o usuário do Array 'orgs'
    orgs.splice(orgIndex,1);
    return res.status(200).json({message: "Usuário Apagado!", orgs})
   
};
}