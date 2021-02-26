import { Browser, Builder, logging, ThenableWebDriver } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { Options as FirefoxOptions, ServiceBuilder as FirefoxServiceBuilder } from "selenium-webdriver/firefox";
import { Options as SafariOptions } from "selenium-webdriver/safari";
import { BSSettings as BSSettings } from "../settings/browserstack-settings";
import { Settings } from "../settings/settings";

export class DriverManager {

    public getDriver(): ThenableWebDriver {
        switch (Settings.browserName) {
            case Browser.CHROME: {
                return this.getChromeDriver();
            }
            case Browser.FIREFOX: {
                return this.getFirefoxDriver();
            }
            case Browser.SAFARI: {
                return this.getSafariDriver();
            }
            default: {
                return this.getBrowserStackDriver();
            }
        }
    }

    private getChromeDriver(): ThenableWebDriver {
        require("chromedriver");
        const options = new ChromeOptions();
        options.addArguments(`--window-size=${Settings.browserWidth},${Settings.browserHeight}`)
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

    private getBrowserStackDriver(): ThenableWebDriver {
        if (BSSettings.accessKey == undefined || BSSettings.userName == undefined) {
            throw Error("Please set BS_USER_NAME and BS_ACCESS_KEY variables.");
        }

        const url = "http://hub-cloud.browserstack.com/wd/hub";
        const capabilities = {
            'bstack:options': {
                "osVersion": BSSettings.osVersion,
                "deviceName": BSSettings.deviceName,
                "realMobile": BSSettings.realMobile,
                "local": BSSettings.local,
                "userName": BSSettings.userName,
                "accessKey": BSSettings.accessKey
            },
            "browserName": BSSettings.browserName,
            "name": BSSettings.buildName,
            "build": BSSettings.buildNumber,
            "nativeWebTap": "true"
        }

        return new Builder().usingServer(url).withCapabilities(capabilities).build();
    }
}
