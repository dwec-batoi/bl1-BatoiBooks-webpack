const Book = require('../src/model/book.class');

const payloadSold = {
  id: 31,
  publisher: "Apunts",
  price: 34,
  pages: 76,
  status: "bad",
  soldDate: "2023-03-25"
}

const payloadNotSold = {
  id: 31,
  publisher: "Apunts",
  price: 34,
  pages: 76,
  status: "bad",
}

const myUser = { id: 2, nick: 'prova', email: 'prova@asd.es', password: '12' }

const myModule = {
  code: 'ABCD',
  cliteral: 'Nuevo módulo',
  vliteral: 'Nou mòdul',
  idCourse: '12'
}

describe('Clase Book', () => {
  test('constructor crea un libro vendido', () => {
    const newBook = new Book(payloadSold, myUser, myModule)
    expect(newBook).toBeInstanceOf(Book)
    expect(newBook.id).toBe(payloadSold.id);
    expect(newBook.myUser).toEqual(payloadSold.myUser);
    expect(newBook.myModule).toEqual(payloadSold.myModule);
    expect(newBook.publisher).toBe(payloadSold.publisher);
    expect(newBook.price).toBe(payloadSold.price);
    expect(newBook.pages).toBe(payloadSold.pages);
    expect(newBook.status).toBe(payloadSold.status);
  });

  test('constructor crea un libro no vendido', () => {
    const newBook = new Book(payloadNotSold, myUser, myModule)
    expect(newBook).toBeInstanceOf(Book)
    expect(newBook.id).toBe(payloadSold.id);
    expect(newBook.myUser).toEqual(payloadSold.myUser);
    expect(newBook.myModule).toEqual(payloadSold.myModule);
    expect(newBook.publisher).toBe(payloadSold.publisher);
    expect(newBook.price).toBe(payloadSold.price);
    expect(newBook.pages).toBe(payloadSold.pages);
    expect(newBook.status).toBe(payloadSold.status);
    expect(newBook.soldDate).toBe('');
  });

  test('toString pinta correctamente el libro', () => {
    const newBook = new Book(payloadSold, myUser, myModule)
    expect(newBook.toString()).toBe('Nou mòdul. Editorial: Apunts. 76 páginas. 34.00 €.');
  });

})