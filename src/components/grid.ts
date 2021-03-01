import { By, ThenableWebDriver, WebElement } from "selenium-webdriver";
import { UIComponent } from "./ui-component";
import { Pager } from "./pager";
import { EC } from "../selenium/conditions";
import { Settings } from "../settings/settings";
import { SortType } from "./enums";

export class Grid extends UIComponent {
    public static get Selector(): string {
        return ".k-grid";
    }

    constructor(driver: ThenableWebDriver, locator = By.css(Grid.Selector), protected parentElement?: WebElement) {
        super(driver, locator, parentElement);
    }

    public async Pager(): Promise<Pager> {
        const rootElement = await this.getElement();
        return new Pager(this.driver, By.css(".k-grid-pager"), rootElement);
    }

    public async DataRows(): Promise<WebElement[]> {
        const rootElement = await this.getElement();
        return await rootElement.findElements(By.css("tbody tr"));
    }

    public async Header(column: number): Promise<WebElement> {
        const locator = By.css(`thead tr th:nth-of-type(${column})`);
        return await this.GetGridElement(locator, `Failed to find header at column ${column}.`);
    }

    public async HeaderByText(text: string, exactMatch = true): Promise<WebElement> {
        // Angular and Blazor: Header text is in span with class "k-column-title"
        // jQuery, React and Vue: Header text is in span with class "k-link"
        let locator = null;
        if (exactMatch) {
            locator = By.xpath(`//thead//tr//th[.//*[(@class='k-column-title' or @class='k-link') and .='${text}']]`);
        } else {
            locator = By.xpath(`//thead//tr//th[.//*[(@class='k-column-title' or @class='k-link') and contains(.,'${text}')]]`);
        }
        return await this.GetGridElement(locator, `Failed to find header with "${text}" text.`);
    }

    public async HeaderSortType(text: string, exactMatch = true): Promise<SortType> {
        const rootElement = await this.HeaderByText(text, exactMatch);
        if ((await rootElement.findElements(By.css(".k-i-sort-asc-sm"))).length > 0) {
            return SortType.Asc;
        } if ((await rootElement.findElements(By.css(".k-i-sort-desc-sm"))).length > 0) {
            return SortType.Desc;
        }
        else {
            return SortType.None;
        }
    }

    public async GetSortOrder(text: string, exactMatch = true): Promise<number> {
        const locator = By.css(".k-sort-order");
        const rootElement = await this.HeaderByText(text, exactMatch);
        if ((await rootElement.findElements(locator)).length > 0) {
            const element = await rootElement.findElement(locator);
            return +(await element.getText());
        } else {
            return null;
        }
    }

    public async HeaderCell(column: number): Promise<WebElement> {
        const locator = By.css(`thead tr td:nth-of-type(${column})`);
        return await this.GetGridElement(locator, `Failed to find header cell at column ${column}.`);
    }

    public async Cell(row: number, column: number): Promise<WebElement> {
        const defaultLocator = `tr:nth-of-type(${row}) td[role='gridcell']:nth-of-type(${column})`;
        const vueLocator = `tr.k-master-row:nth-of-type(${row}) td:nth-of-type(${column})`;
        const errorMessage = `Failed to find cell at {${row}, ${column}}.`;
        return await this.GetGridElement(By.css(`${defaultLocator}, ${vueLocator}`), errorMessage);
    }

    public async CellInput(row: number, column: number): Promise<WebElement> {
        const defaultLocator = `tr:nth-of-type(${row}) td[role='gridcell']:nth-of-type(${column}) input`;
        const vueLocator = `tr.k-master-row:nth-of-type(${row}) td:nth-of-type(${column}) input`;
        const errorMessage = `Failed to find input at cell {${row}, ${column}}.`;
        return await this.GetGridElement(By.css(`${defaultLocator}, ${vueLocator}`), errorMessage);
    }

    public async CellsByColumn(column: number, limit?: number): Promise<WebElement[]> {
        const rootElement = await this.getElement();
        const cells = await rootElement.findElements(By.css(`tr td:nth-of-type(${column})`));
        if (limit != undefined) {
            return cells.slice(0, limit);
        } else {
            return cells;
        }
    }

    private async GetGridElement(locator: By, error: string) {
        const rootElement = await this.getElement();
        await this.driver.wait(EC.hasChild(rootElement, locator), Settings.timeout, error);
        return await rootElement.findElement(locator);
    }
}
