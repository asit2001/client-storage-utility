# Client Storage Utility

This package provides a flexible client-side storage manager for web applications. It allows you to easily manage data in different types of storage such as `localStorage`, `sessionStorage`, `memoryStorage`, and `cookieStorage`.

## Installation

You can install this package via npm:

```bash
npm install client-storage-utility
```

or via yarn:

```bash
yarn add client-storage-utility
```

## Usage

### Import

```javascript
import createClientStorage from 'client-storage-utility';
```

### Create Client Storage

```javascript
const clientStorage = createClientStorage();
```

### Set Storage Type

By default, the storage type is `sessionStorage`. You can change it as needed:

```javascript
clientStorage.setStorage('localStorage');
```

### Set Item

To store an item:

```javascript
clientStorage.setItem('key1', 'value1');
```

### Get Item

To retrieve an item:

```javascript
const value = clientStorage.getItem('key1');
console.log(value); // Output: value1
```

### Remove Item

To remove an item:

```javascript
clientStorage.removeItem('key1');
```

### Allowed Keys

You can also specify allowed keys when creating the storage:

```javascript
const allowedKeys = ['key1', 'key2', 'key3'];
const clientStorage = createClientStorage(allowedKeys);
```

This ensures that only specified keys can be used for storage operations.

### Allowed Keys using `const`

You can specify allowed keys when creating the storage as `const`:

```typescript
const allowedKeys = ['key1', 'key2', 'key3'] as const;
const clientStorage = createClientStorage(allowedKeys);
```

This ensures that only specified keys can be used for storage operations.

### Allowed Keys using Generics

Alternatively, you can use generics to specify allowed keys:

```typescript
const clientStorage = createClientStorage<'key1' | 'key2' | 'key3'>();
```

This approach provides type safety for allowed keys.

## Storage Types

- `localStorage`: Persistent storage that lasts across browser sessions.
- `sessionStorage`: Storage that is cleared when the page session ends.
- `memoryStorage`: In-memory storage useful for temporary data.
- `cookieStorage`: Storage using browser cookies.

### Custom Storage Types

You can also create custom storage types by extending the `StorageInterface`.

## Examples

### Storing Data

```javascript
clientStorage.setStorage('localStorage');
clientStorage.setItem('username', 'JohnDoe');
```

### Retrieving Data

```javascript
const username = clientStorage.getItem('username');
console.log(username); // Output: JohnDoe
```

### Removing Data

```javascript
clientStorage.removeItem('username');
```


## License

This package is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---