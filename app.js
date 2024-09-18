import express from 'express'
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
const Usuario = User;


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
  console.log('deu bom na conexao')
}).catch(err => {
  console.log("ocorreu um erro na conexao", err)
});


app.listen(PORT,() => {
  console.log("esta funfando 3000");
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



