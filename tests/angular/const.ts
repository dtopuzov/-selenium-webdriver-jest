export class Config {
    public static get baseUrl(): string {
        return process.env["BASE_URL"] || "https://www.telerik.com/kendo-angular-ui/components";
    }
}
