import { Browser } from "../../../src/selenium/browser";
import { Grid } from "../../../src/components/grid";
import { Config } from "../../const";

let browser: Browser;

beforeAll(() => {
    browser = new Browser();
});

afterAll(async () => {
    await browser.close();
});

it("sorting demo should be accessible", async () => {
    await browser.navigateTo(`${Config.reactUrl}/grid/examples/sorting/?theme=material`);
    const disableRules = ["aria-allowed-role", "presentation-role-conflict", "scrollable-region-focusable"];
    const errors = await browser.getAccessibilityViolations(Grid.Selector, disableRules);
    expect(errors).toEqual([]);
});
