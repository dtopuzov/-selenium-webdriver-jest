import { By, ThenableWebDriver, until, WebElement } from "selenium-webdriver";
import { Settings } from "../settings/settings";

export class UIComponent {
    constructor(protected driver: ThenableWebDriver, protected locator: By) {
    }

    protected async getElement(waitForVisible = true): Promise<WebElement> {
        let element = this.driver.wait(until.elementLocated(this.locator), Settings.timeout);
        if (waitForVisible) {
            await this.driver.wait(until.elementIsVisible(element), Settings.timeout);

            // Hack to handle Safari
            let browserName = (await (await this.driver).getCapabilities()).getBrowserName().toLowerCase();
            if (browserName == "safari") {
                await this.driver.wait(async () => await element.getRect() != undefined, Settings.timeout);
            }
        }
        return element;
    }
}
