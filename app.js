import express from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { sequilize } from './db/connection.js';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { Empresa } from './models/Empresas.js';
import { Registro } from './models/Registros.js';
import router from './routes/empresas.js';
import routerRegistro from './routes/registros.js';
import { Op, fn, col } from 'sequelize';

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
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    helpers: {
        abs: function (value) {
            return Math.abs(value); // Retorna o valor absoluto
        },
        eq: function (a, b) {
            return a === b; // Verifica se os valores são iguais
        }
    }
}));
app.set('view engine', 'handlebars');

// Pasta estática
app.use(express.static(path.join(__dirname, 'public')));

app.use('/empresas', router);
app.use('/registros', routerRegistro);

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
    if (!req.session.empresa) {
        return res.redirect('/login');
    }

    res.render('home', {
        empresa: req.session.empresa
    });
});

// Rota do diário do usuário
app.get('/diario', (req, res) => {
    if (!req.session.empresa) {
        return res.redirect('/login');
    }

    Registro.findAll({
        where: {
            id_empresa: req.session.empresa.id
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(registrosEmpresa => {
            const registrosFormatados = registrosEmpresa.map(registro => {
                const data = new Date(registro.createdAt);
                const ano = data.getFullYear();
                const mes = String(data.getMonth() + 1).padStart(2, '0');
                const dia = String(data.getDate()).padStart(2, '0');

                return {
                    ...registro,
                    createdAt: `${ano}-${mes}-${dia}`
                };
            });

            res.render('diario', {
                registrosEmpresa: registrosFormatados
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Erro ao buscar registros.');
        });
});

app.get('/balancete', async (req, res) => {
    if (!req.session.empresa) {
        return res.redirect('/login');
    }

    try {
        const registrosEmpresa = await Registro.findAll({
            where: {
                id_empresa: req.session.empresa.id
            },
            attributes: [
                'conta',
                [fn('SUM', col('debito')), 'total_debito'],
                [fn('SUM', col('credito')), 'total_credito']
            ],
            group: ['conta'],
            order: [['createdAt', 'DESC']]
        });

        const registrosComTotal = registrosEmpresa.map(registro => {
            const total_debito = parseFloat(registro.get('total_debito')) || 0;
            const total_credito = parseFloat(registro.get('total_credito')) || 0;
            const total = total_debito - total_credito;

            return {
                conta: registro.get('conta'),
                total_debito,
                total_credito,
                total,
                isPositive: total > 0,
                isNegative: total < 0,
                isZero: total == 0,
                isPL: registro.get('conta') === 'Capital Social'
            };
        });

      
        
            res.render('balancete', {
                registrosComTotal,
            });
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao buscar registros.');
    }
});


// Rota do lançamento de registros
app.get('/lancamento', (req, res) => {
    if (!req.session.empresa) {
        return res.redirect('/login');
    }
    res.render('lancamento', {
        empresa: req.session.empresa
    });
});

// Rota do razão de registros
app.get('/razao', async (req, res) => {
    if (!req.session.empresa) {
        return res.redirect('/login');
    }

    try {
        const registrosEmpresa = await Registro.findAll({
            where: {
                id_empresa: req.session.empresa.id
            },
            attributes: [
                'conta',
                [fn('SUM', col('debito')), 'total_debito'],
                [fn('SUM', col('credito')), 'total_credito']
            ],
            group: ['conta'],
            order: [['createdAt', 'DESC']]
        });

        res.render('razao', {
            registrosEmpresa
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao buscar registros.');
    }
});

// Rota do balancete de registros
app.get('/balanco', async (req, res) => {
    if (!req.session.empresa) {
        return res.redirect('/login');
    }

    try {
        const registrosEmpresa = await Registro.findAll({
            where: {
                id_empresa: req.session.empresa.id
            },
            attributes: [
                'conta',
                [fn('SUM', col('debito')), 'total_debito'],
                [fn('SUM', col('credito')), 'total_credito']
            ],
            group: ['conta'],
            order: [['createdAt', 'DESC']]
        });

        const registrosComTotal = registrosEmpresa.map(registro => {
            const total_debito = parseFloat(registro.get('total_debito')) || 0;
            const total_credito = parseFloat(registro.get('total_credito')) || 0;
            const total = total_debito - total_credito;

            return {
                conta: registro.get('conta'),
                total_debito,
                total_credito,
                total,
                isPositive: total > 0,
                isNegative: total < 0,
                isPL: registro.get('conta') === 'Capital Social'
            };
        });

      
        const totalAtivos = registrosComTotal
            .filter(registro => registro.isPositive && registro.conta !== 'Capital Social')
            .reduce((sum, registro) => sum + registro.total, 0); 

        const totalPassivos = registrosComTotal
            .filter(registro => registro.isNegative) 
            .reduce((sum, registro) => sum + registro.total, 0); 

        const totalPatrimonioLiquido = registrosComTotal
            .filter(registro => registro.isPL)
            .reduce((sum, registro) => sum + registro.total, 0); 

            res.render('balanco', {
                registrosComTotal,
                totalAtivos,
                totalPassivos,
                totalPatrimonioLiquido 
            });
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao buscar registros.');
    }
});



// Rota para perfil
app.get('/perfil', (req, res) => {
    if (!req.session.empresa) {
        return res.redirect('/login');
    }

    res.render('perfil', {
        empresa: req.session.empresa
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

// Rota para autenticar login
app.get('/login/auth', async (req, res) => {
    const { email, password } = req.query;

    try {
        const empresa = await Empresa.findOne({ where: { email } });

        if (!empresa) {
            console.log("Usuário não encontrado");
            return res.status(401).send("Usuário não encontrado");
        }

        const isMatch = await bcrypt.compare(password, empresa.password);

        if (!isMatch) {
            console.log("Senha incorreta");
            return res.status(401).send("Senha incorreta");
        }

        req.session.empresa = {
            id: empresa.id,
            name: empresa.name,
            email: empresa.email,
            cnpj: empresa.cnpj,
            createdAt: empresa.createdAt
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
    const { email, emailNew, password } = req.body;
    const empresaSession = req.session.empresa;
    console.log(empresaSession);
    console.log(email, emailNew, password);

    if (!empresaSession || !empresaSession.email) {
        return res.status(401).send("Usuário não autenticado ou email da sessão não encontrado");
    }

    try {
        const empresa = await Empresa.findOne({ where: { email: empresaSession.email } });

        if (!empresa) {
            console.log("Usuário não encontrado");
            return res.status(401).send("Usuário não encontrado");
        }

        if (empresa.email !== email) {
            console.log("Email não corresponde ao cadastrado.");
            return res.status(401).send("Email incorreto");
        }

        const isMatch = await bcrypt.compare(password, empresa.password);
        if (!isMatch) {
            console.log("Senha incorreta.");
            return res.status(401).send("Senha incorreta");
        }

        const empresaEmaiExists = await Empresa.findOne({ where: { email: emailNew } });
        if (empresaEmaiExists) {
            console.log("Usuário já possui este email");
            return res.status(401).send("Usuário já possui este email");
        }

        await Empresa.update(
            { email: emailNew },
            { where: { cnpj: empresa.cnpj } }
        );

        req.session.empresa.email = emailNew;

        console.log("Email atualizado com sucesso para:", emailNew);
        res.status(200).send("Email atualizado com sucesso!");
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).send("Erro ao atualizar perfil");
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`);
});
