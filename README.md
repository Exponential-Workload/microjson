<div align="center">

# MicroJSON

[![Build & Deploy](https://github.com/Exponential-Workload/microjson/actions/workflows/mkdocs.yml/badge.svg)](https://github.com/Exponential-Workload/microjson/actions/workflows/mkdocs.yml) [![Tests](https://github.com/Exponential-Workload/microjson/actions/workflows/test.yml/badge.svg)](https://github.com/Exponential-Workload/microjson/actions/workflows/test.yml)<br/>
[![documentation](https://img.shields.io/badge/-documentation-brightgreen.svg)](https://microjson.expo.moe/) [![npm](https://img.shields.io/badge/-npm-red.svg)](https://npm.im/@3xpo/microjson/) [![github](https://img.shields.io/badge/-github-blue.svg)](https://github.com/Exponential-Workload/microjson/tree/master)<br/>
[![mit license](https://img.shields.io/badge/license-mit-orange.svg)](https://microjson.expo.moe/LICENSE.txt) [![mom made pizza](https://img.shields.io/badge/type-safe-blue.svg)](https://typescriptlang.org/) [![mom made pizza](https://img.shields.io/badge/mom%20made-pizza-white.svg)](https://www.youtube.com/watch?v=iiASNxG4Mdg&list=PLsZdaL54kaMB6dhCuBe2Y34wWCiTrUAXe&index=21)

A JSON implementation quickly thrown together.

</div>

## Example
```ts
import { JSONParser, JSONSerializer } from '@3xpo/microjson';

// parser:
const parser = new JSONParser();
console.log(parser.parse('{"hello": "world"}'));

// serializer:
const serializer = new JSONSerializer();
console.log(serializer.serialize({ hello: 'world' }));
```

### As a polyfill
```ts
import JSON from '@3xpo/microjson/polyfill';
console.log(JSON.parse('{"hello": "world"}'));
console.log(JSON.stringify({ hello: 'world' }, null, 2));
```

## Attribution
Tests & JSDoc were written using ChatGPT because I'm lazy, however the core codebase is still mine.

## License
This project is licensed under the MIT license. See [LICENSE](https://microjson.expo.moe/LICENSE.txt) for more information.
