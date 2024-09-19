document.getElementById('formCadastro').addEventListener('submit', async function(event) {
    

    const cpf = document.getElementById('cpf').value;
    const emailUser = document.getElementById('email').value; 
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    try {
        
        const response = await fetch(`/usuarios/buscar?email=${encodeURIComponent(emailUser)}&cpf=${encodeURIComponent(cpf)}`);
        const data = await response.json();

        if (data.emailExists) {
            showAlert('Erro no cadastro', 'Já existe um usuário com este email!', 'alertErro');
            return;
        }

        if (data.cpfExists) {
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
