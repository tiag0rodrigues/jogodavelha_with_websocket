function redirectToHome() {
    window.location.href = '/home';
}//não foi necessário utilizar

const form = document.getElementById('form_room');
const selectRoom = document.getElementById('select_room');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedRoom = selectRoom.value;
    localStorage.setItem('selectedRoom', selectedRoom);
    window.location.href = '/home';
});