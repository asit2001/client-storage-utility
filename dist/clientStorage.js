"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CookieStorage {
    constructor(cookieName) {
        if (CookieStorage.storage) {
            return CookieStorage.storage;
        }
        this.STORAGE_NAME = cookieName;
        CookieStorage.storage = this;
    }
    getUpdatedTime(numDays = 7) {
        const now = new Date();
        now.setTime(now.getTime() + numDays * 24 * 60 * 60 * 1000);
        return now.toUTCString();
    }
    setItem(key, value) {
        const expires = "expires=" + this.getUpdatedTime();
        const existingCookie = this.getItem();
        let cookieJson = {};
        if (existingCookie) {
            cookieJson = JSON.parse(existingCookie);
        }
        cookieJson[key] = value;
        let cookieStr = this.STORAGE_NAME + "=" + JSON.stringify(cookieJson) + ";";
        cookieStr += expires + ";path=/";
        document.cookie = cookieStr;
    }
    getItem() {
        const name = this.STORAGE_NAME + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookies = decodedCookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) == " ") {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }
    removeItem(key) {
        const expires = "expires=" + this.getUpdatedTime();
        const existingCookie = this.getItem();
        let cookieJson = {};
        if (existingCookie) {
            cookieJson = JSON.parse(existingCookie);
            delete cookieJson[key];
        }
        let cookieStr = this.STORAGE_NAME + "=" + JSON.stringify(cookieJson) + ";";
        cookieStr += expires + ";path=/";
        document.cookie = cookieStr;
    }
}
class MemoryStorage {
    constructor() {
        if (MemoryStorage.storage) {
            return MemoryStorage.storage;
        }
        this.memStorage = new Map();
        MemoryStorage.storage = this;
    }
    setItem(key, value) {
        var _a;
        (_a = this.memStorage) === null || _a === void 0 ? void 0 : _a.set(key, value);
    }
    getItem(key) {
        var _a;
        const value = (_a = this.memStorage) === null || _a === void 0 ? void 0 : _a.get(key);
        if (value) {
            return value;
        }
        return null;
    }
    removeItem(key) {
        var _a;
        (_a = this.memStorage) === null || _a === void 0 ? void 0 : _a.delete(key);
    }
}
/**
 * Creates a client storage instance with specified options.
 * @param {string[]} [allowedKeys] list of allowed keys. leave empty of for all strings
 * @example
 * // Create client storage instance
 * const allowKeys = ["key1","key2","key3"] as const
 * // add as const for type intellisense
 * const clientStorage = createClientStorage({ keys: ['key1', 'key2'] });
 *
 * // Set storage type. default storage is sessionStorage
 * clientStorage.setStorage('localStorage');
 *
 * // Set item
 * clientStorage.set('key1', 'value1');
 *
 * // Get item
 * const value = clientStorage.get('key1');
 * console.log(value); // Output: value1
 *
 * // Remove item
 * clientStorage.removeItem('key1');
 */
function createClientStorage(allowedKeys) {
    let storage = sessionStorage;
    let storageType = "sessionStorage";
    const STORAGE_NAME = "__react__storage";
    /**
   * Sets the storage type.
   * @param {StorageType} storeName - The type of storage to use. default  `sessionStorage`
   */
    function setStorage(storeName) {
        storageType = storeName;
        switch (storageType) {
            case "cookieStorage":
                storage = new CookieStorage(STORAGE_NAME);
                break;
            case "memoryStorage":
                storage = new MemoryStorage();
                break;
            case "localStorage":
                storage = localStorage;
                break;
            case "sessionStorage":
                storage = sessionStorage;
                break;
            default:
                storage = sessionStorage;
        }
    }
    function setItem(key, value) {
        if (allowedKeys && !allowedKeys.includes(key)) {
            throw new Error(`Key '${key}' is not allowed.`);
        }
        if (storageType === "memoryStorage" || storageType === "cookieStorage") {
            storage.setItem(key, value);
        }
        else {
            const storeValue = storage.getItem(STORAGE_NAME);
            let oldValue;
            if (storeValue) {
                oldValue = JSON.parse(storeValue);
                oldValue[key] = value;
                storage.setItem(STORAGE_NAME, JSON.stringify(oldValue));
            }
            else {
                storage.setItem(STORAGE_NAME, JSON.stringify({ [key]: value }));
            }
        }
    }
    /**
   * Gets an item from the storage.
   * @param {string} key - The key of the item to get.
   * @returns {string|null} The stored value, or null if the key does not exist.
   */
    function getItem(key) {
        if (allowedKeys && !allowedKeys.includes(key)) {
            throw new Error(`Key '${key}' is not allowed.`);
        }
        if (storageType === "memoryStorage" || storageType === "cookieStorage") {
            return storage.getItem(key);
        }
        const storageValue = storage.getItem(STORAGE_NAME);
        if (storageValue) {
            const parsedVAlue = JSON.parse(storageValue);
            return parsedVAlue[key] || null;
        }
        return null;
    }
    /**
   * Removes an item from the storage.
   * @param {string} key - The key of the item to remove.
   */
    function removeItem(key) {
        if (allowedKeys && !allowedKeys.includes(key)) {
            throw new Error(`Key '${key}' is not allowed.`);
        }
        if (storageType === "memoryStorage" || storageType === "cookieStorage") {
            storage.removeItem(key);
        }
        else {
            const storeValue = storage.getItem(STORAGE_NAME);
            if (storeValue) {
                const oldValue = JSON.parse(storeValue);
                delete oldValue[key];
                storage.setItem(STORAGE_NAME, JSON.stringify(oldValue));
            }
        }
    }
    /**
       * Returns an object with storage methods.
       * @returns {Object} An object with setStorage, setItem, getItem, and removeItem methods.
       */
    return {
        setStorage,
        setItem,
        /**
         * Gets an item from the storage.
         * @param {string} key - The key of the item to get.
         * @returns {string | null} The stored value, or null if the key does not exist.
         */
        getItem,
        /**
        * Removes an item from the storage.
        * @param {string} key - The key of the item to remove.
        */
        removeItem,
    };
}
exports.default = createClientStorage;
