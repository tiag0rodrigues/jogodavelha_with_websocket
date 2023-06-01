let input_login = document.getElementById('login')
let input_password = document.getElementById('password')
let form = document.getElementById('form')


form.addEventListener("submit", function(event){
    event.preventDefault()
    let dados = {
        input_login: input_login.value,
        input_password: input_password.value
    }
    fetch('http://127.0.0.1:3000/api/read/login/users', {
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
            document.getElementById('invalid-login').style.display = 'none'
            fetch('http://127.0.0.1:3000/api/create/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            document.location.href = '/'
        }else{
            document.getElementById('invalid-login').style.display = 'block'
        }
    });
})