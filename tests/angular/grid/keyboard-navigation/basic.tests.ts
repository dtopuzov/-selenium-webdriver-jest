import { Browser } from "../../../../src/selenium/browser";
import { Settings } from "../../../../src/settings/settings";
import { Grid } from "../../../../src/components/grid";
import { EC } from "../../../../src/selenium/conditions";
import { Key } from "selenium-webdriver";

describe("Grid Keyboard Navigation Basic", () => {
    let browser: Browser;
    let grid: Grid;

    beforeAll(async () => {
        browser = await new Browser();
    });

    beforeEach(async () => {
        await browser.navigateTo(Settings.baseUrl + "grid/examples/a11y/basic-usage/?theme=default");
        grid = new Grid(browser.driver);
    });

    afterEach(async () => {
        await browser.verifyNoJSErrors();
    });

    afterAll(async () => {
        await browser.close();
    });

    it("arrow navigation in each direction", async () => {
        let cell = await grid.Cell(1, 1);
        await browser.wait(EC.hasText(cell, "1"), Settings.timeout, "Wrong initial state of the grid.");

        cell.click();
        await browser.wait(EC.hasFocus(cell), Settings.timeout, "Focus not set on click.");

        await browser.sendKey(Key.ARROW_RIGHT);
        await browser.wait(EC.hasFocus(await grid.Cell(1, 2)));

        await browser.sendKey(Key.ARROW_DOWN);
        await browser.wait(EC.hasFocus(await grid.Cell(2, 2)));

        await browser.sendKey(Key.ARROW_LEFT);
        await browser.wait(EC.hasFocus(await grid.Cell(2, 1)));

        await browser.sendKey(Key.ARROW_UP);
        await browser.wait(EC.hasFocus(await grid.Cell(1, 1)));
    });

    it("left/right arrow in left/right-most cell", async () => {
        let cell = await grid.Cell(2, 1);
        cell.click();
        await browser.wait(EC.hasFocus(cell), Settings.timeout, "Focus not set on click.");

        await browser.sendKey(Key.ARROW_LEFT);
        await browser.sleep(250); // Give it some time in case it fails
        await browser.wait(EC.hasFocus(await grid.Cell(2, 1)));

        cell = await grid.Cell(2, 3);
        cell.click();
        await browser.wait(EC.hasFocus(cell), Settings.timeout, "Focus not set on click.");

        await browser.sendKey(Key.ARROW_RIGHT);
        await browser.sleep(250); // Give it some time in case it fails
        await browser.wait(EC.hasFocus(await grid.Cell(2, 3)));
    });

    it("up arrow in top-most cell", async () => {
        let cell = await grid.Cell(1, 1);
        cell.click();
        await browser.wait(EC.hasFocus(cell), Settings.timeout, "Focus not set on click.");

        await browser.sendKey(Key.ARROW_UP);
        await browser.wait(EC.hasFocus(await grid.HeaderCell(1)));
        await browser.sendKey(Key.ARROW_UP);
        await browser.wait(EC.hasFocus(await grid.Header(1)));
        await browser.sendKey(Key.ARROW_UP);
        await browser.sleep(250); // Give it some time in case it fails
        await browser.wait(EC.hasFocus(await grid.Header(1)));
    });

    it("down arrow in bottom-most cell", async () => {
        let cell = await grid.Cell(8, 1);
        cell.click();
        await browser.wait(EC.hasFocus(cell), Settings.timeout, "Focus not set on click.");

        await browser.sendKey(Key.ARROW_DOWN);
        await browser.wait(EC.hasFocus(await grid.Cell(9, 1)));
        await browser.sendKey(Key.ARROW_DOWN);
        await browser.wait(EC.hasFocus(await grid.Cell(10, 1)));
        await browser.sendKey(Key.ARROW_DOWN);
        await browser.sleep(250); // Give it some time in case it fails
        await browser.wait(EC.hasFocus(await grid.Cell(10, 1)));
    });

    it("page up/down navigation", async () => {
        /*
        SHORTCUT	DESCRIPTION
        Page Down	Scrolls to the next page of data. If paging is configured, loads the next page of data, if any.
        Page Up	Scrolls to the previous page of data. If paging is configured, loads the previous page of data, if any.
        */
    });

    it("home/end navigation", async () => {
        /*
        SHORTCUT	DESCRIPTION
        Home	Moves the focus to the first focusable cell in the row.
        End	Moves the focus to the last focusable cell in the row.
        */
    });

    it("ctrl + home/end navigation", async () => {
        /*
        SHORTCUT	DESCRIPTION
        Ctrl & Home	Moves the focus to the first cell in the first row.
        Ctrl & End	Moves the focus to the last cell in the last row.
        */
    });
});
