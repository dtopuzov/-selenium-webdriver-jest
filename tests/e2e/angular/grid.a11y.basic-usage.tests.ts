import { Browser } from "../../../src/selenium/browser";
import { Grid } from "../../../src/components/grid";
import { Key } from "selenium-webdriver";
import { Config } from "../../const";


let browser: Browser;
let grid: Grid;

beforeAll(() => {
    browser = new Browser();
});

beforeEach(async () => {
    await browser.navigateTo(`${Config.ngUrl}/grid/examples/a11y/basic-usage/?theme=default`);
    grid = new Grid(browser.driver);
});

afterEach(async () => {
    expect(await browser.getErrorLogs()).toEqual([]);
});

afterAll(async () => {
    await browser.close();
});

it("arrow navigation in each direction", async () => {
    const cell = await grid.Cell(1, 1);
    cell.click();
    expect(await browser.hasFocus(cell)).toBe(true);

    await browser.sendKey(Key.ARROW_RIGHT);
    expect(await browser.hasFocus(await grid.Cell(1, 2))).toBe(true);

    await browser.sendKey(Key.ARROW_DOWN);
    expect(await browser.hasFocus(await grid.Cell(2, 2))).toBe(true);

    await browser.sendKey(Key.ARROW_LEFT);
    expect(await browser.hasFocus(await grid.Cell(2, 1))).toBe(true);

    await browser.sendKey(Key.ARROW_UP);
    expect(await browser.hasFocus(await grid.Cell(1, 1))).toBe(true);
});

it("left/right arrow in left/right-most cell", async () => {
    let cell = await grid.Cell(2, 1);
    cell.click();
    expect(await browser.hasFocus(cell)).toBe(true);

    await browser.sendKey(Key.ARROW_LEFT);
    await browser.sleep(250); // Give it some time in case it fails
    expect(await browser.hasFocus(cell)).toBe(true);

    cell = await grid.Cell(2, 3);
    cell.click();
    expect(await browser.hasFocus(cell)).toBe(true);

    await browser.sendKey(Key.ARROW_RIGHT);
    await browser.sleep(250); // Give it some time in case it fails
    expect(await browser.hasFocus(cell)).toBe(true);
});

it("up arrow in top-most cell", async () => {
    const cell = await grid.Cell(1, 1);
    cell.click();
    expect(await browser.hasFocus(cell)).toBe(true);

    await browser.sendKey(Key.ARROW_UP);
    expect(await browser.hasFocus(await grid.HeaderCell(1))).toBe(true);

    await browser.sendKey(Key.ARROW_UP);
    expect(await browser.hasFocus(await grid.Header(1))).toBe(true);

    await browser.sendKey(Key.ARROW_UP);
    await browser.sleep(250); // Give it some time in case it fails
    expect(await browser.hasFocus(await grid.Header(1))).toBe(true);
});

it("down arrow in bottom-most cell", async () => {
    const cell = await grid.Cell(8, 1);
    cell.click();
    expect(await browser.hasFocus(cell)).toBe(true);

    await browser.sendKey(Key.ARROW_DOWN);
    expect(await browser.hasFocus(await grid.Cell(9, 1))).toBe(true);

    await browser.sendKey(Key.ARROW_DOWN);
    expect(await browser.hasFocus(await grid.Cell(10, 1))).toBe(true);

    await browser.sendKey(Key.ARROW_DOWN);
    await browser.sleep(250); // Give it some time in case it fails
    expect(await browser.hasFocus(await grid.Cell(10, 1))).toBe(true);
});

it("page up/down navigation", async () => {
    const cell = await grid.Cell(2, 2);
    expect(await browser.hasText(cell, "Chang")).toBe(true);

    cell.click();
    expect(await browser.hasFocus(cell)).toBe(true);

    await browser.sendKey(Key.PAGE_DOWN);
    expect(await browser.hasText(await grid.Cell(2, 2), "Queso Manchego La Pastora")).toBe(true);
    expect(await browser.hasFocus(await grid.Header(1))).toBe(true);

    await browser.sendKey(Key.PAGE_UP);
    expect(await browser.hasText(await grid.Cell(2, 2), "Chang")).toBe(true);
    expect(await browser.hasFocus(await grid.Header(1))).toBe(true);
});

it("home/end navigation", async () => {
    const cell = await grid.Cell(2, 2);
    cell.click();
    expect(await browser.hasFocus(cell)).toBe(true);

    await browser.sendKey(Key.HOME);
    expect(await browser.hasFocus(await grid.Cell(2, 1))).toBe(true);

    await browser.sendKey(Key.END);
    expect(await browser.hasFocus(await grid.Cell(2, 3))).toBe(true);
});

it("ctrl + home/end navigation", async () => {
    const cell = await grid.Cell(2, 2);
    cell.click();
    expect(await browser.hasFocus(cell)).toBe(true);

    await browser.sendKeyCombination(Key.CONTROL, Key.HOME);
    expect(await browser.hasFocus(await grid.Header(1))).toBe(true);

    await browser.sendKeyCombination(Key.CONTROL, Key.END);
    expect(await browser.hasFocus(await grid.Cell(10, 3))).toBe(true);
});
