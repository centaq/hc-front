
import { IComponent } from "../../interfaces/IComponent";
import { ComponentBase } from '../ComponentBase';

export class HeaderMenu extends ComponentBase implements IComponent {

    constructor() {
        super();
    }

    public render(): string {
        return `
            <div class="col-lg-6 col-md-1 col-sm-1 col-xs-1">
                <div class="header-top-menu tabl-d-n">
                    <ul class="nav navbar-nav mai-top-nav" style="flex-direction: row">
                        <li class="nav-item"><a href="#" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item"><a href="#" class="nav-link">About</a>
                        </li>
                        <li class="nav-item"><a href="#" class="nav-link">Services</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" class="nav-link dropdown-toggle">Project <span class="angle-down-topmenu"><i class="fa fa-angle-down"></i></span></a>
                            <div role="menu" class="dropdown-menu animated flipInX">
                                <a href="#" class="dropdown-item">Company Info</a>
                                <a href="#" class="dropdown-item">Documentation</a>
                                <a href="#" class="dropdown-item">Expert Backend</a>
                                <a href="#" class="dropdown-item">Expert FrontEnd</a>
                                <a href="#" class="dropdown-item">Contact Support</a>
                            </div>
                        </li>
                        <li class="nav-item"><a href="#" class="nav-link">Support</a>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }

    public bind() {

    }
}