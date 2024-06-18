 let verificarSenha = (password1, password2) =>{
    if(password1 === password2){
        return true;
    }
    return false
 }

//  let verificarEmail = (email) =>{
//     let regexEmail = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/i
//     if(email.test(regexEmail)){
//         return true;
//     }
//     return false
//  }

 module.exports = {verificarSenha};

 