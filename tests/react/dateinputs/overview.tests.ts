import { By } from "selenium-webdriver";
import { Browser } from "../../../src/selenium/browser";

describe("DateInputs Overview", () => {
    let browser: Browser;

    beforeAll(async () => {
        browser = await new Browser();
        await browser.navigateTo("dateinputs/examples/basic");
    });

    afterAll(async () => {
        await browser.close();
    });

    it("DateInput should be present", async () => {
        let element = await browser.find(By.css(".k-dateinput"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });

    it("DatePicker should be present", async () => {
        let element = await browser.find(By.css(".k-datepicker"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });

    it("DateTimePicker should be present", async () => {
        let element = await browser.find(By.css(".k-datetimepicker"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });

    it("TimePicker should be present", async () => {
        let element = await browser.find(By.css(".k-timepicker"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });
});
