//const jogadorAtual = document.querySelector(".joagdorAtual")

const jogadorAtual = window.document.getElementById('vezD')

let vez = 1;
let jogador = 'X'
jogadorAtual.innerHTML = `Jogador da vez: ${jogador}`
let count = 0;


function verificaVez(id){
    let a = window.document.getElementById(id)
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
    const array = new Array(10)
    for(i=0; i<9; i++){
        let a = i+1
        array[i] = window.document.getElementById(`${a}`)
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
        window.alert('Jogador 1 ganhou!');
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
            window.alert('Jogador 2 ganhou!');
        }else{
            if(count>=9) window.alert('deu velha')
        }
    }
    //location.reload()
}

//jogadorAtual.innerHTML = `Jogador da vez: ${vez}`
