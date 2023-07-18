# Commands

> `yarn build`

Builds the production ready environment.

- Should be ran every time `.env` is altered.

> `yarn start`

Starts the server in production.

- `.env` is used to read environment variables.

> `yarn watch`

Starts the server in development.

- `.dev.env` is used to read environment variables.

> `yarn test`

Tests the TypeScript-typings and runs Jest.

- Should be used with CI/CD.

> `yarn jest`

Runs only Jest.

- To run a singular test-file, run: `yarn jest <name of the test-file>`

> `yarn lint`

Lints (formats) the code.

- By default you should use ESLint and Prettier extensions with VS Code.
