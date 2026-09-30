# Webpack Project Notes

## What this project does

Webpack starts from `src/index.js`, processes JavaScript and JSX files with Babel, and writes the bundled output to `dist/bundle.js`. The development server serves files from `dist/`, including the existing `dist/index.html` page.

## Step-by-step: install and run

1. Open a terminal in the project directory.
2. Install the dependencies with `pnpm install`. The project declares pnpm 12.6.0 as its package manager.
3. Start the development server with `pnpm start`. This runs `webpack-dev-server --config webpack.config.cjs --mode development`.
4. Open `http://localhost:8080` in a browser. Webpack Dev Server uses port 8080 by default.
5. The page in `dist/index.html` loads `/bundle.js`. Webpack rebuilds the bundle as you change source files; keep the server running while developing.

To create a production bundle without starting the server, run:

```sh
pnpm exec webpack --config webpack.config.cjs --mode production
```

The output is still written to `dist/bundle.js`; the command-line mode controls Webpack's optimizations.

## Build flow, step by step

1. **Entry:** `webpack.config.cjs` sets `./src/index.js` as the entry point.
2. **Module rule:** Files ending in `.js` or `.jsx` (except files in `node_modules`) are passed to `babel-loader`.
3. **Babel transforms:** `babel.config.json` enables `@babel/preset-env` for the listed browser targets and `@babel/preset-react` with the automatic JSX runtime. The `useBuiltIns` and `corejs` options are commented out, so they are not active polyfill settings.
4. **Linting:** `ESLintPlugin` runs ESLint as part of the Webpack build, using `eslint.config.js`.
5. **Resolution:** Webpack resolves imports with `.js` and `.jsx` extensions.
6. **Output:** Webpack writes `bundle.js` to the `dist/` directory and uses `/` as its public URL path.
7. **Serving:** The development server serves static files from `dist/`. Its HTML page includes a script tag for `/bundle.js`.

## Project files

- `package.json`: Project metadata, scripts, package-manager declaration, and runtime/development dependencies. The `start` script is the only script currently defined.
- `pnpm-lock.yaml`: Exact dependency resolution for reproducible pnpm installs.
- `pnpm-workspace.yaml`: pnpm install/build policy; `core-js` build scripts are currently disabled.
- `webpack.config.cjs`: Webpack entry, loader rule, output, development server, lint plugin, and import extensions.
- `babel.config.json`: Babel presets and browser/JSX transform options.
- `eslint.config.js`: ESLint's flat configuration, including recommended rules, Airbnb base rules, browser globals, and local rule overrides.
- `src/index.js`: Current application entry. It only logs a message to the browser console; it does not currently render React UI.
- `dist/index.html`: HTML page served by the dev server. It contains a `main` element with id `app` and loads `/bundle.js`.
- `dist/`: Webpack output and the HTML served in development. The `dist/` ignore entry in `.gitignore` is commented out, so this directory is not currently ignored by Git.
- `.gitignore`: Currently ignores `node_modules/`; its `dist/` entry is commented out.
- `webpack.md`: This walkthrough.

## Notes

- React and React DOM are installed, and the Babel React preset is configured, but the current entry file does not import React or contain JSX.
- `core-js` is installed, but Babel's `useBuiltIns` and `corejs` configuration is commented out. Installing it alone does not enable automatic polyfill injection.
- There is no separate `build` script yet. Use the `pnpm exec webpack ... --mode production` command above for a production bundle.
