document.addEventListener("DOMContentLoaded", function () {
    const navBar = document.getElementById('navBar');
    navBar.innerHTML += '<li><a href="/home">Home</a></li>';
    navBar.innerHTML += '<li class="dropdown"> <a href="/perfil">Perfil</a><div class="dropdown-content"><a href="/perfil">Editar perfil</a><hr><a href="/login">Sair</a></div></li>';

    let contadorFormDeb = 1;
    document.getElementById('adicionaDebito').addEventListener('click', (e) => {
        e.preventDefault()
        if(contadorFormDeb == 5){
            showAlert('Erro', 'Limites de formulários atingido', 'alertErro');
            return
        }
        contadorFormDeb++;
        const debitos = document.getElementById("localDebitos");
        const containerOriginal = document.querySelector('section.sectionLancamento');
        
        const novoContainer = containerOriginal.cloneNode(true);
        const novoForm = novoContainer.querySelector('form');
        novoForm.id = `formLancamento${contadorFormDeb}`;
        
        novoContainer.querySelectorAll('input').forEach(input => {
            input.id = input.id.replace(/\d+$/, contadorFormDeb); 
        });

        debitos.appendChild(novoContainer);
    });

    let contadorFormCre = 1;
    document.getElementById('adicionaCredito').addEventListener('click', (e) => {
        e.preventDefault()
        if(contadorFormCre == 5){
            showAlert('Erro', 'Limites de formulários atingido', 'alertErro');
            return
        }
        contadorFormCre++;
        const creditos = document.getElementById("localCreditos");
        const containerOriginal = document.querySelector('section.sectionLancamento2');
        
        const novoContainer = containerOriginal.cloneNode(true);
        const novoForm = novoContainer.querySelector('form');
        novoForm.id = `form2Lancamento${contadorFormCre}`;
        
        novoContainer.querySelectorAll('input').forEach(input => {
            input.id = input.id.replace(/\d+$/, contadorFormCre); 
        });

        creditos.appendChild(novoContainer);
    });

    document.getElementById('enviaForms').addEventListener('click', (e) => {
        e.preventDefault();
    
        const eleDeb = document.querySelectorAll('input[name="debito"]');
        let somaDebito = 0;
        eleDeb.forEach(elemento => {
            somaDebito += parseFloat(elemento.value) || 0;
        });

       
        const eleCre = document.querySelectorAll('input[name="credito"]');
        let somaCredito = 0;
        eleCre.forEach(elemento => {
            somaCredito += parseFloat(elemento.value) || 0;
        });

        console.log("Soma Crédito: " + somaCredito);
        console.log("Soma Débito: " + somaDebito);

        if (somaDebito !== somaCredito) {
            console.log("Entrou na diferença de somas");
            showAlert('Erro', 'Débito e crédito não são equivalentes', 'alertErro');
        } else {
            console.log('Entrou na equivalência de somas');
            showAlert('Êxito', 'Sucesso ao enviar forms', 'alertAcerto');


            const formsDebito = document.querySelectorAll('form[id^="formLancamento"]');
            console.log(formsDebito)

            const formsCredito = document.querySelectorAll('form[id^="form2Lancamento"]');
            console.log(formsCredito)

            formsDebito.forEach((form, index) => {
                setTimeout(() => {
                    console.log("enviando deb: "+ index)
                    form.submit();
                    console.log("deb: "+ index + "enviado")
                }, index * 100); 
            });
        
            setTimeout(()=>{
                formsCredito.forEach((form, index) => {
                    setTimeout(() => {
                        console.log("enviando cre: "+ index)
                        form.submit();
                        console.log("cre: "+ index + "enviado")
                    }, index * 100); 
                });
            },2000)
            
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
                setTimeout(()=>{
                   
                    window.location.replace('/home');
                },2000)
              
            }
        });
    }
});
