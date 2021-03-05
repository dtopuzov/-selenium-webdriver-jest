import { Browser } from "../../../src/selenium/browser";
import { Grid } from "../../../src/components/grid";
import { Config } from "../../const";
import { Popup } from "../../../src/components/popup";
import { By } from "selenium-webdriver";

let browser: Browser;
let grid: Grid;

beforeAll(() => {
    browser = new Browser();
});

beforeEach(async () => {
    await browser.navigateTo(`${Config.reactUrl}/grid/examples/filtering-column-menu/?theme=material`);
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

    await filter.click();
    let popup = new Popup(browser.driver);
    await popup.getElement(By.css("input[placeholder='Search']")).then(e => e.sendKeys("Chef"));
    await popup.getElement(By.xpath(".//label[.='Check All']")).then(e => e.click());
    await popup.getElement(By.css(".k-popup button.k-primary")).then(e => e.click());
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 2)).toBe(true);

    await filter.click();
    popup = new Popup(browser.driver);
    await popup.getElement(By.css(".k-button[type='reset']")).then(e => e.click());

    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 8)).toBe(true);
});

it("apply filter on numeric column", async () => {
    const filter = await grid.HeaderFilter(3);
    await filter.click();
    const popup = new Popup(browser.driver);
    await popup.getElement(By.css("input")).then(e => e.sendKeys("22.00"));
    await popup.getElement(By.css(".k-popup button.k-primary")).then(e => e.click());
    expect(await browser.waitSafely(async () => await grid.DataRowsCount() == 1)).toBe(true);
});
