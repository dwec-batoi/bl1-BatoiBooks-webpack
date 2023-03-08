const Users = require('../src/model/users.class');

let users, user1, user2

describe('Clase users: constructor y addItem', () => {
	test('Existe la clase Users', () => {
		expect(Users).toBeDefined();
	});
  
  test('constructor crea el array en la propiedad data', () => {
    const users = new Users()
    expect(users.data).toEqual([]);
  });
  
  test('addItem añade un nuevo usuario', () => {
    const users = new Users()
    const newUser = users.addItem({ email: 'asd@asd.es', nick: 'dsa', password: '12' })
    expect(users.data.length).toBe(1)
    expect(newUser.id).toBeGreaterThanOrEqual(1);
    expect(newUser.email).toBe('asd@asd.es');
    expect(newUser.nick).toBe('dsa');
    expect(newUser.password).toBe('12');
  });
})

describe('Clase users: métodos', () => {
  beforeEach(() => {
    users = new Users()
    user1 = users.addItem({ email: 'asd@asd.es', nick: 'dsa', password: '12' })
    user2 = users.addItem({ email: 'usr@usr.es', nick: 'rsu', password: '1ko2' })
  })

  test('removeItem elimina un usuario si existe', () => {
    const userToRemove = users.removeItem(user2.id)
    expect(userToRemove).toEqual({});
    expect(users.data.length).toBe(1);
    users.removeItem(user1.id)
    expect(users.data.length).toBe(0);
  });

  test('removeItem lanza una excepción si un usuario no existe', () => {
    expect(() => users.removeItem(100)).toThrow();
    expect(users.data.length).toBe(2);
  });

  test('toString pinta correctamente los usuarios', () => {
    expect(users.toString()).toBe(`Usuarios (total ${users.data.length})
    - ${user1.nick} (${user1.id}) - ${user1.email}
    - ${user2.nick} (${user2.id}) - ${user2.email}`)
  });

})