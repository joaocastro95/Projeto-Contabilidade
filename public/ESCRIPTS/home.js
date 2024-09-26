document.addEventListener("DOMContentLoaded", function () {
    const navBar = document.getElementById('navBar')
    navBar.innerHTML += '<li class="dropdown"> <a href="/perfil">Perfil</a><div class="dropdown-content"><a href="/perfil">Editar perfil</a><hr><a href="/login">Sair</a></div></li>'

    const elementos = document.querySelectorAll('.articleHome');

    elementos.forEach((elemento) => {
      elemento.addEventListener('mouseover', () => {
        elementos.forEach((el) => {
          if (el === elemento) {
            el.classList.add('grande');
            el.classList.remove('pequeno');
          } else {
            el.classList.add('pequeno');
            el.classList.remove('grande');
          }
        });
      });
    
      elemento.addEventListener('mouseout', () => {
        elementos.forEach((el) => {
          el.classList.remove('grande');
          el.classList.remove('pequeno');
        });
      });
    });

});