document.addEventListener("DOMContentLoaded", function () {
    const navBar = document.getElementById('navBar')
    navBar.innerHTML += '<li><a href="/login">Login</a></li>'


    document.getElementById('formLogin').addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`/login/auth?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);

            if (response.ok) {
                showAlert('Êxito no login', 'Seja bem vindo a experiência TaxFree', 'alertAcerto')

            } else {
                const errorMessage = await response.text();
                showAlert('Erro de Login', errorMessage, 'alertErro');
            }
        } catch (error) {
            console.error('Erro ao autenticar:', error);
            showAlert('Erro de Login', 'Ocorreu um erro ao tentar logar.', 'alertErro');
        }
    });

    document.getElementById('esqcSenha').addEventListener('click', async function (event) {
        event.preventDefault();
        showAlert('Enviamos um email', 'Nossa equipe enviou um email<br> para modificar sua senha,<br> Espere 1 minuto', 'alertSenha');
        return
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
                window.location.replace('/home');
            }
        });
    }

});
