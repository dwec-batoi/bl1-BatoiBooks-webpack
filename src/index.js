'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno


// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {

  // función manejadora del formulario 'book-form'
  document.getElementById('book-form').addEventListener('submit', (event) => {
    event.preventDefault()

    const editorial = document.getElementById('editorial').value
    
    // Aquí llamamos al método del controlador para crear un nuevo libro
    // pasándole los datos del formulario
  })

  // función manejadora del formulario 'user-form'
})
