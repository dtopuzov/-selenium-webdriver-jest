import { By, WebDriver, WebElement } from "selenium-webdriver";

export type WaitCondition = (driver: WebDriver) => Promise<boolean>;

export class EC {
    public static hasText(element: WebElement, text: string): (driver: WebDriver) => Promise<boolean> {
        return () => element.getText().then(result => {
            return result == text;
        });
    }

    public static hasValue(element: WebElement, value: string): (driver: WebDriver) => Promise<boolean> {
        return () => element.getAttribute("value").then(result => {
            return result == value;
        });
    }

    public static hasFocus(element: WebElement): (driver: WebDriver) => Promise<boolean> {
        return async (driver: WebDriver) => {
            const focused = await driver.switchTo().activeElement();
            return await element.getId() == await focused.getId();
        }
    }

    public static hasChild(element: WebElement, locator: By): () => Promise<boolean> {
        return async () => {
            return element.findElements(locator).then(result => {
                return result.length > 0;
            });
        }
    }
}
