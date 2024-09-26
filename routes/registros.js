import express from 'express';
import { Registro } from '../models/Registros.js';


const routerRegistro = express.Router();

routerRegistro.get('/test', (req, res) => {
    res.send('aqui foi registro em ');
});

routerRegistro.post('/add', async (req, res) => {
    let {conta, debito, credito, id_empresa,historico} = req.body;
    
    console.log(conta, debito, credito, id_empresa,historico)

    await Registro.create({
        conta,
        debito,
        credito,
        id_empresa,
        historico
    });
    
});

export default routerRegistro;
