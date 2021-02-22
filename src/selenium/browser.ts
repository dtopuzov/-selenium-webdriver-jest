import AxeBuilder from "@axe-core/webdriverjs";
import { By, Condition, ThenableWebDriver, until, WebElement } from "selenium-webdriver";
import { Level, Type } from "selenium-webdriver/lib/logging";
import { EC } from "./conditions";
import { DriverManager } from "./driver-manager";

export class Browser {
    public driver: ThenableWebDriver;

    constructor() {
        this.driver = new DriverManager().getDriver();
    }

    public async close(): Promise<void> {
        await this.driver.quit();
    }

    public async navigateTo(url: string): Promise<void> {
        await this.driver.navigate().to(url);
    }

    public async refresh(): Promise<void> {
        await this.driver.navigate().refresh();
    }

    public async find(locator: By, timeout = 10000): Promise<WebElement> {
        const element = await this.driver.wait(until.elementLocated(locator), timeout, `Failed to find element located by ${locator}.`);
        await this.driver.wait(until.elementIsVisible(element));

        // Hack to handle Safari
        const browserName = (await (await this.driver).getCapabilities()).getBrowserName().toLowerCase();
        if (browserName == "safari") {
            await this.driver.wait(async () => await element.getRect() != undefined);
        }

        return element;
    }

    public async findChild(rootElement: WebElement, locator: By, timeout = 10000): Promise<WebElement> {
        await this.wait(EC.hasChild(rootElement, locator), timeout, `Failed to find child element located by ${locator}.`);
        return rootElement.findElement(locator);
    }

    public async type(element: WebElement, text: string, clear = true): Promise<void> {
        if (clear) {
            await element.clear();
        }
        await element.sendKeys(text);
    }

    public async sendKey(key: string): Promise<void> {
        await this.driver.actions().sendKeys(key).perform();
    }

    public async sendKeyCombination(key1: string, key2: string): Promise<void> {
        await this.driver.actions().keyDown(key1).keyDown(key2).keyUp(key2).keyUp(key1).perform();
    }

    public async hasFocus(element: WebElement): Promise<boolean> {
        return await this.waitSafely(EC.hasFocus(element));
    }

    public async hasText(element: WebElement, text: string): Promise<boolean> {
        return await this.waitSafely(EC.hasText(element, text));
    }

    public async hasValue(element: WebElement, value: string): Promise<boolean> {
        return await this.waitSafely(EC.hasValue(element, value));
    }

    public async wait(condition: () => Promise<boolean> | Condition<boolean>, timeout = 10000, message = undefined): Promise<void> {
        await this.driver.wait(condition, timeout, message);
    }

    public async waitSafely(condition: () => Promise<boolean> | Condition<boolean>, timeout = 10000): Promise<boolean> {
        try {
            await this.driver.wait(condition, timeout);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public async sleep(milliseconds: number): Promise<void> {
        await this.driver.sleep(milliseconds);
    }

    public async getScreenshot(): Promise<string> {
        return await this.driver.takeScreenshot();
    }

    public async verifyNoAccessibilityViolations(cssSelector = "html", disableRules = ["color-contrast"]): Promise<void> {
        const axe = new AxeBuilder(this.driver);
        axe.include(cssSelector);
        for (const rule of disableRules) {
            axe.disableRules(rule);
        }
        const result = await axe.analyze();
        expect(result.violations).toEqual([]);
    }

    public async getErrorLogs(): Promise<string[]> {
        const errors = [];
        const browserName = (await (await this.driver).getCapabilities()).getBrowserName().toLowerCase();
        if (browserName == "firefox" || browserName == "safari") {
            // Can not get FF logs due to issue.
            // Please see:
            // https://github.com/mozilla/geckodriver/issues/284#issuecomment-477677764
        } else {
            const logs = await this.driver.manage().logs().get(Type.BROWSER);
            for (const entry of logs) {
                if (entry.level === Level.SEVERE) {
                    errors.push(entry.message);
                }
            }
        }
        return errors;
    }

    public async verifyNoJSErrors(excludeList = ["favicon.ico"]): Promise<void> {
        const allErrors = await this.getErrorLogs();
        const filteredErrors = [];
        for (const entry of allErrors) {
            for (const excludeItem of excludeList) {
                const error = entry.indexOf(excludeItem) >= 0;
                if (!error && filteredErrors.indexOf(entry) < 0) {
                    filteredErrors.push(entry);
                    break;
                }
            }
        }
        expect(filteredErrors).toEqual([]);
    }
}
