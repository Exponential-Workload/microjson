<div align="center">

# MicroJSON

[![Build & Deploy](https://github.com/Exponential-Workload/microjson/actions/workflows/mkdocs.yml/badge.svg)](https://github.com/Exponential-Workload/microjson/actions/workflows/mkdocs.yml) [![Tests](https://github.com/Exponential-Workload/microjson/actions/workflows/test.yml/badge.svg)](https://github.com/Exponential-Workload/microjson/actions/workflows/test.yml)<br/>
[![documentation](https://img.shields.io/badge/-documentation-brightgreen.svg)](https://microjson.expo.moe/) [![npm](https://img.shields.io/badge/-npm-red.svg)](https://npm.im/@3xpo/microjson/) [![github](https://img.shields.io/badge/-github-blue.svg)](https://github.com/Exponential-Workload/microjson/tree/master)<br/>
[![mit license](https://img.shields.io/badge/license-mit-orange.svg)](https://microjson.expo.moe/LICENSE.txt) [![mom made pizza](https://img.shields.io/badge/type-safe-blue.svg)](https://typescriptlang.org/) [![mom made pizza](https://img.shields.io/badge/mom%20made-pizza-white.svg)](https://www.youtube.com/watch?v=iiASNxG4Mdg&list=PLsZdaL54kaMB6dhCuBe2Y34wWCiTrUAXe&index=21)<br/><!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors ​

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Exponential-Workload"><img src="https://avatars.githubusercontent.com/u/90570076?v=4?s=100" width="100px;" alt="ExponentialWorkload"/><br /><sub><b>ExponentialWorkload</b></sub></a><br /><a href="https://github.com/Exponential-Workload/microjson/commits?author=Exponential-Workload" title="Code">💻</a> <a href="https://github.com/Exponential-Workload/microjson/commits?author=Exponential-Workload" title="Documentation">📖</a> <a href="#infra-Exponential-Workload" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Exponential-Workload" title="Maintenance">🚧</a> <a href="https://github.com/Exponential-Workload/microjson/commits?author=Exponential-Workload" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

*Tests & JSDoc were written using ChatGPT because I'm lazy.*

## License
This project is licensed under the MIT license. See [LICENSE](https://microjson.expo.moe/LICENSE.txt) for more information.
