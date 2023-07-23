import JSON from './polyfill';

describe('JSON utility class', () => {
  describe('parse', () => {
    it('should parse a valid JSON string', () => {
      const jsonString = '{"name": "Astolfo", "age": 24}';
      const parsed = JSON.parse(jsonString);
      expect(parsed).toEqual({ name: 'Astolfo', age: 24 });
    });

    it('should parse a valid JSON string with a reviver', () => {
      const jsonString = '{"age": 16, "dateOfBirth": "1993-07-23"}';
      const reviver = (key: any, value: any) => {
        if (key === 'dateOfBirth') {
          return new Date(value);
        }
        return value;
      };
      const parsed = JSON.parse(jsonString, reviver);
      expect(parsed).toEqual({ age: 16, dateOfBirth: '1993-07-23' });
    });
  });

  describe('stringify', () => {
    it('should convert a JavaScript value to a JSON string', () => {
      const data = { name: 'Alice', age: 25 };
      const jsonString = JSON.stringify(data);
      expect(jsonString).toEqual('{"name":"Alice","age":25}');
    });

    it('should throw an error when replacer is provided', () => {
      const data = { name: 'Bob', age: 35 };
      const replacer = (key: string, value: any) => {
        if (key === 'name') {
          return 'Secret';
        }
        return value;
      };
      expect(() => JSON.stringify(data, replacer)).toThrowError('replacer is not supported');
    });

    it('should include proper indentation in the JSON string', () => {
      const data = { name: 'Eve', age: 40 };
      const jsonString = JSON.stringify(data, null, 2);
      expect(jsonString).toEqual(`{
  "name": "Eve",
  "age": 40
}`);
    });
  });
});
