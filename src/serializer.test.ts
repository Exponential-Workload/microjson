import JSONSerializer, { SerializerOptions, IndentCharacter } from './serializer';

// Test data
const jsonObject = {
  name: 'Astolfo',
  gender: ['Male', 'Femboy', 'Secret'],
  age: null,
  isStudent: true,
  address: { city: 'Zurich' },
};

// Test cases
describe('JSONSerializer', () => {
  it('should serialize JSON object with default options', () => {
    const serializer = new JSONSerializer({
      indentation: 2,
      indentUsing: IndentCharacter.Space,
    });

    const expectedOutput =
      `{
  "name": "Astolfo",
  "gender": [
    "Male",
    "Femboy",
    "Secret"
  ],
  "age": null,
  "isStudent": true,
  "address": {
    "city": "Zurich"
  }
}`;

    expect(serializer.serialize(jsonObject)).toEqual(expectedOutput);
  });

  it('should serialize JSON object with no indentation', () => {
    const serializer = new JSONSerializer({
      indentation: 0,
      indentUsing: IndentCharacter.None,
    });

    const expectedOutput = '{"name":"Astolfo","gender":["Male","Femboy","Secret"],"age":null,"isStudent":true,"address":{"city":"Zurich"}}';

    expect(serializer.serialize(jsonObject)).toEqual(expectedOutput);
  });

  it('should serialize JSON object with tab indentation', () => {
    const serializer = new JSONSerializer({
      indentation: 1,
      indentUsing: IndentCharacter.Tab,
    });

    const expectedOutput = `{
\t"name": "Astolfo",
\t"gender": [
\t\t"Male",
\t\t"Femboy",
\t\t"Secret"
\t],
\t"age": null,
\t"isStudent": true,
\t"address": {
\t\t"city": "Zurich"
\t}
}`;

    expect(serializer.serialize(jsonObject)).toEqual(expectedOutput);
  });

  it('should serialize JSON object with nested objects', () => {
    const serializer = new JSONSerializer({
      indentation: 2,
      indentUsing: IndentCharacter.Space,
    });

    const nestedObject = {
      prop1: 'value1',
      prop2: {
        nestedProp1: 'nestedValue1',
        nestedProp2: {
          deepNestedProp: 'deepNestedValue',
        },
      },
    };

    const expectedOutput =
      `{
  "prop1": "value1",
  "prop2": {
    "nestedProp1": "nestedValue1",
    "nestedProp2": {
      "deepNestedProp": "deepNestedValue"
    }
  }
}`;

    expect(serializer.serialize(nestedObject)).toEqual(expectedOutput);
  });
});
