import { By, WebElement } from "selenium-webdriver";

export class EC {
    public static hasChild(element: WebElement, locator: By): () => Promise<boolean> {
        return () => element.findElements(locator).then(result => {
            return result.length > 0;
        });
    }

    public static hasFocus(element: WebElement): () => Promise<boolean> {
        let driver = element.getDriver();
        return () => driver.switchTo().activeElement().getId().then(async id => {
            return id == await element.getId();
        });
    }

    public static hasValue(element: WebElement, value: string): () => Promise<boolean> {
        return () => element.getAttribute("value").then(result => {
            return result == value;
        });
    }

    public static hasText(element: WebElement, text: string): () => Promise<boolean> {
        return () => element.getText().then(result => {
            return result == text;
        });
    }
}
