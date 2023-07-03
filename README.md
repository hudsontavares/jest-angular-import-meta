# jest-angular-import-meta

`jest-angular-import-meta` is a package designed to solve the issue of `SyntaxError: Cannot use 'import.meta' outside a module` that occurs when using Worker with Angular 12+ and Jest. This package replaces the `import.meta.url` token with `__dirname` in order to make the tests pass instead of fail.

## Installation

You can install `jest-angular-import-meta` using npm:

```shell
npm install @hudsontavares/jest-angular-import-meta
```

or yarn:

```shell
yarn add @hudsontavares/jest-angular-import-meta
```

## Usage

To use `jest-angular-import-meta`, you need to configure your TypeScript compiler to apply the transformation provided by the package. Here's an example of how you can do this with `ts-jest`:

```javascript
// jest.config.js

module.exports = {
  // ...
  globals: {
    'ts-jest': {
      // ...
      astTransformers: {
        before: [
          '@hudsontavares/jest-angular-import-meta',
        ],
      },
    },
  },
};
```

After configuring `ts-jest`, the `import.meta.url` references in your code will be transformed to use `__dirname` instead, resolving the `SyntaxError` issue.

## Contributing

Contributions to `jest-angular-import-meta` are welcome! If you find a bug or have a suggestion, please open an issue on the [GitHub repository](https://github.com/hudsontavares/jest-angular-import-meta). Pull requests are also appreciated.

## License

This package is licensed under the [Apache-2.0](https://github.com/hudsontavares/jest-angular-import-meta/blob/main/LICENSE).