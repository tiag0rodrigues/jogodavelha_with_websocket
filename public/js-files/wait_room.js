const socket = io()

const room = localStorage.getItem('selectedRoom')
const userName = localStorage.getItem('userName')

socket.on('connect', ()=>{
    console.log('conectado sala de espera')
})

socket.emit('select_room', {
    userName,
    room,
})

socket.on('players', (data)=>{
    const list_players = document.getElementById('users_in_room')
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

export {socket}