import { JSONValue, JSONObject, JSONArray } from './jsontypes';

/**
 * A pure TypeScript JSON parser that can parse a JSON string and return the corresponding JavaScript object.
 * @example
 * ```
 * const jsonString = '{"name": "Astolfo", "gender": ["Male","Femboy","Secret"], "age": null, "isStudent": true, "address": {"city": "Zurich"}}';
 * const parser = new JSONParser();
 * const parsedJSON = parser.parse(jsonString);
 * console.log(parsedJSON);
 * ```
 */
export default class JSONParser {
  /**
   * The current position in the input string.
   * @private
   */
  private pos: number = 0;

  /**
   * The input JSON string to be parsed.
   * @private
   */
  private input: string = '';

  /**
   * Parses a JSON string and returns the corresponding JavaScript object.
   * @param text - The JSON string to be parsed.
   * @returns The JavaScript object representation of the JSON string.
   * @throws {Error} If the JSON string is invalid or contains unexpected tokens.
   */
  public parse<T extends JSONValue = JSONValue>(text: string): T {
    this.pos = 0;
    this.input = text.trim();
    return this.readValue() as T;
  }

  /**
   * Reads and returns a JSON value from the input string.
   * @private
   * @returns The JSON value read from the input string.
   * @throws {Error} If the JSON string contains unexpected tokens.
   */
  private readValue(): JSONValue {
    this.consumeWhitespace();

    switch (this.nextChar()) {
      case '{':
        return this.readObject();
      case '[':
        return this.readArray();
      case '"':
        return this.readString();
      case '-':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return this.readNumber();
      case 't':
        return this.readTrue();
      case 'f':
        return this.readFalse();
      case 'n':
        return this.readNull();
      default:
        throw new Error(`Unexpected token at position ${this.pos}`);
    }
  }

  /**
   * Reads and returns a JSON object from the input string.
   * @private
   * @returns The JSON object read from the input string.
   * @throws {Error} If the JSON string contains unexpected tokens or is malformed.
   */
  private readObject(): JSONObject {
    this.consumeChar('{');
    const obj: JSONObject = {};

    while (this.nextChar() !== '}') {
      this.consumeWhitespace();
      const key = this.readString();
      this.consumeWhitespace();
      this.consumeChar(':');
      this.consumeWhitespace();
      const value = this.readValue();
      obj[key] = value;

      if (this.nextChar() === ',') {
        this.consumeChar(',');
      } else if (this.nextChar() !== '}') {
        throw new Error(`Unexpected token at position ${this.pos}`);
      }
    }
    this.consumeChar('}');
    return obj;
  }

  /**
   * Reads and returns a JSON array from the input string.
   * @private
   * @returns The JSON array read from the input string.
   * @throws {Error} If the JSON string contains unexpected tokens or is malformed.
   */
  private readArray(): JSONArray {
    this.consumeChar('[');
    const arr: JSONArray = [];

    while (this.nextChar() !== ']') {
      this.consumeWhitespace();
      const value = this.readValue();
      arr.push(value);

      if (this.nextChar() === ',') {
        this.consumeChar(',');
      } else if (this.nextChar() !== ']') {
        throw new Error(`Unexpected token at position ${this.pos}`);
      }
    }
    this.consumeChar(']');
    return arr;
  }

  /**
   * Reads and returns a JSON string from the input string.
   * @private
   * @returns The JSON string read from the input string.
   * @throws {Error} If the JSON string contains unexpected tokens or is malformed.
   */
  private readString(): string {
    this.consumeChar('"');
    let value = '';

    while (this.nextChar() !== '"') {
      value += this.nextChar();
      this.pos++;
    }
    this.consumeChar('"');
    return value;
  }

  /**
   * Reads and returns a JSON number from the input string.
   * @private
   * @returns The JSON number read from the input string.
   * @throws {Error} If the JSON string contains unexpected tokens or is malformed.
   */
  private readNumber(): number {
    let numStr = '';

    while ('0123456789+-.eE'.includes(this.nextChar())) {
      numStr += this.nextChar();
      this.pos++;
    }
    const num = parseFloat(numStr);

    if (isNaN(num)) {
      throw new Error(`Invalid number at position ${this.pos}`);
    }
    return num;
  }

  /**
   * Reads and returns a JSON true value from the input string.
   * @private
   * @returns `true`.
   * @throws {Error} If the JSON string contains unexpected tokens or is malformed.
   */
  private readTrue(): boolean {
    this.consumeString('true');
    return true;
  }

  /**
   * Reads and returns a JSON false value from the input string.
   * @private
   * @returns `false`.
   * @throws {Error} If the JSON string contains unexpected tokens or is malformed.
   */
  private readFalse(): boolean {
    this.consumeString('false');
    return false;
  }

  /**
   * Reads and returns a JSON null value from the input string.
   * @private
   * @returns `null`.
   * @throws {Error} If the JSON string contains unexpected tokens or is malformed.
   */
  private readNull(): null {
    this.consumeString('null');
    return null;
  }

  /**
   * Returns the next character in the input string.
   * @private
   * @returns The next character in the input string.
   */
  private nextChar(): string {
    return this.input.charAt(this.pos);
  }

  /**
   * Consumes the current character if it matches the provided one.
   * @private
   * @param char - The character to consume.
   * @throws {Error} If the current character does not match the provided one.
   */
  private consumeChar(char: string): void {
    if (this.nextChar() !== char) {
      throw new Error(`Expected "${char}" at position ${this.pos}`);
    }
    this.pos++;
  }

  /**
   * Consumes the expected string from the input.
   * @private
   * @param expected - The expected string to consume.
   * @throws {Error} If the input does not match the expected string.
   */
  private consumeString(expected: string): void {
    for (let i = 0; i < expected.length; i++) {
      if (this.nextChar() !== expected.charAt(i)) {
        throw new Error(`Expected "${expected}" at position ${this.pos}`);
      }
      this.pos++;
    }
  }

  /**
   * Consumes whitespace characters from the input.
   * @private
   */
  private consumeWhitespace(): void {
    while (/\s/.test(this.nextChar())) {
      this.pos++;
    }
  }
}
