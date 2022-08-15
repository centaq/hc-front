import { ComponentBase } from '../ComponentBase';
import { IComponent } from 'src/interfaces/IComponent';


export class HeaderMessages extends ComponentBase implements IComponent {

    constructor() {
        super();
    }

    public bind() {

    }
    
    public render(): string {
        let content =  `
        <li class="nav-item dropdown">
            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" class="nav-link dropdown-toggle"><span class="icon chat-pro"></span><span class="indicator-ms"></span></a>
            <div role="menu" class="author-message-top dropdown-menu animated flipInX">
                <div class="message-single-top">
                    <h1>Message</h1>
                </div>
                <ul class="message-menu">
                    <li>
                        <a href="#">
                            <div class="message-img">
                            </div>
                            <div class="message-content">
                                <span class="message-date">16 Sept</span>
                                <h2>Advanda Cro</h2>
                                <p>Please done this project as soon possible.</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="message-img">
                            </div>
                            <div class="message-content">
                                <span class="message-date">16 Sept</span>
                                <h2>Sulaiman din</h2>
                                <p>Please done this project as soon possible.</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="message-img">
                            </div>
                            <div class="message-content">
                                <span class="message-date">16 Sept</span>
                                <h2>Victor Jara</h2>
                                <p>Please done this project as soon possible.</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="message-img">
                            </div>
                            <div class="message-content">
                                <span class="message-date">16 Sept</span>
                                <h2>Victor Jara</h2>
                                <p>Please done this project as soon possible.</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="message-view">
                    <a href="#">View All Messages</a>
                </div>
            </div>
        </li>`;
        return content;
    }
}