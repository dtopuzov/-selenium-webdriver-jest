import { By, ThenableWebDriver, WebElement } from "selenium-webdriver";
import { Settings } from "../settings/settings";
import { UIComponent } from "./ui-component";
import { EC } from "../selenium/conditions";

export class Pager extends UIComponent {
    constructor(driver: ThenableWebDriver, locator = By.css(".k-grid-pager"), protected parentElement?: WebElement) {
        super(driver, locator, parentElement);
    }

    public async getPageButton(text: string): Promise<WebElement> {
        const pageButtonLocator = By.xpath(`//li[.='${text}']`);
        const element = await this.getRootElement();
        await this.driver.wait(EC.hasChild(element, pageButtonLocator)
            , Settings.timeout
            , `Failed to find ${text} page.`);
        return await element.findElement(pageButtonLocator);
    }
}
