import { Browser, Builder, logging, ThenableWebDriver } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { Options as FirefoxOptions, ServiceBuilder as FirefoxServiceBuilder } from "selenium-webdriver/firefox";
import { Options as SafariOptions } from "selenium-webdriver/safari";
import { Settings } from "../settings/settings";

export class DriverManager {

    public getDriver() {
        switch (Settings.browserName) {
            case Browser.FIREFOX: {
                return this.getFirefoxDriver();
            }
            case Browser.SAFARI: {
                return this.getSafariDriver();
            }
            default: {
                return this.getChromeDriver();
            }
        }
    }

    private getChromeDriver(): ThenableWebDriver {
        require("chromedriver");
        const options = new ChromeOptions();
        options.addArguments(`--window-size=${Settings.browserWidth},${Settings.browserWidth}`)
        if (Settings.headless) {
            options.headless();
        }
        return new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    }

    private getFirefoxDriver(): ThenableWebDriver {
        require("geckodriver");
        const prefs = new logging.Preferences()
        prefs.setLevel(logging.Type.BROWSER, logging.Level.ALL);

        const options = new FirefoxOptions();
        options.addArguments(`--width=${Settings.browserWidth}`);
        options.addArguments(`--height=${Settings.browserHeight}`);
        options.setPreference("devtools.console.stdout.content", true);
        if (Settings.headless) {
            options.headless();
        }

        const service = new FirefoxServiceBuilder().setStdio("inherit");

        return new Builder()
            .forBrowser(Browser.FIREFOX)
            .setLoggingPrefs(prefs)
            .setFirefoxOptions(options)
            .setFirefoxService(service)
            .build();
    }

    private getSafariDriver(): ThenableWebDriver {
        const options = new SafariOptions();
        const driver = new Builder().forBrowser(Browser.SAFARI).setSafariOptions(options).build();
        const size = { width: Settings.browserWidth, height: Settings.browserHeight, x: 0, y: 0 };
        driver.manage().window().setRect(size);
        return driver;
    }
}
