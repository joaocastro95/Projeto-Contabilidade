document.addEventListener("DOMContentLoaded", function () {
    const navBar = document.getElementById('navBar')
    navBar.innerHTML += '<li><a href="/home">Home</a></li>'
     navBar.innerHTML += '<li class="dropdown"> <a href="/perfil">Perfil</a><div class="dropdown-content"><a href="/perfil">Editar perfil</a><hr><a href="/login">Sair</a></div></li>'

    document.getElementById('formEdit').addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const emailNew = document.getElementById('emailNew').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/perfil/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, emailNew, password })
            });

            console.log(response)
            if (response.ok) {
                showAlert('Êxito na atualização', 'Seu perfil foi atualizado com sucesso!', 'alertAcerto');
            } else {
                const errorMessage = await response.text();
                showAlert('Erro na atualização', errorMessage, 'alertErro');
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            showAlert('Erro ao atualizar perfil', 'Ocorreu um erro ao tentar atualizar seu perfil.', 'alertErro');
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
                window.location.replace('/home');
            }
        });
    }

});