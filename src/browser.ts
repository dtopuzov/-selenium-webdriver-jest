import AxeBuilder from "@axe-core/webdriverjs";
import { By, ThenableWebDriver, until, WebElement, WebElementCondition } from "selenium-webdriver";
import { Level, Type } from "selenium-webdriver/lib/logging";
import { DriverManager } from "./driver-manager";
import { Settings } from "./settings";

export class Browser {
    public driver: ThenableWebDriver;

    constructor() {
        this.driver = new DriverManager().getDriver();
    }

    public async close(): Promise<void> {
        await this.driver.quit();
    }

    public async navigateTo(url: string): Promise<void> {
        if (Settings.baseUrl != undefined) {
            await this.driver.navigate().to(Settings.baseUrl + url);
        } else {
            await this.driver.navigate().to(url);
        }
    }

    public async refresh(): Promise<void> {
        await this.driver.navigate().refresh();
    }

    public async find(locator: By, timeout = 10000): Promise<WebElement> {
        let element = await this.driver.wait(until.elementLocated(locator), timeout, `Failed to find element located by ${locator}.`);
        await this.driver.wait(until.elementIsVisible(element));

        // Hack to handle Safari
        let browserName = (await (await this.driver).getCapabilities()).getBrowserName().toLowerCase();
        if (browserName == "safari") {
            await this.driver.wait(async () => await element.getRect() != undefined);
        }

        return element;
    }

    public async wait(condition: () => Promise<boolean> | WebElementCondition, timeout = 10000, message = undefined): Promise<void> {
        await this.driver.wait(condition, timeout, message);
    }

    public async waitSafely(condition: () => Promise<boolean> | WebElementCondition, timeout = 10000): Promise<boolean> {
        try {
            await this.driver.wait(condition, timeout);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public async sleep(milliseconds: number): Promise<void> {
        await (await this.driver).sleep(milliseconds);
    }

    public async verifyNoAccessibilityViolations(cssSelector = "html", disableRules = ["color-contrast"]): Promise<void> {
        let axe = new AxeBuilder(this.driver);
        axe.include(cssSelector);
        for (let rule of disableRules) {
            axe.disableRules(rule);
        }
        let result = await axe.analyze();
        expect(result.violations).toEqual([]);
    }

    public async getErrorLogs(): Promise<string[]> {
        let errors = [];
        let browserName = (await (await this.driver).getCapabilities()).getBrowserName().toLowerCase();
        if (browserName == "firefox" || browserName == "safari") {
            // Can not get FF logs due to issue.
            // Please see:
            // https://github.com/mozilla/geckodriver/issues/284#issuecomment-477677764
        } else {
            let logs = await this.driver.manage().logs().get(Type.BROWSER);
            for (const entry of logs) {
                if (entry.level === Level.SEVERE) {
                    errors.push(entry.message);
                }
            }
        }
        return errors;
    }

    public async verifyNoJSErrors(excludeList = ["favicon.ico"]): Promise<void> {
        let allErrors = await this.getErrorLogs();
        let filteredErrors = [];
        for (let entry of allErrors) {
            for (let excludeItem of excludeList) {
                let error = entry.indexOf(excludeItem) >= 0;
                if (!error && filteredErrors.indexOf(entry) < 0) {
                    filteredErrors.push(entry);
                    break;
                }
            }
        }
        expect(filteredErrors).toEqual([]);
    }
}
