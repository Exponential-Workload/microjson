# MicroJSON
A JSON implementation quickly thrown together.

## Example
```ts
import { JSONParser, JSONSerializer } from '@3xpo/microjson';
const parser = new JSONParser();
console.log(parser.parse('{"hello": "world"}'));

// 

const serializer = new JSONSerializer();
console.log(serializer.serialize({ hello: 'world' }));
```

### As a polyfill
```ts
import JSON from '@3xpo/microjson/polyfill';
console.log(JSON.parse('{"hello": "world"}'));
console.log(JSON.stringify({ hello: 'world' }, null, 2));
```

## Documentation
For detailed documentation, see [@3xpo/microjson.expo.moe](https://microjson.expo.moe/modules.html).

## Attribution
Tests & JSDoc were written using ChatGPT because I'm lazy, however the core codebase is still mine.

## License
This project is licensed under the MIT license. See [LICENSE](https://microjson.expo.moe/LICENSE.txt) for more information.
