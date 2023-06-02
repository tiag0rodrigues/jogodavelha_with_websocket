function redirectToHome() {
    window.location.href = '/home';
}//não foi necessário utilizar

const form = document.getElementById('form_room');
const selectRoom = document.getElementById('select_room');

form.addEventListener('submit', function(event) {
    event.preventDefault();//faz com que a ação padrão não seja executada
    const selectedRoom = selectRoom.value;
    localStorage.setItem('selectedRoom', selectedRoom);//add into localStorage
    window.location.href = '/start/wait_room';
});