# 💹 Projeto-Contabilidade


A ***TaxFree*** é uma projeto desenvolvida em JavaScript/Node.js com integração em Docker, hospedada na AWS, que oferece uma solução eficaz para o gerenciamento financeiro e contábil, focada na automação de processos. Com uma interface intuitiva, facilita o controle de três componentes principais: razão, balancete e diário, permitindo análise e decisões estratégicas. O sistema otimiza o fluxo de trabalho e reduz erros, promovendo eficiência e confiabilidade.


## 🎯 Objetivos do Projeto

1. Automatizar e simplificar processos contábeis, reduzindo erros humanos e otimizando o fluxo de trabalho.
2. Facilitar o controle e a análise financeira por meio de ferramentas como razão, balancete e diário, que oferecem uma visão abrangente da saúde financeira.
3. Apoiar decisões estratégicas dos gestores, fornecendo informações financeiras precisas e acessíveis para o crescimento sustentável do negócio.

## 🎬 Projecão

O projeto foi desenvolvido utilizando o Figma, uma ferramenta de design colaborativo que permite a criação de interfaces de usuário de forma intuitiva e eficaz. Com o Figma, foi possível elaborar protótipos interativos e layouts atraentes, facilitando a visualização das funcionalidades do software. Essa abordagem colaborativa não apenas melhorou o processo de design, mas também garantiu que a experiência do usuário fosse priorizada, resultando em uma interface amigável e funcional que atende às necessidades dos usuários de forma prática e eficiente. Abaixo estão algumas imagens e descrições que mostram como a projeção do **TaxFree**:

![Projeção 1](/public/img/print3.jpg)

![Projeção 2](/public/img/print4.jpg)

### 🌐 Interface Web

A página principal do projeto permite que você visualize os serviços oferecidos pela TaxFree. A interface exibe as informações de forma clara e organizada, possibilitando a consulta aos dados que foram salvos no sistema.

![Página Principal](/public/img/print1.png)


![Balancete](/public/img/print2.png)


### 🔍 Testando Localmente

Para testar o projeto localmente, siga estas etapas:

1. Abra o terminal (ou prompt de comando) e execute o seguinte comando para clonar o repositório:

   `git clone https://github.com/joaocastro95/Projeto-Contabilidade.git`

2. Após clonar o repositório, entre no diretório do projeto com o comando:

   `cd Projeto-Contabilidade`

3. Execute o comando abaixo para instalar todas as dependências necessárias para o projeto:

   `npm install`

4. Inicie o servidor local com o comando:

   `npm run dev`

5. Abra um navegador web e digite o seguinte endereço na barra de endereços:

   `http://localhost:3000`

Isso abrirá a interface web do projeto. Se o servidor estiver funcionando corretamente, você verá a página principal onde poderá utilizar a "TaxFree".

#### 📝 Observação
Se você encontrar algum problema ou a página não carregar, verifique as mensagens no terminal para possíveis erros e certifique-se de que o servidor está rodando corretamente. Caso precise de mais assistência, consulte a seção de [Autores] e entre em contato conosco.


## 🛠️ Estrutura do Projeto
Mantivemos uma estrutura organizada para facilitar a manutenção e a compreensão do código:

#### ⚙️ Backend e 🎨 Frontend

- **db/**
    - `app.db` - Base de dados.
    - `connection.js` - Arquivo para configuração de conexão com o banco de dados.
- **models/** - Modelos de dados.
    - `Empresas.js`
    - `Registros.js`
- **public/** - Recursos estáticos.
    - **css/** - Arquivos CSS.
    - **ESCRIPTS/** - Scripts JS.
    - **img/** - Imagens.
- **routes/** - Rotas da aplicação.
    - `empresas.js`
    - `registros.js`
- **views/** - Arquivos de templates.
    - **layouts/** - Layout principal
    - Outros arquivos `.handlebars` para diferentes páginas.
- `app.js` - Arquivo principal da aplicação.
- `docker-compose.yml` - Arquivo para orquestração do Docker.
- `Dockerfile` - Arquivo de definição da imagem Docker.
- `package.json` e `package-lock.json` - Dependências do Node.js.
- `README.md` - Documentação do projeto.

  ---
## 🚀 Tecnologias Utilizadas

| Ferramenta       | Descrição                                         |
| ---------------- | ------------------------------------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)      | Usado para criar a API                            |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)   | Framework para criar o servidor da API            |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)       | Conteinerização da aplicação                      |
| ![AWS S3](https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white)       | Armazenamento dos arquivos JSON                   |
| ![AWS EC2](https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)      | Hospedagem dos containers Docker                  |
| ![HTML, CSS, JS](https://img.shields.io/badge/HTML%20/%20CSS%20/%20JS-000000?style=for-the-badge&logo=html5&logoColor=white) | Criação da interface e visualização dos dados     |
| ![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white) | Editor de código utilizado no desenvolvimento     |
| ![Trello](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white)       | Organização geral de tarefas           |
| ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)     | Ferramenta para testar e documentar APIs          |
| ![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)          | Sistema operacional utilizado na máquina virtual EC2  |
| ![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)    | Sistema operacional utilizado durante o desenvolvimento  |


## 📝 Autores

- 🍛[Danilo Vaz](https://github.com/danilovaz7)
- 🫏[Enzo Fonseca](https://github.com/EnzoFonseca04)
- 🏳️‍🌈[Isabela Masseli](https://github.com/joaocastro95)
- 🐂[João Castro](https://github.com/joaocastro95)
- 🕯️[Pedro Vella](https://github.com/PedroVella)