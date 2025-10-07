// hello.js
// Este arquivo exibe uma mensagem de boas-vindas personalizada e mostra a versão do Node.js.

// Crie uma variável com seu nome
const meuNome = "Murilo"; 

// Crie uma função que exiba uma mensagem de boas-vindas
function exibirBoasVindas() {
    console.log("Olá, ${meuNome}! Bem-vindo ao Node.js!");
}

// Chame a função
exibirBoasVindas();

// Adicione uma mensagem mostrando a versão do Node.js
console.log(/*Versão do Node.js: ${process.version}*/);