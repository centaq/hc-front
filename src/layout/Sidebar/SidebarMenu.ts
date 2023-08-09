import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarHeader } from "./SidebarHeader";
import { IComponent } from "../../interfaces/IComponent";
import { IMenuItem, IMenuSubItem  } from "../../interfaces/IMenu";
import { ComponentBase } from '../ComponentBase';


export class SidebarMenu extends ComponentBase implements IComponent {
    private header: SidebarHeader;
    private elements: SidebarMenuItem[] = [];
    private menu: IMenuItem[];

    constructor() {
        super();

        this.header = new SidebarHeader();
        ///----------------
        //TODO poniższe tylko tymczasowe?
        this.menu = [{
            title: 'Dashboard',
            icon: 'fa-home',
            children: [{
                name: 'OfficePanel',
                title: 'Biuro'
            } as IMenuSubItem,{
                name: 'Dashboard',
                title: 'Dashboard'
            } as IMenuSubItem,{
                name: 'OutsideDashboard',
                title: 'Na zewnątrz'
            } as IMenuSubItem]
        } as IMenuItem, {
            title: 'Parter',
            icon: 'fa-home',
            children: [{
                name: 'BoilerRoom',
                title: 'Kotłownia'
            } as IMenuSubItem]
        } as IMenuItem, {
            title: 'Piętro',
            icon: 'fa-home'
        } as IMenuItem, { 
            title: 'Statystyki',
            name: 'StatsPanel',
            icon: 'far fa-chart-bar'
        } as IMenuItem, { 
            title: 'Multimedia',
            icon: 'fas fa-user'
        } as IMenuItem, { 
            title: 'Kamera',
            name: 'CameraPanel',
            icon: 'fas fa-user'
        } as IMenuItem, { 
            title: 'Ogród',
            icon: 'fas fa-user'
        } as IMenuItem, { 
            title: 'Wizualizacje',
            icon: 'fas fa-user'
        } as IMenuItem
        ];
        ///----------------
        this.menu.forEach((el: IMenuItem) => {
            this.elements.push(new SidebarMenuItem(el));
        });
    }

    public render(): string {

        let content = ` <div class="left-sidebar">
        <nav id="sidebar" class="active">` + 
            this.header.render()
        + `
            <div class="sidebar-menu-wrapper">
                <ul class="nav flex-column">`;
        
        this.elements.forEach(function(el) {
            content += el.render();
        });
        content += `
                </ul>
            </div>
        </nav>
    </div>`;

        return content;
    }

    public bind(): void {
        this.header.bind();
        this.elements.forEach(function(el) {
            el.bind();
        });
    }
}