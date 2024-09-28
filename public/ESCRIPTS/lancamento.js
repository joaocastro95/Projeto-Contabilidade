document.addEventListener("DOMContentLoaded", function () {
    const navBar = document.getElementById('navBar')
    navBar.innerHTML += '<li><a href="/home">Home</a></li>'
    navBar.innerHTML += '<li class="dropdown"> <a href="/perfil">Perfil</a><div class="dropdown-content"><a href="/perfil">Editar perfil</a><hr><a href="/login">Sair</a></div></li>'

    document.getElementById('formLancamento1').addEventListener('submit',  (event) => {
        showAlert('Êxito', 'Lançamento salvo com sucesso', 'alertAcerto');
        setTimeout(() => {
            document.getElementById('formLancamento1').reset(); 
        }, 2000);
    });

    document.getElementById('formLancamento2').addEventListener('submit',  (event) => {
        showAlert('Êxito', 'Lançamento salvo com sucesso', 'alertAcerto');
        setTimeout(() => {
            document.getElementById('formLancamento2').reset(); 
        }, 2000);
    });


    function showAlert(titulo, corpo, classe) {
        const alertBox = document.getElementById('customAlert');
        document.getElementById('tituloAlert').innerHTML = titulo;
        document.getElementById('corpoAlert').innerHTML = corpo;
        alertBox.className = `alert ${classe}`;
        alertBox.style.display = 'block';

        document.getElementById('closeAlert').addEventListener('click', function () {
            alertBox.style.display = 'none';
            
        });
    }

});