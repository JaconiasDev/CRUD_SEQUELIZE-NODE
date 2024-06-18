const {Sequelize, DataTypes} = require('sequelize');
const { Json } = require('sequelize/lib/utils');

const sequelize = new Sequelize('banco','root','jaconias',{
    dialect:'mysql',
    host:'localhost'
})
const queryDB = sequelize.define('conectados',{
        email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:false
        },
        senha:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:false
        },
        nome:{
        type: DataTypes.STRING,
        allowNull: false
        },
        nascimento:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
        }
    },{
        timestamps:false
});
    
    sequelize.sync()
    .then(() =>{
    console.log('conectou')
    })
    .catch(()=>{
    console.log('error connect')
    });


const getAlluser= async()=>{
 try{
    queryDB.findAll()
    .then(res =>{
        console.log(JSON.stringify(res,null ,2));
    })
    .catch(error=>{
        console.log(error)
    });
 }catch(error){
    console.log('error')
 }
}
const createUser= async(dados)=>{
 try{
    queryDB.create(dados).then(()=>{
        console.log('sucesso ao criar tasks');
    }).catch(()=>{
        console.log('erro ao criar tasks')
    })

 }catch(error){
    console.log('error')
 }
}
const updateUser= async(id,data)=>{
 try{
    queryDB.update({email:data.email,senha:data.senha},{
        where:{
            id
        }
    }).then(()=>{
        console.log('atualizado com sucesso')
    }).catch(()=>{
        console.log('erro ao atualizar dados!')
    })
 }catch(error){
    console.log('error')
 }
}
const deleteUser = async(id)=>{
try{
    queryDB.destroy({
        where:{
            id
        }
    }).then(()=>{
        console.log('sucesso ao deletar tasks')
    }).catch(()=>{
        console.log('error ao deletar tasks')
    })
}catch(error){
    console.log('erro delete')
}
}

const getOneUser= async(email)=>{
  try{
   let dados = await queryDB.findOne({
        attributes:['email'],
        where:{
            email:email
        }
    })
    if(dados){
       //JSON.stringify(verifyUserdb.get({plain:true}), null,2)
       return true;
    }
    return false

}catch(erro){
    console.log('error em obter dados especificos')
}
}

const getOneUserlogin= async(email,senha)=>{
    try{
     let dados = await queryDB.findOne({
          attributes:['email','senha'],
          where:{
              email:email,
              senha:senha
          }
      })
      if(dados){
         //JSON.stringify(verifyUserdb.get({plain:true}), null,2)
         return dados;
      }
      return false
  
  }catch(erro){
      console.log('error em obter dados especificos')
  }
  }


module.exports = {getAlluser,createUser,updateUser,deleteUser,getOneUser,getOneUserlogin,queryDB};


















