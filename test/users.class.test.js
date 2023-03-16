const Users = require('../src/model/users.class');
const User = require('../src/model/user.class');
const apiService = require('../src/apiservice');

let users, user1, user2

const USER_MOCKED = {
  "email": "mock@mocked.lan",
  "nick": "Mock",
  "id": 95
}
const OTHER_USER_MOCKED = {
  "email": "mock2@mocked.lan",
  "nick": "Other Mock",
  "id": 76
}

describe('Clase Users', () => {
  test('Existe la clase Users', () => {
		expect(Users).toBeDefined();
	})
})

describe('Clase Users', () => {
  beforeEach(() => {
    users = new Users()
  });
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  test('constructor crea el array en la propiedad data', () => {
    expect(users.data).toEqual([]);
  });
  
  test('addItem añade el nuevo usuario proporcionado por la BBDD', async () => {
    jest.spyOn(apiService.users, 'save').mockResolvedValue(USER_MOCKED);
    const newUser = await users.addItem({ email: USER_MOCKED.email, nick: USER_MOCKED.nick })
    expect(apiService.users.save).toHaveBeenCalledTimes(1);
    expect(users.data.length).toBe(1)
    expect(newUser).toBeInstanceOf(User)
    expect(newUser.id).toBe(USER_MOCKED.id);
    expect(newUser.email).toBe(USER_MOCKED.email);
    expect(newUser.nick).toBe(USER_MOCKED.nick);
  });

  test('addItem lanza una excepción si falla la BBDD', async () => {
    jest.spyOn(apiService.users, 'save').mockRejectedValue('DB error');
    await expect(users.addItem({ email: USER_MOCKED.email, nick: USER_MOCKED.nick })).rejects.toBe('DB error');
    expect(apiService.users.save).toHaveBeenCalledTimes(1);
    expect(users.data.length).toBe(0)
  });

  test('populateData añade un aray de usuarios', () => {
    const data = [
      { id:7, email: 'asd@asd.es', nick: 'dsa' },
      { id:3, email: 'usr@usr.es', nick: 'rsu' },
    ]
    const users = new Users()
    users.populateData(data)
    expect(users.data.length).toBe(2)
    for (let i in users.data) {
      expect(users.data[i]).toBeInstanceOf(User)
      for (let prop in users.data[i]) {
        expect(users.data[i][prop]).toBe(data[i][prop])
      }
    }
  });
})

describe('Clase Users', () => {
  beforeEach(async () => {
    users = new Users()
    jest.spyOn(apiService.users, 'save').mockResolvedValue(USER_MOCKED);
    await users.addItem({ email: USER_MOCKED.email, nick: USER_MOCKED.nick })
    jest.spyOn(apiService.users, 'save').mockResolvedValue(OTHER_USER_MOCKED);
    await users.addItem({ email: OTHER_USER_MOCKED.email, nick: OTHER_USER_MOCKED.nick })
  });
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  test('removeItem elimina un usuario si existe', async () => {
    jest.spyOn(apiService.users, 'delete').mockResolvedValue({});
    const userToRemove = await users.removeItem(OTHER_USER_MOCKED.id)
    expect(userToRemove).toEqual({});
    expect(users.data.length).toBe(1);
    expect(users.data[0].id).toBe(USER_MOCKED.id);
    await users.removeItem(USER_MOCKED.id)
    expect(users.data.length).toBe(0);
  });

  test('removeItem lanza una excepción si un usuario no existe', async () => {
    jest.spyOn(apiService.users, 'delete').mockRejectedValue('DB error');
    await expect(users.removeItem(100)).rejects.toBe('DB error');
    expect(users.data.length).toBe(2);
  });

  test('toString pinta correctamente los usuarios', () => {
    expect(users.toString()).toBe(`Usuarios (total ${users.data.length})
    - ${USER_MOCKED.nick} (${USER_MOCKED.id}) - ${USER_MOCKED.email}
    - ${OTHER_USER_MOCKED.nick} (${OTHER_USER_MOCKED.id}) - ${OTHER_USER_MOCKED.email}`)
  });

})
