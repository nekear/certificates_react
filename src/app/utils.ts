export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Checks if a given value is considered "filled".
 * A filled value is not null, not undefined, not an empty array, and if stringChecker is true, not an empty or whitespace-only string.
 *
 * @param value - The value to check.
 * @param stringChecker - Whether to consider empty or whitespace-only strings as not filled. Defaults to true.
 * @returns True if the value is considered filled, otherwise false.
 *
 * @example
 * isFilledValue(null); // false
 * isFilledValue("   "); // false
 * isFilledValue(0); // true
 * isFilledValue("hello"); // true
 * isFilledValue([], false); // false
 */
export function isFilledValue(value: any, stringChecker = true) {
  return (value != null && value != undefined) && (Array.isArray(value) ? value.length > 0 : true) && (stringChecker ? typeof value === "string" ? value.trim().length > 0 : true : true);
}

/**
 * Removes empty properties from an object.
 *
 * @param obj - The object from which to remove empty properties.
 * @returns A new object with empty properties removed.
 *
 * @example
 * const input = { a: 1, b: "", c: null, d: undefined, e: [] };
 * const output = removeEmpty(input); // { a: 1 }
 */
export function removeEmpty<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => isFilledValue(value))) as T;
}

/**
 * This function serializes nested objects into a flat object with dot notation keys.
 * It handles both nested objects and arrays.
 *
 * @param {any} obj - The object to be serialized.
 * @param {string} [parentKey=''] - The parent key for nested objects. Default is an empty string.
 * @param {Object.<string, any>} [result={}] - The result object where the serialized values will be stored. Default is an empty object.
 * @returns {Object.<string, any>} - The resulting flat object with serialized values.
 */
export function serializeNestedObjects(obj: any, parentKey: string = '', result: {[key: string]: any} = {}): {[key: string]: any} {
  Object.keys(obj).forEach(key => {
    // Check if the current key is an array index or an object key
    const isArrayIndex = !isNaN(Number(key));
    const fullKey = parentKey ?
      (isArrayIndex ? `${parentKey}[${key}]` : `${parentKey}.${key}`)
      : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // If it's an array, pass the key as is (without conversion to dot notation)
      if (Array.isArray(obj[key])) {
        // @ts-ignore
        obj[key].forEach((item, index) => {
          if (typeof item === 'object' && item !== null) {
            serializeNestedObjects(item, `${fullKey}[${index}]`, result);
          } else {
            // Directly assign non-object values within an array
            result[`${fullKey}[${index}]`] = item;
          }
        });
      } else {
        // Recurse for nested objects
        serializeNestedObjects(obj[key], fullKey, result);
      }
    } else {
      // Assign non-object and non-array values directly
      result[fullKey] = obj[key];
    }
  });
  return result;
}