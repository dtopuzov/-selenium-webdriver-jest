import { WebElement } from "selenium-webdriver";

export async function isAscending(cells: WebElement[]): Promise<boolean> {
    let isSorted = true;
    for (let i = 0; i < cells.length - 1; i++) {
        const text1 = await cells[i].getText();
        const text2 = await cells[i + 1].getText();
        if (text1.localeCompare(text2, undefined, { numeric: true, sensitivity: 'base' }) > 0) {
            isSorted = false;
            break;
        }
    }
    return isSorted;
}

export async function isDescending(cells: WebElement[]): Promise<boolean> {
    let isSorted = true;
    for (let i = 0; i < cells.length - 1; i++) {
        const text1 = await cells[i].getText();
        const text2 = await cells[i + 1].getText();
        if (text1.localeCompare(text2, undefined, { numeric: true, sensitivity: 'base' }) < 0) {
            isSorted = false;
            break;
        }
    }
    return isSorted;
}
