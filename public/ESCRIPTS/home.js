
document.addEventListener("DOMContentLoaded", function () {
    alert('homepage')
    const navBar = document.getElementById('navBar')
    navBar.innerHTML += '<li class="dropdown"> <a href="/perfil">Perfil</a><div class="dropdown-content"><a href="/perfil">Editar perfil</a><hr><a href="/login">Sair</a></div></li>'

});