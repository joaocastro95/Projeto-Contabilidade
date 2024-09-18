const user = document.getElementById('username');
const senha = document.getElementById('password');
const nome = document.getElementById('nome');
const dtNasc = document.getElementById('dt_nasc');
const senhaConfirm = document.getElementById('passwordConfirm');
const tituloAlert = document.getElementById('tituloAlert');


document.getElementById('formCadastro').addEventListener('submit', (event) => {
    event.preventDefault();

    if (usuarios.some(u => u.email === user.value)) {
        showAlert('Erro no cadastro', 'Já existe um usuário com este email, por favor insira outro!', 'alertErro');
        return;
    }

    if (senha.value !== senhaConfirm.value) {
        showAlert('Erro no cadastro', 'Suas senhas não coincidem, insira novamente!', 'alertErro');
        return;
    }
    showAlert('Êxito no cadastro', 'Sua conta foi criada com sucesso!', 'alertAcerto');
    salvarResultado();
});

function showAlert(titulo, corpo, classe) {
    const alertBox = document.getElementById('customAlert');
    document.getElementById('tituloAlert').innerHTML = titulo;
    document.getElementById('corpoAlert').innerHTML = corpo;
    alertBox.className = `alert ${classe}`;
    alertBox.style.display = 'block';

    document.getElementById('closeAlert').addEventListener('click', function() {
        alertBox.style.display = 'none';
        if (classe === 'alertAcerto') {
            window.location.replace('login.html');
        }
    });
}









