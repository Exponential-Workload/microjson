/**
 * Represents a JSON value, which can be a string, number, boolean, null,
 * object, or an array.
 */
export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

/**
 * Represents a JSON object with key-value pairs.
 */
export interface JSONObject {
  [key: string]: JSONValue;
}

/**
 * Represents a JSON array containing JSON values.
 */
export interface JSONArray extends Array<JSONValue> { }
