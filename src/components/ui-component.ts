import { By, ThenableWebDriver, until, WebElement } from "selenium-webdriver";
import { EC } from "../selenium/conditions";
import { Settings } from "../settings/settings";

export class UIComponent {
    constructor(protected driver: ThenableWebDriver, protected locator: By, protected parentElement?: WebElement) {
    }

    public async getRootElement(waitForVisible = true): Promise<WebElement> {
        const findFailedError = `Failed to find element located by ${this.locator}.`;
        const notVisibleError = `Element located by ${this.locator} is not visible.`;

        if (this.parentElement != undefined) {
            const element = this.parentElement.findElement(this.locator);
            await this.driver.wait(until.elementIsVisible(element), Settings.timeout, notVisibleError);
            return element;
        }
        else {
            const element = this.driver.wait(until.elementLocated(this.locator), Settings.timeout, findFailedError);
            if (waitForVisible) {
                await this.driver.wait(until.elementIsVisible(element), Settings.timeout, notVisibleError);

                // Hack to handle Safari
                const browserName = (await (await this.driver).getCapabilities()).getBrowserName().toLowerCase();
                if (browserName == "safari") {
                    await this.driver.wait(async () => await element.getRect() != undefined, Settings.timeout, notVisibleError);
                }
            }
            return element;
        }
    }

    public async getElement(locator: By): Promise<WebElement> {
        const rootElement = await this.getRootElement();
        await this.driver.wait(EC.hasChild(rootElement, locator));
        const childElement = rootElement.findElement(locator);
        return this.driver.wait(until.elementIsVisible(childElement));
    }
}
