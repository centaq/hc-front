
import { IComponent } from "../../interfaces/IComponent";
import { ComponentBase } from '../ComponentBase';

export class HeaderLeftInfo extends ComponentBase implements IComponent {

    constructor() {
        super();
    }

    public render(): string {
        return `
            
            <div class="mobile-menu-placeholder col-lg-1 col-md-6 col-sm-6 col-xs-5">
                <button type="button" id="sidebarCollapse" class="btn bar-button-pro header-drl-controller-btn btn-info navbar-btn">
                    <i class="fa fa-bars"></i>
                </button>
            </div>
        `;
    }

    public bind() {

    }
}