import express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Teste de rota
router.get('/test', (req, res) => {
    res.send('AEEE MEU FI');
});

// Adicionar usuário
router.post('/add', async (req, res) => {
    let { name, email, password, cpf, passwordConfirm } = req.body;

    

    // Verifica se as senhas coincidem
    if (password !== passwordConfirm) {
        console.log('Erro no cadastro: senhas não coincidem');
        return ;
    }
   
    const existingUserEmail = await User.findOne({ where: { email } });
    const existingUserCPF = await User.findOne({ where: { cpf } });
    
    if (existingUserEmail || existingUserCPF) {
        console.log('Erro no cadastro: usuário já cadastrado!');
        return;
    }
    
    // Hasheia a senha antes de armazená-la
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        name,
        email,
        password: hashedPassword,
        cpf
    });
    console.log(password)
});

export default router;
