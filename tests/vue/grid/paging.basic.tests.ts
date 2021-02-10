import { Browser } from "../../../src/browser";

describe("Grid Paging Basic", () => {
    let browser: Browser;

    beforeAll(async () => {
        browser = await new Browser();
        await browser.navigateTo("grid/examples/paging/basic");
    });

    afterAll(async () => {
        await browser.close();
    });

    it("should be able to navigate with mouse clicks", async () => {
        await browser.sleep(1000);
    });

    it("should be able to navigate with keyboard", async () => {
        await browser.sleep(1000);
    });
});
