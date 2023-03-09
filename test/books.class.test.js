const Books = require('../src/model/books.class');
const Book = require('../src/model/book.class');

let books, book1, book2, book3
const data = [
  {
    idUser: 2,
    idModule: 'ABCD',
    publisher: "Apunts",
    price: 28,
    pages: 76,
    status: "bad",
    soldDate: "2023-03-25"
  },
  {
    idUser: 2,
    idModule: 'AAAA',
    publisher: "McGraw-Hill",
    price: 14.5,
    pages: 36,
    status: "bad",
  },
  {
    idUser: 6,
    idModule: 'ABCD',
    publisher: "Vértice",
    price: 54.5,
    pages: 26,
    status: "good",
  },
]

describe('Clase Books', () => {
	test('Existe la clase Books', () => {
		expect(Books).toBeDefined();
	});
  
  test('constructor crea el array en la propiedad data', () => {
    const books = new Books()
    expect(books.data).toEqual([]);
  });
  
  test('addItem añade un nuevo libro', () => {
    const books = new Books()
    const newBook = books.addItem(data[0])
    expect(books.data.length).toBe(1)
    expect(newBook).toBeInstanceOf(Book)
    expect(newBook.id).toBe(1);
    for (let prop in data[0]) {
      expect(newBook[prop]).toBe(data[0][prop])
    }
  });

  test('addItem asigna id consecutivas sin repetir', () => {
    const books = new Books()
    let newBook = books.addItem(data[0])
    expect(books.data.length).toBe(1)
    expect(newBook.id).toBe(1);
    newBook = books.addItem(data[1])
    expect(books.data.length).toBe(2)
    expect(newBook.id).toBe(2);
  });

  test('populateData añade un array de libros', () => {
    const dataWithId = data.slice()
    dataWithId[0].id = 35
    dataWithId[0].id = 31
    const books = new Books()
    books.populateData(data)
    expect(books.data.length).toBe(2)
    for (let i in data) {
      expect(books.data[i]).toBeInstanceOf(Book)
      expect(books.data[i].id).toBe(dataWithId[i].id)
      for (let prop in data[i]) {
        expect(books.data[i][prop]).toBe(data[i][prop])
      }
    }
  })

  test('addItem asigna id a partir de la última existente', () => {
    const dataWithId = data.slice()
    dataWithId[0].id = 35
    dataWithId[0].id = 31
    const books = new Books()
    books.populateData(dataWithId)
    let newUser = books.addItem(data[1])
    expect(books.data.length).toBe(3)
    expect(newUser.id).toBe(36);
  });
})

describe('Clase Books', () => {
  beforeEach(() => {
    books = new Books()
    book1 = books.addItem(data[0])
    book2 = books.addItem(data[1])
  })

  test('removeItem elimina un libro si existe', () => {
    const bookToRemove = books.removeItem(book2.id)
    expect(bookToRemove).toEqual({});
    expect(books.data.length).toBe(1);
    books.removeItem(book1.id)
    expect(books.data.length).toBe(0);
  });

  test('incrementPriceOfbooks incrementa el precio un 10%', () => {
    books.incrementPriceOfbooks(0.1)
    expect(books.data.length).toBe(2);
    expect(books.data[0].price).toBe(30.8)
    expect(books.data[1].price).toBe(15.95)
  });

  test('removeItem lanza una excepción si un libro no existe', () => {
    expect(() => books.removeItem(100)).toThrow();
    expect(books.data.length).toBe(2);
  });

  test('toString pinta correctamente los libros', () => {
    expect(books.toString()).toBe(`Libros (total ${books.data.length})
    - ${book1.idModule}. Editorial: ${book1.publisher}. ${book1.pages} páginas. ${book1.price.toFixed(2)} €.
    - ${book2.idModule}. Editorial: ${book2.publisher}. ${book2.pages} páginas. ${book2.price.toFixed(2)} €.`)
  });
})

describe('Clase Books', () => {
  beforeAll(() => {
    books = new Books()
    book1 = books.addItem(data[0])
    book2 = books.addItem(data[1])
    book3 = books.addItem(data[2])
  })

  test('booksFromUser devuelve un array con los 2 libros del usuario 2', () => {
    const response = books.booksFromUser(2)
    expect(response.length).toBe(2)
    for (let item of response) {
      expect(item.idUser).toBe(2)
    }
  })

  test('booksFromUser devuelve un array vacío para el usuario 12', () => {
    const response = books.booksFromUser(12)
    expect(response).toEqual([])
  })

  test('booksFromModule devuelve un array con los 2 libros del módulo ABCD', () => {
    const response = books.booksFromModule('ABCD')
    expect(response.length).toBe(2)
    for (let item of response) {
      expect(item.idModule).toBe(2)
    }
  })

  test('booksFromModule devuelve un array vacío para el módulo ZZZZ', () => {
    const response = books.booksFromModule('ZZZZ')
    expect(response).toEqual([])
  })

  test('booksCheeperThan devuelve un array con los 2 libros de menos de 50 €', () => {
    const response = books.booksCheeperThan(50)
    expect(response.length).toBe(2)
    for (let item of response) {
      expect(item.price).toBeNotGreaterThanOrEqual(50)
    }
  })

  test('booksCheeperThan devuelve un array vacío para menos de 1 €', () => {
    const response = books.booksCheeperThan(1)
    expect(response).toEqual([])
  })

  test('booksWithStatus devuelve un array con los 2 libros del estado bad', () => {
    const response = books.booksWithStatus('bad')
    expect(response.length).toBe(2)
    for (let item of response) {
      expect(item.status).toBe('bad')
    }
  })

  test('booksWithStatus devuelve un array vacío para el estado new', () => {
    const response = books.booksWithStatus('new')
    expect(response).toEqual([])
  })

  test('averagePriceOfBooks devuelve 21.25 €', () => {
    const response = books.averagePriceOfBooks()
    expect(response).toBe('21.25 €')
    expect(response.publisher).toBe('Apunts')
  })

  test('booksOfTypeNote devuelve un array con el registro de apuntes', () => {
    const response = books.booksOfTypeNote()
    expect(response.length).toBe(1)
    expect(response[0].publisher).toBe('Apunts')
  })

  test('booksNotOfTypeNote devuelve un array con los 2 libro de editorial', () => {
    const response = books.booksNotOfTypeNote()
    expect(response.length).toBe(2)
    for (let item of response) {
      expect(item.phblisher).toBeNot('Apunts')
    }
  })
})
