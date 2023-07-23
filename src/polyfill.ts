import * as lib from './main';
import { IndentCharacter } from './serializer';

/**
 * JSON utility class that provides parse and stringify operations.
 */
export default class JSON {
  /**
   * Internal recursive function to walk through the parsed JSON object and apply the reviver function.
   *
   * @private
   * @param {any} value - The value to process.
   * @param {function} reviver - The reviver function that will be called for each key-value pair.
   * @returns {any} The processed value after applying the reviver function.
   */
  private static _walk(value: string | number | boolean | lib.JSONObject | lib.JSONArray | null, reviver: (arg0: string, arg1: any) => any): any {
    if (value && typeof value === 'object') {
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          // @ts-ignore
          value[key] = JSON._walk(value[key], reviver);
        }
      }
    }
    return reviver('', value);
  }

  /**
   * Parses a JSON string and optionally applies a reviver function to the result.
   *
   * @param {string} text - The JSON string to parse.
   * @param {(key: any, value: any) => any} [reviver] - The reviver function to apply to the parsed JSON.
   * @returns {any} The parsed JSON object.
   */
  public static parse(text: string, reviver?: (key: any, value: any) => any): any {
    const parser = new lib.JSONParser();
    const parsed = parser.parse(text);
    if (reviver) {
      return JSON._walk(parsed, reviver);
    }
    return parsed;
  }

  /**
   * Converts a JavaScript value to a JSON string.
   *
   * @param {any} value - The value to convert to JSON string.
   * @param {null | function} [replacer] - Not supported. Throws an error if provided.
   * @param {string | number} [space] - The indentation used for formatting the JSON string.
   * @returns {string} The JSON string representation of the value.
   */
  public static stringify(value: any, replacer?: null | ((key: string, value: any) => any), space?: string | number): string {
    if (replacer) {
      throw new Error('replacer is not supported');
    }
    const serializer = new lib.JSONSerializer({
      indentation: space === undefined ? 0 : typeof space === 'number' ? space : 1,
      indentUsing:
        space === undefined || space === 0 ? IndentCharacter.None : typeof space === 'string' ? (space === '\t' ? IndentCharacter.Tab : IndentCharacter.Space) : IndentCharacter.Space,
    });
    return serializer.serialize(value);
  }
}
