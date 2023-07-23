import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser'

export default [
  {
    input: 'src/main.ts',
    output: [
      {
        file: 'dist/lib.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/lib.esm.js',
        format: 'esm',
        sourcemap: true,
      }
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        declaration: true,
      }),
      terser(),
    ],
    external: [],
  },
  {
    input: 'src/polyfill.ts',
    output: [
      {
        file: 'dist/poly.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/poly.esm.js',
        format: 'esm',
        sourcemap: true,
      }
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        declaration: true,
      }),
      terser(),
    ],
    external: [],
  },
];
