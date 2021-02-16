import { By, ThenableWebDriver, WebElement } from "selenium-webdriver";
import { UIComponent } from "./ui-component";
import { Pager } from "./pager";
import { EC } from "../selenium/conditions";
import { Settings } from "../settings/settings";

export class Grid extends UIComponent {
    constructor(driver: ThenableWebDriver, locator = By.css(".k-grid")) {
        super(driver, locator);
    }

    public get Pager(): Pager {
        return new Pager(this.driver, By.css(".k-grid-pager"));
    }

    public async Cell(row: number, column: number): Promise<WebElement> {
        let cellLocator = By.css(`tr:nth-of-type(${row}) td[role='gridcell']:nth-of-type(${column})`);
        let element = await this.getElement();
        await this.driver.wait(EC.hasChild(element, cellLocator)
            , Settings.timeout
            , `Failed to find cell at {${row}, ${column}}.`);
        return await element.findElement(cellLocator);
    }

    public async CellInput(row: number, column: number): Promise<WebElement> {
        let cellLocator = By.css(`tr:nth-of-type(${row}) td[role='gridcell']:nth-of-type(${column}) input`);
        let element = await this.getElement();
        await this.driver.wait(EC.hasChild(element, cellLocator)
            , Settings.timeout
            , `Failed to find input inside cell at {${row}, ${column}}.`);
        return await element.findElement(cellLocator);
    }
}
