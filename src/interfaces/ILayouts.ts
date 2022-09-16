import { Guid } from "guid-typescript";

export interface ILayout {
    render(content: string): string;
    updateIconClass(add: boolean, className: string): void;
}

export class HorizontalLayout implements ILayout {
    private uid: string;
    private icon: string;
    private contentClass: string;

    constructor(icon: string, contentClass: string = '') {
        this.uid = Guid.create().toString();
        this.icon = icon;
        this.contentClass = contentClass;
    }

    public render(content: string): string {
        let tmp = `
        <div id="` + this.uid + `" class="row">
            <div class="col-3 col-3">
                <div class="author-per-img content-left-image">
                    <span class='fa big-icon ` + this.icon + ` device-icon align-middle'></span>
                </div>
            </div>
            <div class="col-9 col-9 ` + this.contentClass + `">`;
        tmp += content;
        tmp += 
            `</div>
        </div>`;

        return tmp;
    }

    public updateIconClass(add: boolean, className: string) {
        let icon = $("#" + this.uid + " .device-icon");
        if (add) {
            icon.addClass(className);
        } else {
            icon.removeClass(className);
        }
    }
}