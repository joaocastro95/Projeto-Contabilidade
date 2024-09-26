import express from 'express';
import { Empresa } from '../models/Empresas.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Teste de rota
router.get('/test', (req, res) => {
    res.send('AEEE MEU FI');
});

//busca a existencia do
router.get('/buscar', async (req, res) => {
    const { email, cnpj } = req.query;

    try {
        const emailExists = await Empresa.findOne({ where: { email } });
        const cnpjExists = await Empresa.findOne({ where: { cnpj } });

        res.json({
            emailExists: !!emailExists,
            cnpjExists: !!cnpjExists
        });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});


// Adicionar usuário
router.post('/add', async (req, res) => {
    let { name, email, password, cnpj, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
        console.log('Erro no cadastro: senhas não coincidem');
        return ;
    }
   
    const existingEmpresaEmail = await Empresa.findOne({ where: { email } });
    const existingEmpresaCNPJ = await Empresa.findOne({ where: { cnpj } });
    
    if (existingEmpresaEmail || existingEmpresaCNPJ) {
        console.log('Erro no cadastro: usuário já cadastrado!');
        return;
    }
    
   
    const hashedPassword = await bcrypt.hash(password, 10);

    await Empresa.create({
        name,
        email,
        password: hashedPassword,
        cnpj
    });
    console.log(password)
});

export default router;
