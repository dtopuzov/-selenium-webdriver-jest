export class Config {
    public static get ngUrl(): string {
        return process.env["NG_URL"] || "https://www.telerik.com/kendo-angular-ui/components";
    }

    public static get reactUrl(): string {
        return process.env["REACT_URL"] || "https://www.telerik.com/kendo-react-ui/components";
    }

    public static get vueUrl(): string {
        return process.env["VUE_URL"] || "https://www.telerik.com/kendo-vue-ui/components";
    }
}
