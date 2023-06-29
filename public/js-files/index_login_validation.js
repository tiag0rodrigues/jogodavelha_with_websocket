let input_login = document.getElementById('login')
let input_password = document.getElementById('password')
let form = document.getElementById('form')

form.addEventListener('submit', function(event){
    event.preventDefault()
    localStorage.setItem('userName', input_login.value);
    let dados = {
        input_login: input_login.value,
        input_password: input_password.value
    }
    fetch('https://jogo-da-velha-ws.onrender.com/api/read/login/users', {
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
            fetch('https://jogo-da-velha-ws.onrender.com/api/read/password/users', {
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
                    fetch('https://jogo-da-velha-ws.onrender.com/api/login_session', {
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