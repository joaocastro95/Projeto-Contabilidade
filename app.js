import express from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { sequilize } from './db/connection.js';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from './models/User.js';
import router from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = sequilize; 
const app = express();
const PORT = 3000;

// Middleware de sessão
app.use(session({
    secret: 'seuSegredo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json());

// Configuração do bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

// Configuração do handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Pasta estática
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', router);

// Conexão com o banco de dados
db.authenticate().then(() => {
    console.log('Êxito na conexão com o banco de dados');
}).catch(err => {
    console.log("Ocorreu um erro na conexão", err);
});

// Rota principal
app.get('/', (req, res) => {
    res.render('index');
});

// Rota de cadastro
app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// Rota da home do usuário
app.get('/home', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('home', {
        user: req.session.user
    });
});

// Rota para perfil
app.get('/perfil', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('perfil', {
        user: req.session.user
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});



// Rota para autenticar login
app.get('/login/auth', async (req, res) => {
    const { email, password } = req.query;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log("Usuário não encontrado");
            return res.status(401).send("Usuário não encontrado");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("Senha incorreta");
            return res.status(401).send("Senha incorreta");
        }

        // Armazena as informações do usuário na sessão
        req.session.user = {
            id: user.Id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            createdAt: user.createdAt
        };
        
        console.log("Login bem-sucedido para:", email);
        res.redirect('/home');
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        res.status(500).send("Erro ao autenticar usuário");
    }
});

// Rota para atualizar o perfil
app.post('/perfil/update', async (req, res) => {
    const { email, emailNew, password } = req.body; // Captura os dados do body
    const userSession = req.session.user; // Obtém o usuário da sessão
    console.log(userSession);
    console.log(email, emailNew, password); // Verifica os dados recebidos

    if (!userSession || !userSession.email) {
        return res.status(401).send("Usuário não autenticado ou email da sessão não encontrado");
    }

    try {
        // Busca o usuário logado usando o email da sessão
        const user = await User.findOne({ where: { email: userSession.email } });

        if (!user) {
            console.log("Usuário não encontrado");
            return res.status(401).send("Usuário não encontrado");
        }

        // Verifica se o email antigo fornecido corresponde ao do banco de dados
        if (user.email !== email) {
            console.log("Email não corresponde ao cadastrado.");
            return res.status(401).send("Email incorreto");
        }

        // Verifica a senha usando bcrypt.compare
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            console.log("Senha incorreta.");
            return res.status(401).send("Senha incorreta");
        }

        // Atualiza o email do usuário
        await User.update(
            { email: emailNew }, // Atualiza com o novo email
            { where: { cpf: user.cpf } } // Usa o CPF do usuário para localizar
        );

        // Atualiza o email na sessão
        req.session.user.email = emailNew;

        console.log("Email atualizado com sucesso para:", emailNew);
        res.status(200).send("Email atualizado com sucesso!");
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).send("Erro ao atualizar perfil");
    }
});




// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor escutando a porta ${PORT}`);
});
