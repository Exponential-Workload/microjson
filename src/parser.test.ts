import JSONParser from './parser';

describe('JSONParser', () => {
  const parser = new JSONParser();

  test('should parse a valid JSON string', () => {
    const jsonString = '{"name": "Astolfo", "age": 18, "isStudent": true, "address": {"city": "Zurich"}}';
    const expectedObject = { "name": "Astolfo", "age": 18, "isStudent": true, "address": { "city": "Zurich" } };

    const parsedJSON = parser.parse(jsonString);
    expect(parsedJSON).toEqual(expectedObject);
  });

  test('should throw an error for an invalid JSON string', () => {
    const invalidJSONString = '{"name": "Astolfo", "age": 30, "isStudent": false, "address": {"city": "Berlin"}';
    expect(() => parser.parse(invalidJSONString)).toThrowError();
  });

  test('should handle nested arrays', () => {
    const jsonString = '{"name": "Alice", "hobbies": ["Reading", "Swimming", "Gaming"]}';
    const expectedObject = {
      name: 'Alice',
      hobbies: ['Reading', 'Swimming', 'Gaming'],
    };

    const parsedJSON = parser.parse<{
      name: string;
      hobbies: string[];
    }>(jsonString);
    expect(parsedJSON).toEqual(expectedObject);
  });

  test('should handle null values', () => {
    const jsonString = '{"name": "Bob", "age": null}';
    const expectedObject = {
      name: 'Bob',
      age: null,
    };

    const parsedJSON = parser.parse(jsonString);
    expect(parsedJSON).toEqual(expectedObject);
  });
});
