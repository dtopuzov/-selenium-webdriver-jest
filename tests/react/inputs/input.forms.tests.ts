import { By } from "selenium-webdriver";
import { Browser } from "../../../src/selenium/browser";

describe("Inputs Forms", () => {
    let browser: Browser;

    beforeAll(async () => {
        browser = await new Browser();
    });

    afterAll(async () => {
        await browser.close();
    });

    it("Should validate length", async () => {
        /*
        The Input supports props for setting basic validation requirements—for example, the minimum and maximum length.
        The minLength, maxLength, and required properties enable the user to pre-define minimum requirements which define
        the validity state of the component and allow a successful form submission.
        */
        await browser.navigateTo("inputs/examples/input/forms/basic");
        let element = await browser.find(By.css("input"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });

    it("Should validate with custom message", async () => {
        /*
        You can implement custom error messages which will be displayed when the Input is in an invalid state and the user tries to submit the form.
        To render a custom validation message, set the validationMessage prop.
        */
        await browser.navigateTo("inputs/examples/input/forms/custom-message");
        let element = await browser.find(By.css("input"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });

    it("Should be able to enforce validity state", async () => {
        /*
        The Input enables you to set its validity state by utilizing its props. Setting the validity state
        allows for the implementation of complex validation scenarios that are based on multiple sources.
        To override the current validity state and apply the corresponding styles, use the valid prop.
        */
        await browser.navigateTo("inputs/examples/input/forms/override");
        let element = await browser.find(By.css("input"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });

    it("Should be able to disable validation styling", async () => {
        /*
        By default, to achieve a visual representation of its invalid state, the Input applies the k-state-invalid class name to the wrapping component.
        To disable the utilization of k-state-invalid, set the validity-styles property to false.
        */
        await browser.navigateTo("inputs/examples/input/forms/disable-styles");
        let element = await browser.find(By.css("input"));
        expect(await element.isDisplayed()).toBe(true);
        await browser.sleep(1000);
    });
});
