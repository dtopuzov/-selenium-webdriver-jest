import { Browser } from "../../../src/selenium/browser";
import { Grid } from "../../../src/components/grid";
import { MatchImageSnapshotOptions } from "jest-image-snapshot";
import { Config } from "../const";

let browser: Browser;

beforeAll(() => {
    browser = new Browser();
});

afterAll(async () => {
    await browser.close();
});

it.each(["default", "material", "bootstrap"])("grid should look ok in %s theme", async (theme) => {
    await browser.navigateTo(`${Config.baseUrl}/grid/examples/a11y/basic-usage/?theme=${theme}`);
    const grid = new Grid(browser.driver);
    expect((await grid.DataRows()).length).toBe(10);

    const options: MatchImageSnapshotOptions = {
        customSnapshotIdentifier: `grid-a11y-basic-usage-${theme}`,
        failureThreshold: 25,
        failureThresholdType: "pixel",
    };

    expect(await browser.getScreenshot()).toMatchImageSnapshot(options);
});
