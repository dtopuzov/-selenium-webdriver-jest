import { By, Key } from "selenium-webdriver";
import { Grid } from "../../../src/components/grid";
import { Browser } from "../../../src/selenium/browser";
import { Config } from "../../const";

let browser: Browser;
let grid: Grid;

beforeAll(() => {
    browser = new Browser();
});

beforeEach(async () => {
    await browser.navigateTo(`${Config.ngUrl}/grid/examples/a11y/incell-tab`);
    grid = new Grid(browser.driver);
});

afterEach(async () => {
    expect(await browser.getErrorLogs()).toEqual([]);
});

afterAll(async () => {
    await browser.close();
});

it("tab should focus next cell", async () => {
    let cell = await grid.Cell(1, 1);
    expect(await browser.hasText(cell, "Chai")).toBe(true);

    cell.click();
    let input = await grid.CellInput(1, 1);
    await browser.type(input, "Test");
    expect(await browser.hasValue(input, "Test")).toBe(true);

    await browser.sendKey(Key.TAB);
    input = await grid.CellInput(1, 2);
    expect(await browser.hasFocus(input)).toBe(true);

    cell = await grid.Cell(1, 1);
    expect(await browser.hasText(cell, "Test")).toBe(true);
});

it("shift+tab should focus previous cell", async () => {
    const cell = await grid.Cell(1, 2);
    expect(await browser.hasText(cell, "18")).toBe(true);

    cell.click();
    let input = await grid.CellInput(1, 2);
    expect(await browser.hasFocus(input)).toBe(true);

    await browser.sendKeyCombination(Key.SHIFT, Key.TAB);
    input = await grid.CellInput(1, 1);
    expect(await browser.hasFocus(input)).toBe(true);
});

it("tab at last cell should navigate to next line", async () => {
    let cell = await grid.Cell(1, 4)
    expect(await browser.hasText(cell, "39")).toBe(true);
    cell.click();

    let input = await grid.CellInput(1, 4);
    expect(await browser.hasFocus(input)).toBe(true);

    await browser.sendKey(Key.TAB);
    cell = await grid.Cell(1, 5)
    const button = await browser.findChild(cell, By.css(".k-button"));
    expect(await browser.hasFocus(button)).toBe(true);

    await browser.sendKey(Key.TAB);
    input = await grid.CellInput(2, 1);
    expect(await browser.hasFocus(input)).toBe(true);
    expect(await browser.hasValue(input, "Chang")).toBe(true);
});

it("enter should save value", async () => {
    let cell = await grid.Cell(1, 1);
    expect(await browser.hasText(cell, "Chai")).toBe(true);

    cell.click();
    const input = await grid.CellInput(1, 1);
    await browser.type(input, " is OK", false);
    expect(await browser.hasValue(input, "Chai is OK")).toBe(true);

    await browser.sendKey(Key.ENTER);
    cell = await grid.Cell(1, 1);
    expect(await browser.hasText(cell, "Chai is OK")).toBe(true);
    expect(await browser.hasFocus(cell)).toBe(true);
});

it("escape should not save value", async () => {
    let cell = await grid.Cell(1, 1);
    expect(await browser.hasText(cell, "Chai")).toBe(true);

    cell.click();
    const input = await grid.CellInput(1, 1);
    await browser.type(input, " is NOT OK", false);
    expect(await browser.hasValue(input, "Chai is NOT OK")).toBe(true);

    await browser.sendKey(Key.ESCAPE);
    cell = await grid.Cell(1, 1);
    expect(await browser.hasText(cell, "Chai")).toBe(true);
    expect(await browser.hasFocus(cell)).toBe(true);
});
