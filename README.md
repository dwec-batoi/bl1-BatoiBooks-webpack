# Bloc 1: Javascript. UT 2: Arrays
## Ejercicio 3.2 - Clases en BatoiBooks
Continuando con nuestra aplicación para vender libros de texto y apuntes vamos a construir las clases que usaremos en la aplicación. Recordad que los datos con los que trabaja la aplicación los tenemos en el fichero `datos.js` en una variable llamada `data`.

Como vamos a usar _webpack_ hemos cambiado el nombre de la carpeta con el código de `scripts` a `src` ya que _webpack_ compilará nuestro código y generará el fichero `/dist/main.js` que será en el vinculamos en el `index.html`.

Dentro de `/src` crearemos una carpeta llamada `model` donde crearemos las clases. Aunque deberíamos hacerlas ya todas, al menos vamos a hacer aquellas con las que estamos trabajando: book, books, user, users, module_ y _modules_. 

Las clases de objeto (_Book_, _User_ y _Module_) tendrán un constructor y un método `toString`. En la clase _Book_ en vez del campo _idUser_ y _idModule_ crearemos los campos _user_ y _module_ donde guardaremos el objeto correspondiente (los objetos usuario y módulo completos de ese libro)

Las clases de array (_Books_, _Users_ y _Modules_) tendrán:
- constructor para inicializar una propiedad llamada _data_ a un array vacío
- `addItem` para añadir un nuevo elemento
- `removeItem` para eliminar un elemento pasándole su _id_. Si no existe lanzará una excepción. Si intentamos eliminar un usuario o un módulo que tiene libros no se eliminará y también se lanzará una excepción
- `getItemById` al que se le pasa una _id_ y devuelve el elemento con dicha _id_ o un objeto vacío si no existe (para _users_ y _modules_ ya los tenemos hechos)
- `toString` para mosotrar su contenido (que llamará al `toString` de cada elemento)
- el resto de métodos hechos en el ejercicio anterior (`booksFromUser`, etc)

Al final de cada fichero de clase exportaremos la misma para poderla usar donde la necesitemos. En `book.class.js` será:
```javascript
class Book {
  ...
}

defaults.exports = Book
```

Y donde tengamos que usarla la importaremos, por ejemplo en `books.class.js`:
```javascript
const Book = require('./book.class')

class Books {
  constructor() {
    this.books = []
  }
  ...
    const newBook = new Book(...)
  ...
}

defaults.exports = Books
```

En el `index.js` lo que haremos es:
- importamos la variable _data_ del fichero `datos.js` (ya lo tenéis hecho)
- llenamos las clases _users_, _modules_ y _books_ con sus datos
- mostraremos por consola: 
  - todos los libros del módulo 5021 que están en buen estado ("good")
  - incrementa un 10% el precio de los libros del módulo 5025 y mu

En el fichero `index.html` ahora sólo deberemos enlazar el script generado por _webpack_: `/dist/main.js` y antes de poder comprobar los cambios en el navegador debemos compilar nuestro código con:
```bash
npx webpack --mode=development --watch 
```

Si ponemos la opción `--watch` esta consola se queda abierta y cada vez que guardemos un fichero se compila de nuevo automáticamente.

**MUY IMPORTANTE**: pasa los tests para asegurarte aprobar este ejercicio.
