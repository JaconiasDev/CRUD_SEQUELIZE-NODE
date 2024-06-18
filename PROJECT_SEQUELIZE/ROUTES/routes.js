const express = require('express');
const rounters = express.Router();
const {
    getAlluser,
    createUser,
    updateUser,
    deleteUser,
    getOneUser,
    getOneUserlogin,
    queryDB
} = require('../SERVICE/service');
const jwt = require('jsonwebtoken');
const cookieParse = require('cookie-parser');
require('dotenv').config();

const {verificarSenha} = require("../SERVICE/verificacoes");

rounters.get('/form',(req,res)=>{
    res.render('formulario');
})

rounters.get('/login',(req,res)=>{
    res.render('login');
})

rounters.get('/protect',(req,res)=>{
    let cookieToken = req.cookies.token;
    if(cookieToken){
      let token = jwt.verify(cookieToken,process.env.SECRETE_TOKEN);
      res.render('home_protect',{token});
    }
    res.status(404).render('404');

})

rounters.post('/dados', async (req,res)=>{
    let vericacaoPass = verificarSenha(req.body.senha,req.body.senha2);
    // let verificacoesEmail = verificarEmail(req.body.email);
    let pop4 = false;

    if(!vericacaoPass){
        pop4 = true;
        res.render('formulario',{ pop4 });
        return;
    } 
    let verifyUserdb = await getOneUser(req.body.email);
    pop4 = false;
    let popUp = false;
    let popUp2 = false;

    if(verifyUserdb){
        popUp = true;
        popUp2 = false;
        res.render('formulario',{ popUp });
        return;
    } 
    popUp2 = true;
    res.render('formulario',{ popUp2 });
    createUser(req.body);
    return;
})

rounters.post('/loginTeste', async(req,res)=>{
    let pop = false;
    let {nome,email,senha} = req.body;
    let dados = await getOneUserlogin(email,senha);
    if(dados){
        let token = jwt.sign({nome:nome},process.env.SECRETE_TOKEN,{expiresIn:'1h'});
        res.cookie('token',token,{maxAge:90000, httpOnly:true});
        res.redirect('/tasks/protect');
    }
    pop = true;
    res.render('login',{ pop });
})

module.exports = rounters ;// nunca esquecer disso ! importar o modulo 




















