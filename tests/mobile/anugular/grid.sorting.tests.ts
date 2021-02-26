import { Browser } from "../../../src/selenium/browser";
import { Grid } from "../../../src/components/grid";
import { Config } from "../../const";
import { isAscending, isDescending } from "../../utils";

let browser: Browser;
let grid: Grid;

beforeAll(() => {
    browser = new Browser();
});

afterAll(async () => {
    await browser.close();
});

it("should be able to sort", async () => {
    await browser.navigateTo(`${Config.ngUrl}/grid/examples/configuration/sorting/?theme=default`);
    grid = new Grid(browser.driver);

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
