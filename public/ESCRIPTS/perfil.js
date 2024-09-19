const index = localStorage.getItem('indexAtual');
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

const email = document.getElementById("username");
const senha = document.getElementById("password");
const senhaConfirm = document.getElementById("passwordConfirm");
const novaSenha = document.getElementById("passwordNew");
const novoEmail = document.getElementById("usernameNew");

const avatarzinho = document.getElementById('imagePreview');
avatarzinho.innerHTML = `<img src="${usuarios[index].avatar}" alt=""></img>`

let photo = document.getElementById('imgPhoto');
let file = document.getElementById('flImage');

photo.src = usuarios[index].avatar

photo.addEventListener('click', () => {
    file.click();
})

file.addEventListener('change', (e) => {

    if (file.files.length <= 0) {
        return;
    }
    let reader = new FileReader();

    reader.onload = (e) => {
        photo.src = reader.result;

    }
    reader.readAsDataURL(file.files[0])

})

document.getElementById("formEdit").addEventListener("submit", (event) => {
    event.preventDefault();
    if (email.value !== usuarios[index].email) {
        showAlert('Erro!', 'O email atual não confere com o registrado.', 'alertErro');
        return;
    }
    if (senha.value !== usuarios[index].senha) {
        showAlert('Erro!', 'A senha atual não confere com a registrada.', 'alertErro');
        return;
    }
    if (novaSenha.value !== senhaConfirm.value) {
        showAlert('Erro!', 'A nova senha não confere com a confirmação.', 'alertErro');
        return;
    }

    usuarios[index].senha = novaSenha.value;
    usuarios[index].email = novoEmail.value;
    usuarios[index].avatar = photo.src

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    showAlert('Êxito', 'Senha e email alterados com sucesso.', 'alertAcerto');
    document.getElementById("formEdit").reset()
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