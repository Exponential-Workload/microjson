import { JSONArray, JSONObject, JSONValue } from './jsontypes';

/**
  * Characters to use for indentation.
  */
export enum IndentCharacter {
  Space = ' ',
  None = '',
  Tab = '\t',
}

/**
  * The options for customizing the JSON serialization format.
  */
export type SerializerOptions = {
  /**
    * The number of spaces or tabs to use for indentation.
    */
  indentation: number;
  /**
    * The character to use for indentation.
    */
  indentUsing: IndentCharacter;
};

/**
 * A pure TypeScript JSON serializer that can serialize a JavaScript object into a JSON string
 * with custom formatting options.
 * @example
 * ```
 * const jsonObject = {
 *   name: 'Astolfo',
 *   gender: ['Male', 'Femboy', 'Secret'],
 *   age: null,
 *   isStudent: true,
 *   address: { city: 'Zurich' },
 * };
 *
 * const options: SerializerOptions = {
 *   indentation: 2,
 *   indentUsing: IndentCharacter.Space,
 * };
 *
 * const serializer = new JSONSerializer(options);
 * const serializedJSON = serializer.serialize(jsonObject);
 * console.log(serializedJSON);
 * ```
 */
export default class JSONSerializer {
  /**
   * The options for customizing the JSON serialization format.
   */
  public options: SerializerOptions = {
    indentation: 2,
    indentUsing: IndentCharacter.Space,
  };

  /**
   * Creates a new instance of the JSONSerializer class.
   * @param options - The options for customizing the JSON serialization format.
   */
  constructor(options?: Partial<SerializerOptions>) {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  /**
   * Serializes a JavaScript object into a JSON string with custom formatting.
   * @param value - The JavaScript object to be serialized.
   * @returns The JSON string representation of the provided JavaScript object.
   */
  serialize(value: JSONValue): string {
    return this.writeValue(value, 0);
  }

  /**
   * Recursively serializes a JSON value based on its type.
   * @private
   * @param value - The JSON value to be serialized.
   * @param currentIndent - The current indentation level.
   * @returns The JSON string representation of the provided JSON value.
   */
  private writeValue(value: JSONValue, currentIndent: number): string {
    if (value === null) {
      return 'null';
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      return value.toString();
    } else if (typeof value === 'string') {
      return JSON.stringify(value);
    } else if (Array.isArray(value)) {
      return this.writeArray(value, currentIndent);
    } else if (typeof value === 'object') {
      return this.writeObject(value, currentIndent);
    } else {
      throw new Error('Unsupported data type in JSON value.');
    }
  }

  /**
   * Serializes a JSON object into a formatted JSON string.
   * @private
   * @param obj - The JSON object to be serialized.
   * @param currentIndent - The current indentation level.
   * @returns The JSON string representation of the provided JSON object.
   */
  private writeObject(obj: JSONObject, currentIndent: number): string {
    const { indentUsing, indentation } = this.options;
    const indentStr = indentUsing === IndentCharacter.None ? '' : indentUsing.repeat(indentation);

    let result = '{';
    let isFirst = true;

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const serializedValue = this.writeValue(value, currentIndent + 1); // Adjusted indentation

        if (!isFirst) {
          result += ',';
        }

        if (indentUsing !== IndentCharacter.None) {
          result += `\n${indentStr.repeat(currentIndent + 1)}`; // Adjusted indentation
        }

        result += `"${key}":${indentUsing === IndentCharacter.None ? '' : ' '}${serializedValue}`;
        isFirst = false;
      }
    }

    if (indentUsing !== IndentCharacter.None) {
      result += `\n${indentStr.repeat(currentIndent)}`;
    }

    result += '}';
    return result;
  }

  /**
   * Serializes a JSON array into a formatted JSON string.
   * @private
   * @param arr - The JSON array to be serialized.
   * @param currentIndent - The current indentation level.
   * @returns The JSON string representation of the provided JSON array.
   */
  private writeArray(arr: JSONArray, currentIndent: number): string {
    const { indentUsing, indentation } = this.options;
    const indentStr = indentUsing === IndentCharacter.None ? '' : indentUsing.repeat(indentation);

    let result = '[';
    let isFirst = true;

    for (const value of arr) {
      const serializedValue = this.writeValue(value, currentIndent + 1); // Adjusted indentation

      if (!isFirst) {
        result += ',';
      }

      if (indentUsing !== IndentCharacter.None) {
        result += `\n${indentStr.repeat(currentIndent + 1)}`; // Adjusted indentation
      }

      result += serializedValue;
      isFirst = false;
    }

    if (indentUsing !== IndentCharacter.None) {
      result += `\n${indentStr.repeat(currentIndent)}`;
    }

    result += ']';
    return result;
  }
}
