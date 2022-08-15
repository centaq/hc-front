
import { IComponent } from "../../interfaces/IComponent";
import { ComponentBase } from '../ComponentBase';
import { HeaderNotifications } from './HeaderNotifications';
import { HeaderAccount } from './HeaderAccount';
import { HeaderTasks } from './HeaderTasks';

export class HeaderRightInfo extends ComponentBase implements IComponent {
    private headerNotifications: HeaderNotifications;
    private headerAccount: HeaderAccount;
    private headerTasks: HeaderTasks;

    constructor() {
        super();
        
        this.headerNotifications = new HeaderNotifications();
        this.headerAccount = new HeaderAccount();
        this.headerTasks = new HeaderTasks();
    }

    public render(): string {
        let content =  `
        <div class="col-lg-5 col-md-5 col-sm-6 col-xs-6">
            <div class="header-right-info">
                <ul class="nav navbar-nav mai-top-nav header-right-menu" style="flex-direction: row">`;
        content += this.headerNotifications.render();
        content += this.headerAccount.render();
        content += this.headerTasks.render();
        content += `
                </ul>
            </div>
        </div>
        `;
        return content;
    }

    public bind() {

    }
}