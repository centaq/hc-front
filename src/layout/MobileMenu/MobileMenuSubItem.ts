import { Guid } from 'guid-typescript';
import { IMenuSubItem } from "../../interfaces/IMenu";
import { IComponent } from "../../interfaces/IComponent";
import { ComponentBase } from '../ComponentBase';
import { StateQueue } from '../../state/StateQueue';
import { StateCmdEnum } from '../../state/StateCmdEnum';

export class MobileMenuSubItem extends ComponentBase implements IComponent {
    private menuSubItem : IMenuSubItem;
    private uid: string = Guid.create().toString();

    constructor(menuSubItem: IMenuSubItem) {
        super();
        this.menuSubItem = menuSubItem;
    }

    public render(): string {
        return `
            <li><a id="` + this.uid + `">` + this.menuSubItem.title + `</a></li>
        `;
    }

    public bind() {
        console.log('bind subitem' + this.menuSubItem.name );
        $("#" + this.uid).click(() => {
            console.log('asdads');
            //$(".mean-nav ul:first").slideUp();
            //$('.meanmenu-reveal').removeClass('meanclose');
            $('.mean-clicked').click();
            $('.meanmenu-reveal').click(); 

            StateQueue.enqueue(StateCmdEnum.MountPanel, this.menuSubItem.name);
        });
    }

    public getMenuSubItem() : IMenuSubItem {
        return this.menuSubItem;
    }
}