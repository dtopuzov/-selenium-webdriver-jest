import { Browser } from "../../../src/selenium/browser";
import { Grid } from "../../../src/components/grid";
import { Config } from "../../const";
import { Popup } from "../../../src/components/popup";
import { By, Key } from "selenium-webdriver";

let browser: Browser;
let grid: Grid;

beforeAll(() => {
    browser = new Browser();
});

beforeEach(async () => {
    await browser.navigateTo(`${Config.ngUrl}/grid/examples/filtering/menu/?theme=default`);
    grid = new Grid(browser.driver);
});

afterEach(async () => {
    expect(await browser.getErrorLogs()).toEqual([]);
});

afterAll(async () => {
    await browser.close();
});

it("clear filter button should remove filter", async () => {
    const filter = await grid.HeaderFilter(2);
    expect(await filter.getAttribute("class")).toContain("k-state-active");

    await filter.click();
    const popup = new Popup(browser.driver);
    await popup.getElement(By.css(".k-button[type='reset']")).then(e => e.click());

    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 5)).toBe(true);
});

it("apply filter on numeric column", async () => {
    const filter = await grid.HeaderFilter(4);
    expect(await filter.getAttribute("class")).not.toContain("k-state-active");

    await filter.click();
    const popup = new Popup(browser.driver);
    await popup.getElement(By.css("input")).then(e => e.sendKeys("22.00" + Key.ENTER));

    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 1)).toBe(true);
});
