# selenium-webdriver-jest

Spike for e2e test automation with Jest and Selenium

## Execute Tests

Run all tests:

```bash
npx jest
```

Run single spec:

```bash
npx jest tests/inputs/overview.tests.ts
```

Hints:

- [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) is awesome extension that makes it easy to run tests inside IDE.

## Test Settings

To specify browser please set `BROWSER_NAME` variable.

Possible values are:

- `chrome` (default)
- `firefox`
- `safari`

To enable headless mode set `HEADLESS=true` (default is false).

To set browser size you can set `BROWSER_WIDTH` and `BROWSER_HEIGHT` variables.

## Resources

- [Configuring Jest](https://jestjs.io/docs/en/configuration) from official docs
- [facebook/jest/examples](https://github.com/facebook/jest/tree/master/examples) are official demos
- [jest-image-snapshot)](https://github.com/americanexpress/jest-image-snapshot) looks awesome for visual regression testing
- [jest-webdriver](https://github.com/alexeyraspopov/jest-webdriver) looks abandoned, but nice ideas
- [jest-allure/examples](https://github.com/zaqqaz/jest-allure/tree/master/examples) shows e2e testing with global setup and teardown.
- [visual-unit-tests](https://github.com/zaqqaz/visual-unit-tests) one more e2e demo with allure
