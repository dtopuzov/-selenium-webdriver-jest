import AxeBuilder from '@axe-core/webdriverjs';
import { By } from "selenium-webdriver";
import { Browser } from '../../src/selenium/browser';

describe("Framework Examples", () => {
    let browser: Browser;

    beforeAll(async () => {
        browser = await new Browser();
    });

    beforeEach(async () => {
        await browser.refresh();
    });

    afterAll(async () => {
        await browser.close();
    });

    it("should be able to wait for condition", async () => {
        await browser.navigateTo("https://the-internet.herokuapp.com/dynamic_loading/1");

        let start = await browser.find(By.css("div[id='start'] > button"))
        await start.click();

        let content = await browser.find(By.id("finish"));
        let trueCondition = () => { return content.getRect().then(size => size.height > 30); };
        expect(await browser.waitSafely(trueCondition, 3000)).toBe(true);

        let falseCondition = () => { return content.getRect().then(size => size.height > 300); };
        expect(await browser.waitSafely(falseCondition, 3000)).toBe(false);
    });

    it("should detect accessibility violations", async () => {
        await browser.navigateTo("https://the-internet.herokuapp.com/checkboxes");
        let axe = new AxeBuilder(browser.driver);
        axe.include("#checkboxes");
        axe.disableRules("label");
        let result = await axe.analyze();
        expect(result.violations).toStrictEqual([]);
    });
});
