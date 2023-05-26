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

/*
function validateLogin(login){
    //
}*/

let input_login = document.getElementById('login')
let input_password = document.getElementById('password')
let form = document.getElementById('form')

form.addEventListener('submit', function(event){
    event.preventDefault()
    let dados = {
        input_login: input_login.value,
        input_password: input_password.value
    }
    fetch('https://54.158.253.130:3000/api/read/login/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        if(data==0){
            document.getElementById('invalid').style.display='block'
        }else{
            document.getElementById('invalid').style.display='none'
            fetch('https://54.158.253.130:3000/api/read/password/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                if(data==0){
                    document.getElementById('invalid').style.display='block'
                }else{
                    document.getElementById('invalid').style.display='none'
                    fetch('https://54.158.253.130:3000/api/login_session', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dados)
                    })
                    document.location.href = '/start'
                }
            })
        }
    })
})

