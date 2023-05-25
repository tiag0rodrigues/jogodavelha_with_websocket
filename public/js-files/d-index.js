function onChangeLogin(){
    toggleLoginErrors()
}

function onChangePassword(){
    togglePasswordErrors()
}

function toggleLoginErrors(){
    const login = document.getElementById('login').value
    console.log(login)
    if(!login){
        document.getElementById('login-required-error').style.display="block"
    }else{
        document.getElementById('login-required-error').style.display='none'
    }
    /*
    if(validateLogin(login)){
        document.getElementById('login-invalid-error').style.display = 'none'
    }else{
        document.getElementById('login-invalid-error').style.display = 'block'
    }*/
}

function togglePasswordErrors(){
    const password = document.getElementById('password').value
    if(!password){
        document.getElementById('password-required-error').style.display = 'block'
    }else{
        document.getElementById('password-required-error').style.display = 'none'
    }
}

function validateLogin(login){
    //
}