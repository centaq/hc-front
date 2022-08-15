import { ComponentBase } from '../ComponentBase';
import { IComponent } from 'src/interfaces/IComponent';

export class HeaderNotes extends ComponentBase implements IComponent {

    constructor() {
        super();
    }

    public bind() {

    }
    
    public render(): string {
        let content =  `
        <div id="Notes" class="tab-pane fade in active">
            <div class="notes-area-wrap">
                <div class="note-heading-indicate">
                    <h2><i class="fa fa-comments-o"></i> Latest Notes</h2>
                    <p>You have 10 new message.</p>
                </div>
                <div class="notes-list-area notes-menu-scrollbar">
                    <ul class="notes-menu-list">
                        <li>
                            <a href="#">
                                <div class="notes-list-flow">
                                    <div class="notes-img">
                                    </div>
                                    <div class="notes-content">
                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                        <span>Yesterday 2:45 pm</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="notes-list-flow">
                                    <div class="notes-img">
                                    </div>
                                    <div class="notes-content">
                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                        <span>Yesterday 2:45 pm</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="notes-list-flow">
                                    <div class="notes-img">
                                    </div>
                                    <div class="notes-content">
                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                        <span>Yesterday 2:45 pm</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="notes-list-flow">
                                    <div class="notes-img">
                                    </div>
                                    <div class="notes-content">
                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                        <span>Yesterday 2:45 pm</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="notes-list-flow">
                                    <div class="notes-img">
                                    </div>
                                    <div class="notes-content">
                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                        <span>Yesterday 2:45 pm</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="notes-list-flow">
                                    <div class="notes-img">
                                    </div>
                                    <div class="notes-content">
                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                        <span>Yesterday 2:45 pm</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="notes-list-flow">
                                    <div class="notes-img">
                                    </div>
                                    <div class="notes-content">
                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                        <span>Yesterday 2:45 pm</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="notes-list-flow">
                                    <div class="notes-img">
                                    </div>
                                    <div class="notes-content">
                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                        <span>Yesterday 2:45 pm</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="notes-list-flow">
                                    <div class="notes-img">
                                    </div>
                                    <div class="notes-content">
                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                        <span>Yesterday 2:45 pm</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="notes-list-flow">
                                    <div class="notes-img">
                                    </div>
                                    <div class="notes-content">
                                        <p> The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                        <span>Yesterday 2:45 pm</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>`;
        return content;
    }
}