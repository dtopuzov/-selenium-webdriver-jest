import { By } from "selenium-webdriver";
import { Browser } from "../../../src/browser";

describe("MultiSelect Basic", () => {
    let browser: Browser;

    beforeAll(async () => {
        browser = await new Browser();
        await browser.navigateTo("dropdowns/examples/multiselect/basic");
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

    it("should be able to select value with click", async () => {
        let element = await browser.find(By.css("#app > div > div > div"));
        expect(await element.getText()).toEqual("Favorite sports:");
    });

    it("should be able to select value with keyboard", async () => {
    });

    it("should resize when select many items", async () => {
    });
});
