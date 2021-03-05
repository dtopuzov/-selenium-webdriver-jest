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
    await browser.navigateTo(`${Config.vueUrl}/grid/examples/filtering/basic/?theme=default`);
    grid = new Grid(browser.driver);
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 4)).toBe(true);
});

afterEach(async () => {
    expect(await browser.getErrorLogs()).toEqual([]);
});

afterAll(async () => {
    await browser.close();
});

it("filter string column", async () => {
    const input = await grid.HeaderCellInput(2);
    await input.sendKeys("Se");
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 2)).toBe(true);

    await input.sendKeys("a" + Key.ENTER);
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 1)).toBe(true);

    await input.sendKeys("a" + Key.ENTER);
    expect(await browser.waitSafely(async () => await grid.IsEmpty() == true)).toBe(true);

    await grid.HeaderCellCleanFilterButton(2).then(e => e.click());
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 4)).toBe(true);
});

it("filter numeric column", async () => {
    const input = await grid.HeaderCellInput(4);
    await input.sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE));
    await input.sendKeys(40);
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 1)).toBe(true);

    await grid.HeaderCellFilterDropDown(4).then(h => h.click());
    const pricePopup = new Popup(browser.driver);
    await pricePopup.getListItem("Is greater than or equal to").then(e => e.click());
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 2)).toBe(true);

    await grid.HeaderCellFilterDropDown(5).then(h => h.click());
    const boolPopup = new Popup(browser.driver);
    await boolPopup.getListItem("Is true").then(e => e.click());
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 1)).toBe(true);
});
