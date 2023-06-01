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

const socket = io()

socket.on('connect', ()=>{
    console.log('connectado')
})

socket.emit('select_room', {
    userName,
    room,
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

            socket.emit('att', data)
        })
}

socket.on('att', (data)=>{
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
        }else{
            if(count>=9) alert('deu velha')
        }
    }
    //location.reload()
}
