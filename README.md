# MicroJSON
A JSON implementation quickly thrown together.

## Example
```ts
import { JSONParser, JSONSerializer } from 'microjson';
const parser = new JSONParser();
console.log(parser.parse('{"hello": "world"}'));

// 

const serializer = new JSONSerializer();
console.log(serializer.serialize({ hello: 'world' }));
```

## Documentation
For detailed documentation, see [microjson.expo.moe](https://microjson.expo.moe/modules.html).

## License
This project is licensed under the MIT license. See [LICENSE](https://microjson.expo.moe/LICENSE.txt) for more information.
