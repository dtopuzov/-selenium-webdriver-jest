import { By } from "selenium-webdriver";
import { Browser } from "../../../src/browser";

const contentLocator = By.css(".k-animation-container div.content");

describe("Animation Overview", () => {
    let browser: Browser;

    beforeAll(async () => {
        browser = await new Browser();
        await browser.navigateTo("animation/examples/overview");
    });

    beforeEach(async () => {
        await browser.refresh();
    });

    afterEach(async () => {
        await browser.verifyNoJSErrors();
    });

    afterAll(async () => {
        await browser.close();
    });

    it("should animate with slide", async () => {
        await (await browser.find(By.css(".k-button"))).click();
        let content = await browser.find(contentLocator);
        let rect = await content.getRect();
        expect(rect.height).toBeGreaterThanOrEqual(41);
        expect(rect.height).toBeLessThanOrEqual(42);

        await browser.verifyNoAccessibilityViolations(".k-animation-container")
    });
});
