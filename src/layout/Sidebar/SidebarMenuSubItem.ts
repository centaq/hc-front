
import { IMenuSubItem } from "../../interfaces/IMenu";
import { IComponent } from "../../interfaces/IComponent";
import { ComponentBase } from '../ComponentBase';
import { StateQueue } from "../../state/StateQueue";
import { StateCmdEnum } from "../../state/StateCmdEnum";

export class SidebarMenuSubItem extends ComponentBase implements IComponent {
    private menuSubItem : IMenuSubItem;

    constructor(menuSubItem: IMenuSubItem) {
        super();
        this.menuSubItem = menuSubItem;
    }

    public render(): string {
        return `
            <li><a id="menu_` + this.menuSubItem.name + `" class="dropdown-item">` + this.menuSubItem.title + `</a></li>`;
    }

    public bind() {
        $("#menu_" + this.menuSubItem.name).click(() => {
            StateQueue.enqueue(StateCmdEnum.MountPanel, this.menuSubItem.name);
        });
    }

    public getMenuSubItem() : IMenuSubItem {
        return this.menuSubItem;
    }
}