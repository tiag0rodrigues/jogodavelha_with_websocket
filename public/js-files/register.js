let input_login = document.getElementById('login')
let input_password = document.getElementById('password')
let form = document.getElementById('form')

input_login.addEventListener("input", function(event){
    //event.preventDefault()
    
    document.getElementById('invalid-login').style.display = 'none'
    let dados = {
        input_login: input_login.value,
        input_password: input_password.value
    }
    console.log(input_login.value)
    fetch('https://jogodavelhacomws.onrender.com/api/read/login/users', {
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
        if(data == 0){
            document.getElementById('invalid-login').style.display = 'none'
        }else{
            document.getElementById('invalid-login').style.display = 'block'
        }
    });
})

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    let dados = {
        input_login: input_login.value,
        input_password: input_password.value
    }
    fetch('https://jogodavelhacomws.onrender.com/api/create/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    document.location.href = '/'
})
