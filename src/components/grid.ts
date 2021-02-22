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

    public async DataRows(): Promise<WebElement[]> {
        const rootElement = await this.getElement();
        return await rootElement.findElements(By.css("tbody tr"));
    }

    public async Header(column: number): Promise<WebElement> {
        const locator = By.css(`thead tr th:nth-of-type(${column})`);
        return await this.GetGridElement(locator, `Failed to find header at column ${column}.`);
    }

    public async HeaderCell(column: number): Promise<WebElement> {
        const locator = By.css(`thead tr td:nth-of-type(${column})`);
        return await this.GetGridElement(locator, `Failed to find header cell at column ${column}.`);
    }

    public async Cell(row: number, column: number): Promise<WebElement> {
        const locator = By.css(`tr:nth-of-type(${row}) td[role='gridcell']:nth-of-type(${column})`);
        return await this.GetGridElement(locator, `Failed to find cell at {${row}, ${column}}.`);
    }

    public async CellInput(row: number, column: number): Promise<WebElement> {
        const locator = By.css(`tr:nth-of-type(${row}) td[role='gridcell']:nth-of-type(${column}) input`);
        return await this.GetGridElement(locator, `Failed to find input at cell {${row}, ${column}}.`);
    }

    private async GetGridElement(locator: By, error: string) {
        const rootElement = await this.getElement();
        await this.driver.wait(EC.hasChild(rootElement, locator), Settings.timeout, error);
        return await rootElement.findElement(locator);
    }
}
