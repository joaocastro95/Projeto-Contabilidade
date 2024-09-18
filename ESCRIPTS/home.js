const users = JSON.parse(localStorage.getItem('usuarios')) || [];
const nomeUser = document.getElementById('campoUsuarioNome');
const avatarzinho = document.getElementById('imagePreview');

const usuarioAtual = localStorage.getItem('indexAtual')

avatarzinho.innerHTML = `<img src="${users[usuarioAtual].avatar}" alt=""></img>`
nomeUser.textContent = 'Seja bem vindo ' + users[usuarioAtual].nome;

