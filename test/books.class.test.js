const Books = require('../src/model/books.class');
const Book = require('../src/model/book.class');
const apiService = require('../src/apiservice');

let books
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
});

describe('Clase Books', () => {
  beforeEach(() => {
    books = new Books()
  });
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
  
  test('constructor crea el array en la propiedad data', () => {
    expect(books.data).toEqual([]);
  });
  
  test('addItem añade un nuevo libro', async () => {
    const MOCKED_ID = 7
    jest.spyOn(apiService.books, 'save').mockResolvedValue({id: MOCKED_ID, ...data[0]});
    const newBook = await books.addItem(data[0])
    expect(books.data.length).toBe(1)
    expect(newBook).toBeInstanceOf(Book)
    expect(newBook.id).toBe(MOCKED_ID);
    for (let prop in data[0]) {
      expect(newBook[prop]).toBe(data[0][prop])
    }
    expect(newBook).toEqual(books.data[0])
  });

  test('populateData añade un array de libros', () => {
    const dataWithId = JSON.parse(JSON.stringify(data))
    dataWithId[0].id = 35
    dataWithId[1].id = 31
    dataWithId[2].id = 3
    books.populateData(dataWithId)
    expect(books.data.length).toBe(3)
    for (let i in dataWithId) {
      expect(books.data[i]).toBeInstanceOf(Book)
      expect(books.data[i].id).toBe(dataWithId[i].id)
      for (let prop in dataWithId[i]) {
        expect(books.data[i][prop]).toBe(dataWithId[i][prop])
      }
    }
  })

})

describe('Clase Books', () => {
  beforeEach(async () => {
    books = new Books()
    jest.spyOn(apiService.books, 'save').mockResolvedValue({id: 7, ...data[0]});
    await books.addItem(data[0])
    jest.spyOn(apiService.books, 'save').mockResolvedValue({id: 3, ...data[1]});
    await books.addItem(data[1])
  });
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  test('removeItem elimina un libro si existe', async () => {
    jest.spyOn(apiService.books, 'delete').mockResolvedValue({});
    const bookToRemove = await books.removeItem(3)
    expect(bookToRemove).toEqual({});
    expect(books.data.length).toBe(1);
    await books.removeItem(7)
    expect(books.data.length).toBe(0);
  });

  test('removeItem lanza una excepción si un libro no existe', async () => {
    jest.spyOn(apiService.books, 'delete').mockRejectedValue('DB error');
    await expect(books.removeItem(100)).rejects.toBe('DB error');
    expect(books.data.length).toBe(2);
  });

  test('incrementPriceOfbooks incrementa el precio un 10%', () => {
    books.incrementPriceOfbooks(0.1)
    expect(books.data.length).toBe(2);
    expect(books.data[0].price).toBe(30.8)
    expect(books.data[1].price).toBe(15.95)
  });

  test('toString pinta correctamente los libros', () => {
    expect(books.toString()).toBe(`Libros (total ${books.data.length})
    - ${data[0].idModule}. Editorial: ${data[0].publisher}. ${data[0].pages} páginas. ${data[0].price.toFixed(2)} €.
    - ${data[1].idModule}. Editorial: ${data[1].publisher}. ${data[1].pages} páginas. ${data[1].price.toFixed(2)} €.`)
  });
})

describe('Clase Books', () => {
  beforeEach(async () => {
    books = new Books()
    jest.spyOn(apiService.books, 'save').mockResolvedValue({id: 7, ...data[0]});
    await books.addItem(data[0])
    jest.spyOn(apiService.books, 'save').mockResolvedValue({id: 3, ...data[1]});
    await books.addItem(data[1])
    jest.spyOn(apiService.books, 'save').mockResolvedValue({id: 5, ...data[2]});
    await books.addItem(data[2])
  });
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

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
      expect(item.idModule).toBe('ABCD')
    }
  })

  test('booksFromModule devuelve un array vacío para el módulo ZZZZ', () => {
    const response = books.booksFromModule('ZZZZ')
    expect(response).toEqual([])
  })

  test('booksCheeperThan devuelve un array con los 2 libros de 50 € o menos', () => {
    const response = books.booksCheeperThan(50)
    expect(response.length).toBe(2)
    for (let item of response) {
      expect(item.price).not.toBeGreaterThan(50)
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

  test('averagePriceOfBooks devuelve 32.33 €', () => {
    const response = books.averagePriceOfBooks()
    expect(response).toBe('32.33 €')
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
      expect(item.phblisher).not.toBe('Apunts')
    }
  })
})
