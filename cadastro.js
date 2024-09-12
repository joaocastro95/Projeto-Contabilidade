const user = document.getElementById('username');
const senha = document.getElementById('password');
const nome = document.getElementById('nome');
const dtNasc = document.getElementById('dt_nasc');
const senhaConfirm = document.getElementById('passwordConfirm');
const tituloAlert = document.getElementById('tituloAlert');
let photo = document.getElementById('imgPhoto');
let file = document.getElementById('flImage');

const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

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
            window.location.replace('index.html');
        }
    });
}

photo.addEventListener('click', () => {
    file.click();
})

file.addEventListener('change', (e)=>{
  
    if(file.files.length <= 0 ){
        return;
    }
    let reader = new FileReader();

    reader.onload = (e) => {
        photo.src = reader.result;
    }
    reader.readAsDataURL(file.files[0])

})



function salvarResultado() {
    if(photo.src == "http://127.0.0.1:5501/img/big-photo-camera.png" ){
        photo.src = "http://127.0.0.1:5501/img/avatarBranco.png"
    }
    const newUser = {
        email: user.value,
        senha: senha.value,
        nome: nome.value,
        dataNascimento: dtNasc.value,
        avatar : photo.src
    };
    usuarios.push(newUser);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}





