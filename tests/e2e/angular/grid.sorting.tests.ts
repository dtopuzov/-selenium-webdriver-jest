import { Browser } from "../../../src/selenium/browser";
import { Grid } from "../../../src/components/grid";
import { Config } from "../../const";
import { By, WebElement } from "selenium-webdriver";

async function isAscending(cells: WebElement[]): Promise<boolean> {
    let isSorted = true;
    for (let i = 0; i < cells.length - 1; i++) {
        const text1 = await cells[i].getText();
        const text2 = await cells[i + 1].getText();
        if (text1.localeCompare(text2, undefined, { numeric: true, sensitivity: 'base' }) > 0) {
            isSorted = false;
            break;
        }
    }
    return isSorted;
}

async function isDescending(cells: WebElement[]): Promise<boolean> {
    let isSorted = true;
    for (let i = 0; i < cells.length - 1; i++) {
        const text1 = await cells[i].getText();
        const text2 = await cells[i + 1].getText();
        if (text1.localeCompare(text2, undefined, { numeric: true, sensitivity: 'base' }) < 0) {
            isSorted = false;
            break;
        }
    }
    return isSorted;
}

let browser: Browser;
let grid: Grid;

beforeAll(() => {
    browser = new Browser();
});

beforeEach(async () => {
    await browser.navigateTo(`${Config.ngUrl}/grid/examples/configuration/sorting/?theme=default`);
    grid = new Grid(browser.driver);
});

afterEach(async () => {
    await browser.verifyNoJSErrors();
});

afterAll(async () => {
    await browser.close();
});

it("click header should change sort type", async () => {
    const header = await grid.HeaderByText("Product Name");
    expect(await grid.HeaderSortType("Product Name")).toEqual("asc");
    expect(await isAscending(await grid.CellsByColumn(2))).toBe(true);

    await header.click();
    expect(await grid.HeaderSortType("Product Name")).toEqual("desc");
    expect(await isDescending(await grid.CellsByColumn(2))).toBe(true);

    await header.click();
    expect(await grid.HeaderSortType("Product Name")).toBeNull();
    expect(await (await grid.Cell(1, 2)).getText()).toEqual("Chai");
    expect(await (await grid.Cell(2, 2)).getText()).toEqual("Chang");
    expect(await (await grid.Cell(3, 2)).getText()).toEqual("Aniseed Syrup");
});

it("sortable mode single should not allow sort multiple columns", async () => {
    expect(await grid.HeaderSortType("ID")).toBeNull();
    expect(await grid.HeaderSortType("Product Name")).toEqual("asc");

    const idHeader = await grid.HeaderByText("ID");
    await idHeader.click();

    expect(await grid.HeaderSortType("Product Name")).toBeNull();
    expect(await grid.HeaderSortType("ID")).toEqual("asc");
    expect(await isAscending(await grid.CellsByColumn(1))).toBe(true);
});

it("sortable mode multiple should allow sort multiple columns", async () => {
    await (await browser.find(By.id("multiple"))).click();

    expect(await grid.HeaderSortType("ID")).toBeNull();
    expect(await grid.HeaderSortType("Product Name")).toEqual("asc");

    const idHeader = await grid.HeaderByText("ID");
    await idHeader.click();

    expect(await grid.GetSortOrder("Product Name")).toEqual("1");
    expect(await grid.GetSortOrder("ID")).toEqual("2");
    expect(await grid.HeaderSortType("Product Name")).toEqual("asc");
    expect(await grid.HeaderSortType("ID")).toEqual("asc");
    expect(await isAscending(await grid.CellsByColumn(1))).toBe(false);
    expect(await isAscending(await grid.CellsByColumn(2))).toBe(true);
});

it("allowUnsort should disable un sorting", async () => {
    await (await browser.find(By.id("allowUnsort"))).click();

    const header = await grid.HeaderByText("Product Name");

    await header.click();
    expect(await grid.HeaderSortType("Product Name")).toEqual("desc");
    expect(await isDescending(await grid.CellsByColumn(2))).toBe(true);

    await header.click();
    expect(await grid.HeaderSortType("Product Name")).toEqual("asc");
    expect(await isAscending(await grid.CellsByColumn(2))).toBe(true);
});
