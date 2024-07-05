const modal = document.querySelector('.modal-calendar');
const modalBackdrop = document.querySelector('.modal-backdrop');
const button = document.querySelector('.calendar-button');

// Función para abrir el modal
function openModal() {
    modal.style.display = 'block';
    modalBackdrop.style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    modal.style.display = 'none';
    modalBackdrop.style.display = 'none';
}

// Evento para abrir el modal al hacer clic en el botón
button.addEventListener('click', openModal);

// Evento para cerrar el modal al hacer clic en el fondo oscuro
modalBackdrop.addEventListener('click', closeModal);
