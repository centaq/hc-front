import { Guid } from 'guid-typescript';
import { SidebarMenuSubItem } from "./SidebarMenuSubItem";
import { IComponent } from "../../interfaces/IComponent";
import { IMenuItem, IMenuSubItem } from 'src/interfaces/IMenu';
import { ComponentBase } from '../ComponentBase';
import { StateQueue } from '../../state/StateQueue';
import { StateCmdEnum } from '../../state/StateCmdEnum';


export class SidebarMenuItem extends ComponentBase implements IComponent {
    private menuItem: IMenuItem;
    private subItems: SidebarMenuSubItem[] = [];
    private uid: string = Guid.create().toString();

    constructor(menuItem: IMenuItem) {
        super();
        this.menuItem = menuItem;
        if (this.menuItem.children != undefined) {
            this.menuItem.children.forEach((el: IMenuSubItem) => {
                this.subItems.push(new SidebarMenuSubItem(el));
            });
        }
    }

    public render(): string {
        const hasChildren = this.menuItem.children !== undefined && (<[]>this.menuItem.children).length > 0;
        let content = `
            <li class="nav-item `;
        if (hasChildren) {
            content += "dropdown";
        }
        
        content += `">`;
        if (hasChildren) {
            content += `
                <a id="` + this.uid + `" class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                <i class="fa big-icon ` + this.menuItem.icon + `"></i> 
                <span class="mini-dn">` + this.menuItem.title + `</span>
                </a>`;
        } else {
            content +=
                `<a id="` + this.uid + `" class="nav-link" href="#">
                <i class="fa big-icon ` + this.menuItem.icon + `"></i> 
                <span class="mini-dn">` + this.menuItem.title + `</span>
                </a>`;
        }

                    //  if (this.menuItem.children !== undefined && (<[]>this.menuItem.children).length > 0)
      //      content += `<span class="indicator-right-menu mini-dn">
      //                      <i class="fa indicator-mn fa-angle-left"></i>
      //                  </span>`;
        content += `</a>`;
        
        if (hasChildren) {
            content += `<ul class="dropdown-menu">`;
            this.subItems.forEach(function (el) {
                content += el.render();
            });
            content += `</ul>`;
            /*
            content += `<div role="menu" class="dropdown-menu left-menu-dropdown animated flipInX">`;
            this.subItems.forEach(function (el) {
                content += el.render();
            });
            content += `</div>`;
            */
        }
        content += `</li>`;
        return content;
    }

    public bind(): void {
        if (this.subItems.length == 0 && this.menuItem.name !== undefined) {
            $("#" + this.uid).click(() => {
                StateQueue.enqueue(StateCmdEnum.MountPanel, <string>this.menuItem.name);
            });
        } else {
            this.subItems.forEach(function (el) {
                el.bind();
            });
        }
    }
}