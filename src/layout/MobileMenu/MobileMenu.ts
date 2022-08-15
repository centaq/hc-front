import { MobileMenuItem } from "./MobileMenuItem";
import { IComponent } from "../../interfaces/IComponent";
import { IMenuItem, IMenuSubItem  } from "../../interfaces/IMenu";
import { ComponentBase } from '../ComponentBase';
import './../../static/js/jquery.meanmenu.js'
    
export class MobileMenu extends ComponentBase implements IComponent {
    private elements: MobileMenuItem[] = [];
    private menu: IMenuItem[];
    
    constructor() {
        super();
        
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
        this.menu.forEach((el: IMenuItem) => {
            this.elements.push(new MobileMenuItem(el));
        });
    }

    public bind() : void {
		(<any>$('nav#dropdown')).meanmenu();
        this.elements.forEach(function(el) {
            el.bind();
        });
    }

    public render() : string {
        let content = `
        <div class="mobile-menu-area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="mobile-menu">
                            <nav id="dropdown">
                                <ul class="mobile-menu-nav">`;
        this.elements.forEach(function(el) {
            content += el.render();
        });
        content += `
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        return content;
    }
}