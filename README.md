# kendo-driver

Selenium based abstractions of KendoUI components.

## Usage

### Managing browsers

Example:

```javascript
    const browser = new Browser();    
    await browser.navigateTo("https://www.telerik.com/")
    await browser.close();
```

By default it will start Chrome browser with size 1366x768.

Browser type and size can be controlled by settings following environment variables:

- `BROWSER_NAME`

    Allowed values are `chrome`, `firefox` and `safari` (default is `chrome`).

- `BROWSER_WIDTH` and `BROWSER_HEIGHT`

    Default values are `1366` and `768`.

- `HEADLESS`

    If set to `true` it will start browsers in headless mode (default is `false`).

    Notes: `Safari` do not support headless mode and this setting will be ignored.

### Testing on Real Mobile Devices @BrowserStack

Testing on mobile devices is also important, but usually it is hard to do it locally because:

- Mobile devices are expensive
- Local labs do not work well in case employees are distributed

That is why we implemented [BrowserStack](https://www.browserstack.com/) support.

Running tests on BrowserStack is similar to ruining them locally, we just need to tell what device and capabilities we need.

Configuration happens via environment variables:

```bash
export BROWSER_NAME=remote
export BS_USER_NAME=<your browser stack user id>
export BS_ACCESS_KEY=<your browser stack access key>
export BS_BROWSER_NAME=<Android|iPhone> (default is "Android")
export BS_BROWSER_NAME=<version of the mobile os> (default is "10.0")
export BS_DEVICE_NAME=<name of device> (default is "Google Pixel 4")
export BS_REAL_MOBILE=<true|false> (default is "true")
export BS_LOCAL=<true|false> (default is "false")
export BS_BUILD_NAME=<string> (default is "BStack Test")
export BS_BUILD_NUMBER=<string> (default is "BStack Build 1")
```

To check available mobile devices and capabilities please visit [this](https://www.browserstack.com/automate/capabilities) page.

### Find Elements and Wait for Conditions

TODO

### Take Screenshots

TODO

### Detect JavaScript errors in Browser Logs

TODO

### Detect Accessibility Violations

TODO

### Kendo UI Components Abstractions

TODO

## Contribution

PRs are welcome!

Lint:

```bash
npm run lint
```

Build:

```bash
npm run build
```

Run tests:

```bash
npm run tests:e2e
```

## Resources

- [Configuring Jest](https://jestjs.io/docs/en/configuration) from official docs
- [facebook/jest/examples](https://github.com/facebook/jest/tree/master/examples) are official demos
- [jest-image-snapshot)](https://github.com/americanexpress/jest-image-snapshot) looks awesome for visual regression testing
- [jest-webdriver](https://github.com/alexeyraspopov/jest-webdriver) looks abandoned, but nice ideas
- [jest-allure/examples](https://github.com/zaqqaz/jest-allure/tree/master/examples) shows e2e testing with global setup and teardown.
- [visual-unit-tests](https://github.com/zaqqaz/visual-unit-tests) one more e2e demo with allure
- [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) is awesome extension that makes it easy to run tests inside IDE.
