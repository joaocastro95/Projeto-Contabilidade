const user = document.getElementById('username');
const senha = document.getElementById('password');
const tituloAlert = document.getElementById('tituloAlert');
const users = JSON.parse(localStorage.getItem('usuarios')) || [];

document.getElementById('formLogin').addEventListener('submit', (event) => {
    event.preventDefault();
    const userIndex = users.findIndex(u => u.email === user.value);

    if (userIndex !== -1 && users[userIndex].senha === senha.value) {
        showAlert('Êxito no login', 'Seja bem-vindo(a) ao TaxFree, <br> desfrute da experiência TaxFree', 'alertAcerto');
        localStorage.setItem('indexAtual', userIndex);
    } else {
        showAlert('Erro no login', 'Usuário e/ou senha não encontrados, <br> verifique novamente ou crie uma conta', 'alertErro');
        document.getElementById("password").value = "";
        return

    }
});

function showAlert(titulo, corpo, classe) {
    const alertBox = document.getElementById('customAlert');
    document.getElementById('tituloAlert').innerHTML = titulo;
    document.getElementById('corpoAlert').innerHTML = corpo;
    alertBox.className = `alert ${classe}`;
    alertBox.style.display = 'block';

    document.getElementById('closeAlert').addEventListener('click', function () {
        alertBox.style.display = 'none';
        if (classe === 'alertAcerto') {
            window.location.replace('home.html');
        }
    });
}

function esqueciSenha() {
    showAlert('Enviamos um email', 'Nossa equipe enviou um email<br> para modificar sua senha,<br> Espere 1 minuto', 'alertSenha');
    return
}





