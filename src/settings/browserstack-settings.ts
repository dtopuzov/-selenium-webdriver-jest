export class BSSettings {
    public static get userName(): string {
        return process.env["BS_USER_NAME"];
    }

    public static get accessKey(): string {
        return process.env["BS_ACCESS_KEY"];
    }

    public static get browserName(): string {
        return process.env["BS_BROWSER_NAME"] || "Android";
    }

    public static get osVersion(): string {
        return process.env["BS_OS_VERSION"] || "10.0";
    }

    public static get deviceName(): string {
        return process.env["BS_DEVICE_NAME"] || "Google Pixel 4";
    }

    public static get realMobile(): string {
        return process.env["BS_REAL_MOBILE"] || "true";
    }

    public static get local(): string {
        return process.env["BS_LOCAL"] || "false";
    }

    public static get buildName(): string {
        return process.env["BS_BUILD_NAME"] || "BStack Test";
    }

    public static get buildNumber(): string {
        return process.env["BS_BUILD_NUMBER"] || "BStack Build 1";
    }
}
