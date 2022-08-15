import { ComponentBase } from '../ComponentBase';
import { IComponent } from 'src/interfaces/IComponent';


export class HeaderAccount extends ComponentBase implements IComponent {

    constructor() {
        super();
    }

    public bind() {

    }
    
    public render(): string {
        let content =  `
        <li class="nav-item">
            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" class="nav-link dropdown-toggle">
                <span class="icon user-rounded header-riht-inf"></span>
                <span class="admin-name">Advanda Cro</span>
                <span class="author-project-icon icon down-arrow"></span>
            </a>
            <ul role="menu" class="dropdown-header-top author-log dropdown-menu animated flipInX">
                <li><a href="#"><span class="icon home-admin author-log-ic"></span>My Account</a>
                </li>
                <li><a href="#"><span class="icon user-rounded author-log-ic"></span>My Profile</a>
                </li>
                <li><a href="#"><span class="icon money author-log-ic"></span>User Billing</a>
                </li>
                <li><a href="#"><span class="icon settings author-log-ic"></span>Settings</a>
                </li>
            </ul>
        </li>`;
        return content;
    }
}