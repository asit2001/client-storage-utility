
import createClientStorage, { ClientStorage } from '../src/clientStorage';
import clientStorage  from '../src/clientStorage';
describe('createClientStorage', () => {
  let storage:ClientStorage;

  beforeEach(() => {
    storage = createClientStorage();
    // Reset storage before each test
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = '';
  });

  test('setItem and getItem for localStorage', () => {
    storage.setStorage('localStorage');
    storage.setItem('name', 'Alice');
    expect(storage.getItem('name')).toBe('Alice');
  });

  test('setItem and getItem for sessionStorage', () => {
    storage.setStorage('sessionStorage');
    storage.setItem('name', 'Bob');
    expect(storage.getItem('name')).toBe('Bob');
  });

  test('removeItem removes item from storage', () => {
    storage.setStorage('localStorage');
    storage.setItem('name', 'Alice');
    storage.removeItem('name');
    expect(storage.getItem('name')).toBe(null);
  });

  test('setItem and getItem for memoryStorage', () => {
    storage.setStorage('memoryStorage');
    storage.setItem("name","Alice");
    const newClientStorage = clientStorage();
    newClientStorage.setStorage("memoryStorage");
    newClientStorage.setItem("name","asit")
    expect(storage.getItem("name")).toEqual(newClientStorage.getItem("name"))
  });

  test('disallow keys not in allowedKeys', () => {
    const allowedKeys = ['name', 'age'] as const;
    storage = createClientStorage(allowedKeys);
    storage.setStorage('localStorage');

    expect(() => {
      storage.setItem('name', 'Alice');
    }).not.toThrow();

    expect(() => {
      storage.setItem('role', 'Admin');
    }).toThrowError("Key 'role' is not allowed.");
  });

  // Add more tests as needed...

});
