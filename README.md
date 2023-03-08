# Bloc 1: Javascript. UT 2: Arrays
## Ejercicio 2.3 - BatoiBooks
Como parte de una aplicación para vendre libros de texto y apuntes vamos a hacer unas funciones para obtener determinados libros, así como datos de usuarios y de módulos. Los datos con los que trabaja la aplicación los tenemos en el fichero `datos.js` en una variable llamada `data` que contiene los siguientes campos:
- **courses**: son los distintos ciclos del centro. El campo _idFamily_ FK de la tabla _families_
- **families**: los departamentos
- **modules**: los distintos módulos que se estudian en cada ciclo. EL campo _idCourse_ es la FK de la tabla _courses_
- **sales**: donde se registran las ventas producidas
- **users**: datos de los usuarios registrados en la aplicación
- **books**: libros y apuntes en venta. Sus campos son:
  - _id_
  - _idUser_: FK de la tabla _users_
  - _idModule_: FK de la tabla _modules_
  - _publisher_: editorial que publica el libro. Si son apuntes su valor es "Apunts"
  - _price_: precio (numérico)
  - _pages_: páginas del libro/apuntes (numérico)
  - _status_: estado del libro que puede tomar uno de los valores "new", "good", "used", "bad"
  - _photo_: ruta a la foto
  - _comments_: comentarios
  - _solDate_: fecha de venta del libro, en formato YYYY-MM-DD. Si aún no está vendido este campo estará en blanco

Para poder pasar los tests a nuestro programa y comprobar si funciona repartiremos el código en 2 ficheros JS distintos dentro del directorio `/src`:
- **`index.js`**: es el programa principal que contiene los datos, hace llamadas a las funciones y muestra datos por la consola
- **`functions.js`**: este fichero contiene las funciones
  - **booksFromUser(array, number):array**: recibe el array de libros y la id de un usuario y devuelve el array con todos los libros de dicho usuario
  - **booksFromModule(array, string) : array**: recibe el array de libros y el código de un módulo y devuelve el array con todos los libros de dicho módulo
  - **booksCheeperThan(array, number) : array**: recibe el array de libros y un valor y devuelve el array con todos los libros cuyo precio es inferior o igual al valor pasado. Lo devuelve con 2 decimales
  - **booksWithStatus(array, string) : array **: recibe el array de libros y un estado ("new", "good", ...) y devuelve el array con todos los libros de dicho estado
  - **averagePriceOfBooks(array) : number**: recibe el array de libros y devuelve el precio medio de los mismos, con 2 decimales
  - **booksOfTypeNote(array) : array **: recibe el array de libros y devuelve un array con todos los que son apuntes
  - **booksNotOfTypeNote(array) : array**: como el anterior pero devuelve los que NO son apuntes
  - **incrementPriceOfbooks(array, number) : undefined**: recibe el array de libros y el porcentaje a incrementar (ej. 0,1 == 10%) y devuelve un array con los no vendidos
  - **getUserById(array, number) : object**: recibe el array de usuarios y una id y devuelve el usuario con dicha id
  - **getUserIndexById(array, number) : object**: igual pero devuelve la posición del usuario dentro del array _users_
  - **getUserByNickName(array, string) : object**: recibe el array de usuarios y un nombre de usuario (_nick_) y devuelve el usuario con dicho _nick_
  - **getModuleByCode(array, string) : object**: recibe el array de módulos y un código y devuelve el módulo con dicho código (campo _code_)
  - **getModuleIndexByCode(array, string) : object**: igual pero devuelve la posición del módulo dentro del array _modules_

Recuerda que para poder testear el código como en el ejercicio anterior al final del fichero debemos añadir la instrucción:

```javascript
module.exports = {
  booksFromUser,
  booksFromModule,
  booksCheeperThan,
  booksWithStatus,
  averagePriceOfBooks,
  booksOfTypeNote,
  booksNotOfTypeNote,
  booksNotSold,
  incrementPriceOfbooks,
  getUserById,
  getUserIndexById,
  getUserByNickName,
  getModuleByCode,
  getModuleIndexByCode
}
```

En el `index.js` mostraremos por consola:
- todos los libros del usuario 4
- todos los libros del módulo 5021 que están en buen estado ("good")
- incrementa un 10% el precio de los libros del módulo 5025 y mu

En el fichero _**index.html**_ deberemos enlazar los 3 scripts: primero el _datos.js_, luego el _functions.js_ y por último el _index.js_.

**IMPORTANTE**: no usaremos **ningún _for_** para recorrer los arrays. Siempre que sea posible usaremos _Functional Programming_.

**RECUERDA**: seguir haciendo todas las buenas prácticas que se indicaban en el ejercicio anterior.

**MUY IMPORTANTE**: pasa los tests para asegurarte aprobar este ejercicio.
