import express from 'express'
const router = express.Router()
import { User } from '../models/User.js';
const Usuario = User


router.get('/test', (req, res) => {
    res.send('AEEE MEU FI')
})

//adicionar user
router.post('/add', (req, res) => {

    let { name, email, password, cpf, newPassword } = req.body
    console.log(password)
    console.log(newPassword)
    if (password !== newPassword) {
        console.log('Erro no cadastro');
        return;
    }

    Usuario.create({
        name,
        email,
        password,
        cpf
    })
        .then(() => {
            res.redirect('/login')
        })
        .catch(err => console.log(err))

})




export default router;