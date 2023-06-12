import { io } from "./http.js";

let users_list = []

io.on('connection', (socket)=>{
    const playerId = socket.id
    console.log(`Player connected: ${playerId}`)

    socket.on('select_room', (data)=>{
        console.log(data)

        socket.join(data.room)

        const usersInRoom = users_list.find((user) => user.userName === data.userName && user.room === data.room)

        if(usersInRoom){
            usersInRoom.socket_id = socket.id
        }else{
            users_list.push({
                room: data.room,
                userName: data.userName,
                socket_id: socket.id
            })
        }

        console.log(users_list)
        
        io.to(data.room).emit('players', users_list)
    })

    socket.on('att', (data)=>{
        const storage = {
            room: data.room,
            userName: data.userName,
            id_click: data.id_click,
            vez: data.vez
        }

        //data_storage.push(storage)
        //envia para todos da sala excluindo quem ativou o evento
        socket.broadcast.to(data.room).emit('att', storage)

    })

    socket.on('logout', (data)=>{
        users_list = users_list.filter(item => !(item.room===data.room && item.userName===data.userName))
        console.log(users_list)
    })

    socket.on('restart', (data)=>{
        io.to(data.room).emit('restart', data)
    })

    socket.on('message', (data)=>{
        io.to(data.room).emit('message', data)
    })

    socket.on('room', (data)=>{
        io.to(data.room).emit('players_in', users_list)
    })
})

