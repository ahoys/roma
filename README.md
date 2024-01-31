# Commands

> `npm build`

Builds the production ready environment.

- Should be ran every time `.env` is altered.

> `npm start`

Starts the server in production.

- `.env` is used to read environment variables.

> `npm watch`

Starts the server in development.

- `.dev.env` is used to read environment variables.

> `npm test`

Tests the TypeScript-typings and runs Jest.

- Should be used with CI/CD.

> `npm jest`

Runs only Jest.

- To run a singular test-file, run: `npm jest <name of the test-file>`

> `npm lint`

Lints (formats) the code.

- By default you should use ESLint and Prettier extensions with VS Code.
