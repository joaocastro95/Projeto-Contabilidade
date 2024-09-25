document.addEventListener("DOMContentLoaded", function () {
    const navBar = document.getElementById('navBar')
    navBar.innerHTML += '<li><a href="/login">Login</a></li>'

    document.getElementById('formCadastro').addEventListener('submit', async function (event) {

        const cnpj = document.getElementById('cnpj').value;
        const emailEmpresa = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;

        console.log(cnpj)
        console.log(emailEmpresa)
        console.log(password)

        try {
            const response = await fetch(`/empresas/buscar?email=${encodeURIComponent(emailEmpresa)}&cnpj=${encodeURIComponent(cnpj)}`);

            if (!response.ok) {
                throw new Error('Erro ao buscar usuário');
            }

            const data = await response.json();
            console.log('Response status:', response.status);
            console.log('Response data:', data);
            
            if (data.emailExists) {
                showAlert('Erro no cadastro', 'Já existe um usuário com este email!', 'alertErro');
                return;
            }

            if (data.cnpjExists) {
                showAlert('Erro no cadastro', 'Já existe um usuário com este CPF!', 'alertErro');
                return;
            }

            if (password !== passwordConfirm) {
                showAlert('Erro no cadastro', 'Suas senhas não coincidem, insira novamente!', 'alertErro');
                return;
            }

            showAlert('Êxito no cadastro', 'Sua conta foi criada com sucesso!', 'alertAcerto');
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            showAlert('Erro ao buscar usuário', 'Ocorreu um erro ao buscar o usuário.', 'alertErro');
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
                window.location.replace('/login');
            }
        });
    }
});
