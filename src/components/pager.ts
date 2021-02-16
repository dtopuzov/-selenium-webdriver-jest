import { By, ThenableWebDriver } from "selenium-webdriver";
import { Settings } from "../settings/settings";
import { UIComponent } from "./ui-component";
import { EC } from "../selenium/conditions";

export class Pager extends UIComponent {
    constructor(driver: ThenableWebDriver, locator = By.css(".k-grid-pager")) {
        super(driver, locator);
    }

    public async getPageButton(text: string) {
        let pageButtonLocator = By.xpath(`//li[.='${text}']`);
        let element = await this.getElement();
        await this.driver.wait(EC.hasChild(element, pageButtonLocator)
            , Settings.timeout
            , `Failed to find ${text} page.`);
        return await element.findElement(pageButtonLocator);
    }
}
