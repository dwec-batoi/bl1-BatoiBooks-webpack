const Book = require('../src/model/book.class');

const payloadSold = {
  id: 31,
  idUser: 2,
  idModule: 'ABCD',
  publisher: "Apunts",
  price: 34,
  pages: 76,
  status: "bad",
  soldDate: "2023-03-25"
}

const payloadNotSold = {
  id: 35,
  idUser: 2,
  idModule: 'ABCD',
  publisher: "Apunts",
  price: 34,
  pages: 76,
  status: "bad",
}

describe('Clase Book', () => {
  test('constructor crea un libro vendido', () => {
    const newBook = new Book(payloadSold)
    expect(newBook).toBeInstanceOf(Book)
    expect(newBook).toEqual(payloadSold)
  });

  test('constructor crea un libro no vendido', () => {
    const newBook = new Book(payloadNotSold)
    expect(newBook).toBeInstanceOf(Book)
    for (let prop in payloadSold) {
      expect(newBook[prop]).toBe(payloadSold[prop])
    }
    expect(newBook.soldDate).toBe('');
  });

  test('toString pinta correctamente el libro', () => {
    const newBook = new Book(payloadSold, myUser, myModule)
    expect(newBook.toString()).toBe('Nou mòdul. Editorial: Apunts. 76 páginas. 34.00 €.');
  });

})