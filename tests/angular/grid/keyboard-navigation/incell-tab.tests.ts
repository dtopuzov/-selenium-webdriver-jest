import { By, Key } from "selenium-webdriver";
import { EC } from "../../../../src/selenium/conditions";
import { Grid } from "../../../../src/components/grid";
import { Browser } from "../../../../src/selenium/browser";
import { Settings } from "../../../../src/settings/settings";

describe("Grid Keyboard Navigation InCell Tab", () => {
    let browser: Browser;
    let grid: Grid;

    beforeAll(async () => {
        browser = await new Browser();
    });

    beforeEach(async () => {
        await browser.navigateTo(Settings.baseUrl + "grid/examples/a11y/incell-tab");
        grid = new Grid(browser.driver);
    });

    afterEach(async () => {
        await browser.verifyNoJSErrors();
    });

    afterAll(async () => {
        await browser.close();
    });

    it("tab should focus next cell", async () => {
        let cell = await grid.Cell(1, 1);
        await browser.wait(EC.hasText(cell, "Chai"), Settings.timeout, "Wrong initial state of the grid.");

        cell.click();
        let input = await grid.CellInput(1, 1);
        await browser.type(input, "Test");
        await browser.wait(EC.hasValue(input, "Test"), Settings.timeout, "Failed to update input field inside cell.");

        await browser.sendKey(Key.TAB);
        input = await grid.CellInput(1, 2);
        await browser.wait(EC.hasFocus(input), Settings.timeout, "Failed to focus next cell with tab key.");

        cell = await grid.Cell(1, 1);
        await browser.wait(EC.hasText(cell, "Test"), Settings.timeout, "Value in first cell not saved after hit TAB key.");
    });

    it("shift+tab should focus previous cell", async () => {
        let cell = await grid.Cell(1, 2);
        await browser.wait(EC.hasText(cell, "18"), Settings.timeout, "Wrong initial state of the grid.");

        cell.click();
        let input = await grid.CellInput(1, 2);
        await browser.wait(EC.hasFocus(input), Settings.timeout, "Input not focused when click on cell.");

        await browser.sendKeyCombination(Key.SHIFT, Key.TAB);
        input = await grid.CellInput(1, 1);
        await browser.wait(EC.hasFocus(input), Settings.timeout, "Failed to focus input of previous cell with shift+tab.");
    });

    it("tab at last cell should navigate to next line", async () => {
        let cell = await grid.Cell(1, 4)
        await browser.wait(EC.hasText(cell, "39"), Settings.timeout, "Wrong initial state of the grid.");
        cell.click();

        let input = await grid.CellInput(1, 4);
        await browser.wait(EC.hasFocus(input), Settings.timeout, "Input not focused when click on cell.");

        await browser.sendKey(Key.TAB);
        cell = await grid.Cell(1, 5)
        let button = await browser.findChild(cell, By.css(".k-button"));
        await browser.wait(EC.hasFocus(button), Settings.timeout, "Button not focused when click on cell.");

        await browser.sendKey(Key.TAB);
        input = await grid.CellInput(2, 1);
        await browser.wait(EC.hasFocus(input), Settings.timeout, "Failed to focus cell on next line.");
        await browser.wait(EC.hasValue(input, "Chang"), Settings.timeout, "Focused input has wrong value.");
    });

    it("enter should save value", async () => {
        let cell = await grid.Cell(1, 1);
        await browser.wait(EC.hasText(cell, "Chai"), Settings.timeout, "Wrong initial state of the grid.");

        cell.click();
        let input = await grid.CellInput(1, 1);
        await browser.type(input, " is OK", false);
        await browser.wait(EC.hasValue(input, "Chai is OK"), Settings.timeout, "Failed to update input field inside cell.");

        await browser.sendKey(Key.ENTER);
        cell = await grid.Cell(1, 1);
        await browser.wait(EC.hasText(cell, "Chai is OK"), Settings.timeout, "Failed to save value on Enter key.");
        await browser.wait(EC.hasFocus(cell), Settings.timeout, "Parent cell not focused after hit Enter in input element.");
    });

    it("escape should not save value", async () => {
        let cell = await grid.Cell(1, 1);
        await browser.wait(EC.hasText(cell, "Chai"), Settings.timeout, "Wrong initial state of the grid.");

        cell.click();
        let input = await grid.CellInput(1, 1);
        await browser.type(input, " is NOT OK", false);
        await browser.wait(EC.hasValue(input, "Chai is NOT OK"), Settings.timeout, "Failed to update input field inside cell.");

        await browser.sendKey(Key.ESCAPE);
        cell = await grid.Cell(1, 1);
        await browser.wait(EC.hasText(cell, "Chai"), Settings.timeout, "Value updated depside Escape key.");
        await browser.wait(EC.hasFocus(cell), Settings.timeout, "Parent cell not focused after hit Escape in input element.");
    });
});
