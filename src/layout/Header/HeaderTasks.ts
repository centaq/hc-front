import { ComponentBase } from '../ComponentBase';
import { IComponent } from 'src/interfaces/IComponent';
import { HeaderSettings } from './HeaderSettings';


export class HeaderTasks extends ComponentBase implements IComponent {
    private headerSettings: HeaderSettings;

    constructor() {
        super();

        this.headerSettings = new HeaderSettings();
    }

    public bind() {

    }
    
    public render(): string {
        let content =  `
        <li class="nav-item nav-setting-open"><a href="#" data-toggle="dropdown" role="button" aria-expanded="false" class="nav-link dropdown-toggle"><i class="fa fa-tasks"></i></a>

            <div role="menu" class="admintab-wrap menu-setting-wrap menu-setting-wrap-bg dropdown-menu animated flipInX">
                <ul class="nav nav-tabs custon-set-tab">
                    <li class="active"><a data-toggle="tab" href="#Settings" aria-expanded="true">Settings</a>
                    </li>
                </ul>
                
                <div class="tab-content">`;
        content += this.headerSettings.render();

        content += `
                </div>
            </div>
        </li>`;
        return content;
    }
}