function onChangeLogin(){
    toggleLoginErrors()
}

function onChangePassword(){
    togglePasswordErrors()
}

function toggleLoginErrors(){
    const login = document.getElementById('login').value
    console.log(login)
    if(!login){//se campo login vazio
        document.getElementById('login-required-error').style.display="block"
    }else{//se campo login preenchido
        document.getElementById('login-required-error').style.display='none'
    }
}

function togglePasswordErrors(){
    const password = document.getElementById('password').value
    if(!password){//se campo password vazio
        document.getElementById('password-required-error').style.display = 'block'
    }else{//se campo password preenchido
        document.getElementById('password-required-error').style.display = 'none'
    }
}


