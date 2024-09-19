import express from 'express'
import bcrypt from 'bcrypt';
import { sequilize } from './db/connection.js';
import exphbs from 'express-handlebars'
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/users.js'
import {User} from './models/User.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = sequilize; 
const app = express();
const PORT = 3000;

//bodyparser
app.use(bodyParser.urlencoded({extended: false}));

//handle bars
app.set('views',path.join(__dirname,'views'))
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

//static folder
app.use(express.static(path.join(__dirname, 'public')))

//db connection
db.authenticate().then(()=>{
  console.log('Êxito na conexão com o banco de dados')
}).catch(err => {
  console.log("ocorreu um erro na conexao", err)
});


app.listen(PORT,() => {
  console.log(`Servidos escutando a porta ${PORT}`);
})

// rotas do user
app.use('/users', router )

app.get('/', (req,res) => {
    res.render('index');
})

app.get('/cadastro',(req,res)=>{
    res.render('cadastro')
})

app.get('/home',(req,res)=>{
  res.render('home')
})

app.get('/perfil',(req,res)=>{
  res.render('perfil')
})

app.get('/login',(req,res)=>{
  res.render('login')
})

// para pagina de cadasro
app.get('/usuarios/buscar', async (req, res) => {
  const { email, cpf } = req.query; 

  try {
      const userByEmail = await User.findOne({ where: { email } });
      const userByCpf = await User.findOne({ where: { cpf } });

      res.json({
          emailExists: !!userByEmail,
          cpfExists: !!userByCpf
      });
  } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao buscar usuário");
  }
});

// para validar login
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
      console.log("Login bem-sucedido para:", email);
      res.redirect('/home');
  } catch (error) {
      console.error('Erro ao autenticar:', error);
      res.status(500).send("Erro ao autenticar usuário");
  }
});

