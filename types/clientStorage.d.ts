export type StorageType = "localStorage" | "sessionStorage" | "memoryStorage" | "cookieStorage";
export interface StorageInterface {
    setItem(key: string, value: string): void;
    /**
     * Gets an item from the storage.
     * @param key - The key of the item to get.
     * @returns The stored value, or null if the key does not exist.
     */
    getItem(key: string): string | null;
    /**
     * Removes an item from the storage.
     * @param key - The key of the item to remove.
     */
    removeItem(key: string): void;
}
export type ClientStorage = ReturnType<typeof createClientStorage>;
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
declare function createClientStorage<AllowedKeys extends string>(allowedKeys?: readonly AllowedKeys[]): {
    setStorage: (storeName: StorageType) => void;
    setItem: <K extends AllowedKeys>(key: K, value: string) => void;
    /**
     * Gets an item from the storage.
     * @param {string} key - The key of the item to get.
     * @returns {string | null} The stored value, or null if the key does not exist.
     */
    getItem: <K_1 extends AllowedKeys>(key: K_1) => string | null;
    /**
    * Removes an item from the storage.
    * @param {string} key - The key of the item to remove.
    */
    removeItem: <K_2 extends AllowedKeys>(key: K_2) => void;
};
export default createClientStorage;
