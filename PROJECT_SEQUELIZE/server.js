const express = require('express');
const app = express();
const path = require('path');
const rotas = require('./ROUTES/routes');
const exphbs = require('express-handlebars');
const cookieParse = require('cookie-parser')
require('dotenv').config();
//const {Sequelize,DataTypes,where} = require('sequelize');
app.use(cookieParse());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/tasks', rotas);

app.use(express.static(path.join(__dirname,'PUBLIC')));
app.engine('handlebars',exphbs.engine())
app.set('view engine' , 'handlebars');
app.set('VIEWS', path.join(__dirname,'VIEWS'));

app.get('/',(req,res)=>{
    res.render('home')
})

app.use((req,res,next)=>{
  res.render('404')
})

app.listen(4000,()=>{
  console.log('server running')
})