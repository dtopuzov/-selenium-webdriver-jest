import { Browser } from "../../../src/selenium/browser";
import { Config } from "../../const";
import { By } from "selenium-webdriver";
import { Grid } from "../../../src/components/grid";
import { isAscending, isDescending } from "../../utils";
import { SortType } from "../../../src/components/enums";

let browser: Browser;
let grid: Grid;

beforeAll(() => {
    browser = new Browser();
});

beforeEach(async () => {
    await browser.navigateTo(`${Config.reactUrl}/grid/examples/sorting/?theme=material`);
    grid = new Grid(browser.driver);
});

afterEach(async () => {
    expect(await browser.getErrorLogs()).toEqual([]);
});

afterAll(async () => {
    await browser.close();
});

it("click header should change sort type", async () => {
    const header = await grid.HeaderByText("Product Name");

    await header.click();
    expect(await grid.HeaderSortType("Product Name")).toEqual(SortType.Asc);
    expect(await isAscending(await grid.CellsByColumn(2))).toBe(true);

    await header.click();
    expect(await grid.HeaderSortType("Product Name")).toEqual(SortType.Desc);
    expect(await isDescending(await grid.CellsByColumn(2))).toBe(true);

    await header.click();
    expect(await grid.HeaderSortType("Product Name")).toEqual(SortType.None);
    expect(await (await grid.Cell(1, 2)).getText()).toEqual("Chai");
    expect(await (await grid.Cell(2, 2)).getText()).toEqual("Chang");
    expect(await (await grid.Cell(3, 2)).getText()).toEqual("Aniseed Syrup");
});

it("sortable mode single should not allow sort multiple columns", async () => {
    await (await grid.HeaderByText("Product Name")).click();
    expect(await grid.HeaderSortType("Product Name")).toEqual(SortType.Asc);
    expect(await isAscending(await grid.CellsByColumn(2))).toBe(true);


    await (await grid.HeaderByText("ProductID")).click();
    expect(await grid.HeaderSortType("Product Name")).toEqual(SortType.None);
    expect(await grid.HeaderSortType("ProductID")).toEqual(SortType.Asc);
    expect(await isAscending(await grid.CellsByColumn(1))).toBe(true);
});

it("sortable mode multiple should allow sort multiple columns", async () => {
    await (await browser.find(By.id("multiSort"))).click();

    await (await grid.HeaderByText("Product Name")).click();
    expect(await grid.HeaderSortType("Product Name")).toEqual(SortType.Asc);
    expect(await isAscending(await grid.CellsByColumn(2))).toBe(true);

    await (await grid.HeaderByText("ProductID")).click();
    expect(await grid.GetSortOrder("Product Name", false)).toEqual(1);
    expect(await grid.GetSortOrder("ProductID", false)).toEqual(2);
    expect(await grid.HeaderSortType("Product Name", false)).toEqual(SortType.Asc);
    expect(await grid.HeaderSortType("ProductID", false)).toEqual(SortType.Asc);
    expect(await isAscending(await grid.CellsByColumn(1))).toBe(false);
    expect(await isAscending(await grid.CellsByColumn(2))).toBe(true);
});

it("allowUnsort should disable un sorting", async () => {
    await (await browser.find(By.id("unsort"))).click();

    const header = await grid.HeaderByText("Product Name");

    await header.click();
    expect(await grid.HeaderSortType("Product Name")).toEqual(SortType.Asc);
    expect(await isAscending(await grid.CellsByColumn(2))).toBe(true);

    await header.click();
    expect(await grid.HeaderSortType("Product Name")).toEqual(SortType.Desc);
    expect(await isDescending(await grid.CellsByColumn(2))).toBe(true);

    await header.click();
    expect(await grid.HeaderSortType("Product Name")).toEqual(SortType.Asc);
    expect(await isAscending(await grid.CellsByColumn(2))).toBe(true);
});
