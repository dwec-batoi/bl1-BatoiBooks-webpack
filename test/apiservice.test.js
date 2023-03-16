const apiService = require('../src/apiservice');

describe('API Service -> la API funciona', () => {
  const mockResponse = { funciona: true };
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );
  });
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  describe('users', () => {
    test('getAll devuelve los datos', async () => {
      const users = await apiService.users.getAll();
      expect(users).toEqual(mockResponse);
    });

    test('getById devuelve los datos', async () => {
      const users = await apiService.users.getById(4);
      expect(users).toEqual(mockResponse);
    });

    test('save devuelve los datos', async () => {
      const users = await apiService.users.save({});
      expect(users).toEqual(mockResponse);
    });

    test('delete devuelve los datos', async () => {
      const users = await apiService.users.delete(4);
      expect(users).toEqual(mockResponse);
    });
  });

  describe('modules', () => {
    test('getAll devuelve los datos', async () => {
      const modules = await apiService.modules.getAll();
      expect(modules).toEqual(mockResponse);
    });

    test('getByCode devuelve los datos', async () => {
      const modules = await apiService.modules.getByCode('4');
      expect(modules).toEqual(mockResponse);
    });
  });

  describe('books', () => {
    test('getAll devuelve los datos', async () => {
      const books = await apiService.books.getAll();
      expect(books).toEqual(mockResponse);
    });

    test('getById devuelve los datos', async () => {
      const books = await apiService.books.getById(4);
      expect(books).toEqual(mockResponse);
    });

    test('save devuelve los datos', async () => {
      const books = await apiService.books.save({});
      expect(books).toEqual(mockResponse);
    });

    test('delete devuelve los datos', async () => {
      const books = await apiService.books.delete(4);
      expect(books).toEqual(mockResponse);
    });
  });
});

describe('API Service -> la API devuelve not ok', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 468,
        json: () => Promise.reject('Error'),
      })
    );
  });
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  describe('users', () => {
    test('getAll lanza una excepción si la API devuelve not ok', async () => {
      await expect(apiService.users.getAll()).rejects.toMatch('468');
    });

    test('getById lanza una excepción si la API devuelve not ok', async () => {
      await expect(apiService.users.getById(4)).rejects.toMatch('468');
    });

    test('save lanza una excepción si la API devuelve not ok', async () => {
      await expect(apiService.users.save({})).rejects.toMatch('468');
    });

    test('delete lanza una excepción si la API devuelve not ok', async () => {
      await expect(apiService.users.delete(4)).rejects.toMatch('468');
    });
  });

  describe('modules', () => {
    test('getAll lanza una excepción si la API devuelve not ok', async () => {
      await expect(apiService.modules.getAll()).rejects.toMatch('468');
    });

    test('getById lanza una excepción si la API devuelve not ok', async () => {
      await expect(apiService.modules.getByCode('4')).rejects.toMatch('468');
    });
  });

  describe('books', () => {
    test('getAll lanza una excepción si la API devuelve not ok', async () => {
      await expect(apiService.books.getAll()).rejects.toMatch('468');
    });

    test('getById lanza una excepción si la API devuelve not ok', async () => {
      await expect(apiService.books.getById(4)).rejects.toMatch('468');
    });

    test('save lanza una excepción si la API devuelve not ok', async () => {
      await expect(apiService.books.save({})).rejects.toMatch('468');
    });

    test('delete lanza una excepción si la API devuelve not ok', async () => {
      await expect(apiService.books.delete(4)).rejects.toMatch('468');
    });
  });
})

describe('API Service -> la API falla', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject('Revienta')
    );
  });
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  describe('users', () => {
    test('getAll falla la API', async () => {
      await expect(apiService.users.getAll()).rejects.toMatch('Revienta');
    });

    test('getById falla la API', async () => {
      await expect(apiService.users.getById(4)).rejects.toMatch('Revienta');
    });

    test('save falla la API', async () => {
      await expect(apiService.users.save({})).rejects.toMatch('Revienta');
    });

    test('delete falla la API', async () => {
      await expect(apiService.users.delete(4)).rejects.toMatch('Revienta');
    });
  });

  describe('modules', () => {
    test('getAll falla la API', async () => {
      await expect(apiService.modules.getAll()).rejects.toMatch('Revienta');
    });

    test('getById falla la API', async () => {
      await expect(apiService.modules.getByCode('4')).rejects.toMatch('Revienta');
    });
  });

  describe('books', () => {
    test('getAll falla la API', async () => {
      await expect(apiService.books.getAll()).rejects.toMatch('Revienta');
    });

    test('getById falla la API', async () => {
      await expect(apiService.books.getById(4)).rejects.toMatch('Revienta');
    });

    test('save falla la API', async () => {
      await expect(apiService.books.save({})).rejects.toMatch('Revienta');
    });

    test('delete falla la API', async () => {
      await expect(apiService.books.delete(4)).rejects.toMatch('Revienta');
    });
  });
})