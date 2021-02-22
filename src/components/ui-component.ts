import { By, ThenableWebDriver, until, WebElement } from "selenium-webdriver";
import { Settings } from "../settings/settings";

export class UIComponent {
    constructor(protected driver: ThenableWebDriver, protected locator: By, protected parentElement?: WebElement) {
    }

    protected async getElement(waitForVisible = true): Promise<WebElement> {
        if (this.parentElement != undefined) {
            const element = this.parentElement.findElement(this.locator);
            await this.driver.wait(until.elementIsVisible(element), Settings.timeout);
            return element;
        }
        else {
            const element = this.driver.wait(until.elementLocated(this.locator), Settings.timeout);
            if (waitForVisible) {
                await this.driver.wait(until.elementIsVisible(element), Settings.timeout);

                // Hack to handle Safari
                const browserName = (await (await this.driver).getCapabilities()).getBrowserName().toLowerCase();
                if (browserName == "safari") {
                    await this.driver.wait(async () => await element.getRect() != undefined, Settings.timeout);
                }
            }
            return element;
        }
    }
}
