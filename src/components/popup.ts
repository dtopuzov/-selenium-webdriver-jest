import { By, ThenableWebDriver, until, WebElement } from "selenium-webdriver";
import { Settings } from "../settings/settings";
import { UIComponent } from "./ui-component";
import { EC } from "../selenium/conditions";

export class Popup extends UIComponent {
    constructor(driver: ThenableWebDriver, locator = By.css(".k-popup"), protected parentElement?: WebElement) {
        super(driver, locator, parentElement);
    }

    public async getListItem(text: string): Promise<WebElement> {
        const locator = By.xpath(`//div[contains(@class, 'k-popup')]//li[.='${text}']`);
        const rootElement = await this.getRootElement();
        await this.driver.wait(EC.hasChild(rootElement, locator),
            Settings.timeout,
            `Failed to find ${text} list item in popup.`);

        const listItem = await rootElement.findElement(locator);
        return this.driver.wait(until.elementIsVisible(listItem),
            Settings.timeout,
            `List item ${text} not visible.`);
    }
}
