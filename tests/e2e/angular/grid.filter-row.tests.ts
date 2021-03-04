import { Browser } from "../../../src/selenium/browser";
import { Grid } from "../../../src/components/grid";
import { Popup } from "../../../src/components/popup";
import { Config } from "../../const";
import { Key } from "selenium-webdriver";

let browser: Browser;
let grid: Grid;

beforeAll(() => {
    browser = new Browser();
});

beforeEach(async () => {
    await browser.navigateTo(`${Config.ngUrl}/grid/examples/filtering/basic/?theme=default`);
    grid = new Grid(browser.driver);
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 2)).toBe(true);
});

afterEach(async () => {
    expect(await browser.getErrorLogs()).toEqual([]);
});

afterAll(async () => {
    await browser.close();
});

it("filter string column", async () => {
    const input = await grid.HeaderCellInput(2);
    expect(await input.getAttribute("value")).toEqual("Chef");

    await input.click();
    Array.from({ length: 4 }, async () => await input.sendKeys(Key.BACK_SPACE));
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 5)).toBe(true);

    await input.sendKeys("Aniseed" + Key.ENTER);
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 1)).toBe(true);

    await input.sendKeys("Drink" + Key.ENTER);
    expect(await grid.IsEmpty()).toBe(true);
});

it("filter numeric column", async () => {
    const input = await grid.HeaderCellInput(4);
    await input.sendKeys("21.35" + Key.ENTER);
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 1)).toBe(true);

    await grid.HeaderCellCleanFilterButton(4).then(h => h.click());
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 2)).toBe(true);

    await input.sendKeys("10" + Key.ENTER);
    expect(await grid.IsEmpty()).toBe(true);

    await grid.HeaderCellFilterDropDown(4).then(h => h.click());
    const pricePopup = new Popup(browser.driver)
    await pricePopup.getListItem("Is greater than").then(e => e.click());
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 2)).toBe(true);

    await grid.HeaderCellFilterDropDown(5).then(h => h.click());
    const boolPopup = new Popup(browser.driver)
    await boolPopup.getListItem("Is True").then(e => e.click());
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 1)).toBe(true);
});
