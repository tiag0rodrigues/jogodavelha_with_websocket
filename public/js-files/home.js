import { socket } from "./wait_room.js";

let array = new Array(10)
let jogadorAtual = document.getElementById('vezD')
let vez = 1; //1 = 'X' e 0 = 'O'
let jogador = 'X'//começa com o jogador X
jogadorAtual.innerHTML = `Jogador da vez: ${jogador}`
let count = 0;//contador 

//parte da conexão e uso do socket
const room = localStorage.getItem('selectedRoom')
const userName = localStorage.getItem('userName')
console.log(room, userName)

const sockets = socket

sockets.on('connect', ()=>{
    console.log('connectado')
})

for(let i=0; i<9; i++){
    let a = i+1
    document
        .getElementById(`${a}`)
        .addEventListener('click', (event)=>{
            let vez_ant = vez
            verificaVez(`${a}`)

            const data = {
                room: room,
                userName: userName,
                id_click: `${a}`,
                vez: vez_ant
            }

            sockets.emit('att', data)
        })
}

//logout event
document
.getElementById('logout_button')
.addEventListener('click', (event)=>{
    sockets.emit('logout', {
        room: room,
        userName: userName
    })
    window.location.href = '/start'
})

//restart event
document
.getElementById('restart_button')
.addEventListener('click', (event)=>{
    sockets.emit('restart', {
        room: room
    })
})

sockets.on('restart', (data)=>{
    f_restart()
    document.getElementById('restart_button').style.display = 'none'
})

function f_restart(){
    for(let i=1; i<=9; i++){
        document.getElementById(`${i}`).innerText = ''
    }
    vez = 1
    jogador = 'X'
    count = 0
    jogadorAtual.innerHTML = `Jogador da vez: ${jogador}`
}


//chat event
document
.getElementById('input_chat_text')
.addEventListener('keypress', (event=>{
    if(event.key === 'Enter'){
        const message = event.target.value
        console.log(message)
        const data = {
            room,
            userName,
            message
        }

        sockets.emit('message', data)

        event.target.value = ''
    }
}))

sockets.on('message', (data)=>{
    const messageDiv = document.getElementById('chat')

    messageDiv.innerHTML += `
        <div>
            ${data.userName}: ${data.message}
        </div>
    `
    messageDiv.scrollTop = messageDiv.scrollHeight
})

sockets.emit('room', {
    room
})

sockets.on('players_in', (data)=>{
    console.log(data)
    let list_players = document.getElementById('players')
    let newContent = '';
    let k=0
    for(let j=0; j<data.length; j++){
        if(data[j].room == room){
            newContent += `
                <div> 
                    player ${k+1}: ${data[`${k}`].userName}
                </div>
            `
            k++
        }
    }
    list_players.innerHTML = newContent
})

sockets.on('att', (data)=>{
    vez = data.vez
    verificaVez(data.id_click)
    console.log(data)
})


//parte das funções que geram a lógica do jogo
function verificaVez(id){
    let a = document.getElementById(id)
    if(vez==1){
        a.innerText = 'X'
        vez = 0
        jogadorAtual.innerHTML = `Jogador da vez: O`
    }else{
        a.innerText = 'O'
        vez = 1
        jogadorAtual.innerHTML = `Jogador da vez: X`
    }
    count++
    verificaGanhador()
}

function verificaGanhador(){
    let i=0
    for(i=0; i<9; i++){
        let a = i+1
        array[i] = document.getElementById(`${a}`)
    }
    // Verificar combinações de vitória
    document.getElementById('restart_button').style.display = 'none'
    if(
        (array[0].innerText == 'X' && array[1].innerText == 'X' && array[2].innerText == 'X') ||
        (array[3].innerText == 'X' && array[4].innerText == 'X' && array[5].innerText == 'X') ||
        (array[6].innerText == 'X' && array[7].innerText == 'X' && array[8].innerText == 'X') ||
        (array[0].innerText == 'X' && array[3].innerText == 'X' && array[6].innerText == 'X') ||
        (array[1].innerText == 'X' && array[4].innerText == 'X' && array[7].innerText == 'X') ||
        (array[2].innerText == 'X' && array[5].innerText == 'X' && array[8].innerText == 'X') ||
        (array[0].innerText == 'X' && array[4].innerText == 'X' && array[8].innerText == 'X') ||
        (array[2].innerText == 'X' && array[4].innerText == 'X' && array[6].innerText == 'X')
    ){
        alert('Jogador 1 ganhou!');
        document.getElementById('restart_button').style.display = 'block'
    }else{
        if(
            (array[0].innerText == 'O' && array[1].innerText == 'O' && array[2].innerText == 'O') ||
            (array[3].innerText == 'O' && array[4].innerText == 'O' && array[5].innerText == 'O') ||
            (array[6].innerText == 'O' && array[7].innerText == 'O' && array[8].innerText == 'O') ||
            (array[0].innerText == 'O' && array[3].innerText == 'O' && array[6].innerText == 'O') ||
            (array[1].innerText == 'O' && array[4].innerText == 'O' && array[7].innerText == 'O') ||
            (array[2].innerText == 'O' && array[5].innerText == 'O' && array[8].innerText == 'O') ||
            (array[0].innerText == 'O' && array[4].innerText == 'O' && array[8].innerText == 'O') ||
            (array[2].innerText == 'O' && array[4].innerText == 'O' && array[6].innerText == 'O')
        ){
            alert('Jogador 2 ganhou!');
            document.getElementById('restart_button').style.display = 'block'
        }else{
            if(count>=9){ 
                alert('deu velha')
                document.getElementById('restart_button').style.display = 'block'
            }
        }
        
    }
    //location.reload()
}
