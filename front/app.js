//Acessa o objeto "Documento" que representa a pagina html

const { json } = require("body-parser");
const { application } = require("express");

//Seleciona o elemento com o id indicado do forumalario
document
  .getElementById("formulario-registro")

  //Adiciona o ouvinte de evento (submit) para capturar o envio do formulario
  .addEventListener("submit", function (event) {
    //Previne o comportamento padrao do formulario, ou seja, impede que ele seja enviado e recarregue a pagona
    event.preventDefault();

    //Captura os valores dos campos do formularios
    const name = document.getElementById("nome");
    const cpf = document.getElementById("cpf");
    const email = document.getElementById("email");
    const password = document.getElementById("senha");

    //Requisição HTTP para o endpoint de cadastro de usuario
    fetch("http://localhost:5000/api/v1/user", {
      //Realiza uma chamada http para o servidor(a rota definida)
      method: "POST",
      headers: {
        //A requisição será em formato json
        "Content-Type": application / json,
      },
      //Transforma os dados do formulario de uma string json para serem enviados no corpo da req
      body: JSON.stringify({ name, cpf, email, password }),
    });
  });
