import { Guid } from 'guid-typescript';
import { MobileMenuSubItem } from "./MobileMenuSubItem";
import { IComponent } from "../../interfaces/IComponent";
import { IMenuItem, IMenuSubItem } from 'src/interfaces/IMenu';
import { ComponentBase } from '../ComponentBase';
import { StateQueue } from '../../state/StateQueue';
import { StateCmdEnum } from '../../state/StateCmdEnum';


export class MobileMenuItem extends ComponentBase implements IComponent {
    private menuItem: IMenuItem;
    private subItems: MobileMenuSubItem[] = [];
    private uid: string = Guid.create().toString();

    constructor(menuItem: IMenuItem) {
        super();
        this.menuItem = menuItem;
        if (this.menuItem.children != undefined) {
            this.menuItem.children.forEach((el: IMenuSubItem) => {
                this.subItems.push(new MobileMenuSubItem(el));
            });
        }
    }

    public render(): string {
        let content = `
            <li>
                <a id="` + this.uid + `" href="#" data-toggle="collapse" class="mean-expand-title">
                    ` + this.menuItem.title;
        if (this.menuItem.children !== undefined && (<[]>this.menuItem.children).length > 0)
            content += `<span class="admin-project-icon icon down-arrow"></span>`;
        content += `</a>
                <ul class="collapse dropdown-header-top">
            `;
        this.subItems.forEach(function (el) {
            content += el.render();
        });
        content += `
                </ul>
            </li>`;
        return content;
    }

    public bind(): void {
        if (this.subItems.length == 0 && this.menuItem.name !== undefined) {
            $("#" + this.uid).click(() => {
                $('.mean-clicked').click();
                $('.meanmenu-reveal').click(); 
                StateQueue.enqueue(StateCmdEnum.MountPanel, <string>this.menuItem.name);
            });
        } else {
            this.subItems.forEach(function (el) {
                el.bind();
            });
        }
    }
}