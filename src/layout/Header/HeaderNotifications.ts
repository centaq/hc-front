import { ComponentBase } from '../ComponentBase';
import { IComponent } from 'src/interfaces/IComponent';
import { INotificationData } from '../../interfaces/IData';


export class HeaderNotifications extends ComponentBase implements IComponent {

    constructor() {
        super();
    }

    public bind() {

    }
    
    private renderElement(el: INotificationData): string {
        let icon = 'fas fa-burn';
        return `<li data=` + el.id + `>
            <a href="#">
                <div class="row">
                    <div class="col-xs-3 col-md-3">
                        <span class="fa big-icon ` + icon + ` device-icon align-middle"></span>
                    </div>
                    <div class="col-xs-9 col-md-9">
                        <p>` + el.msg + `</p>
                        <span class="notification-date" style="font-size: 10px">` + el.date + `</span>
                    </div>
                </div>
            </a>
        </li>`;
    }

    public render(): string {
        let content =  `
        <li class="nav-item"><a href="#" data-toggle="dropdown" role="button" aria-expanded="false" class="nav-link dropdown-toggle"><i class="fas fa-expand" aria-hidden="true"></i><span class="indicator-nt"></span></a>
            <div role="menu" class="notification-author dropdown-menu animated flipInX">
                <div class="notification-single-top">
                    <h1>Notifications</h1>
                </div>
                <ul class="notification-menu">`;
        content += this.renderElement({id: 1, level: 2, msg: '222', date: '2019-02-22 22:22:22'} as INotificationData);
        content += this.renderElement({id: 2, level: 1, msg: 'Jakiś komunikat odnosnie cos tkam innego do powiedzenia', date: '2019-02-22 22:22:22'} as INotificationData);
        content += this.renderElement({id: 3, level: 3, msg: '222', date: '2019-02-22 22:22:22'} as INotificationData);
        content += `</ul>
                <div class="notification-view">
                    <a href="#">View All Notification</a>
                </div>
            </div>
        </li>`;
        return content;
    }
}