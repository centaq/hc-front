import { ComponentBase } from '../ComponentBase';
import { IComponent } from 'src/interfaces/IComponent';


export class HeaderProjects extends ComponentBase implements IComponent {

    constructor() {
        super();
    }

    public bind() {

    }
    
    public render(): string {
        let content =  `
        <div id="Projects" class="tab-pane fade">
            <div class="projects-settings-wrap">
                <div class="note-heading-indicate">
                    <h2><i class="fa fa-cube"></i> Latest projects</h2>
                    <p> You have 20 projects. 5 not completed.</p>
                </div>
                <div class="project-st-list-area project-st-menu-scrollbar">
                    <ul class="projects-st-menu-list">
                        <li>
                            <a href="#">
                                <div class="project-list-flow">
                                    <div class="projects-st-heading">
                                        <h2>Web Development</h2>
                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                        <span class="project-st-time">1 hours ago</span>
                                    </div>
                                    <div class="projects-st-content">
                                        <p>Completion with: 28%</p>
                                        <div class="progress progress-mini">
                                            <div style="width: 28%;" class="progress-bar progress-bar-danger"></div>
                                        </div>
                                        <p>Project end: 4:00 pm - 12.06.2014</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="project-list-flow">
                                    <div class="projects-st-heading">
                                        <h2>Software Development</h2>
                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                        <span class="project-st-time">2 hours ago</span>
                                    </div>
                                    <div class="projects-st-content project-rating-cl">
                                        <p>Completion with: 68%</p>
                                        <div class="progress progress-mini">
                                            <div style="width: 68%;" class="progress-bar"></div>
                                        </div>
                                        <p>Project end: 4:00 pm - 12.06.2014</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="project-list-flow">
                                    <div class="projects-st-heading">
                                        <h2>Graphic Design</h2>
                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                        <span class="project-st-time">3 hours ago</span>
                                    </div>
                                    <div class="projects-st-content">
                                        <p>Completion with: 78%</p>
                                        <div class="progress progress-mini">
                                            <div style="width: 78%;" class="progress-bar"></div>
                                        </div>
                                        <p>Project end: 4:00 pm - 12.06.2014</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="project-list-flow">
                                    <div class="projects-st-heading">
                                        <h2>Web Design</h2>
                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                        <span class="project-st-time">4 hours ago</span>
                                    </div>
                                    <div class="projects-st-content project-rating-cl2">
                                        <p>Completion with: 38%</p>
                                        <div class="progress progress-mini">
                                            <div style="width: 38%;" class="progress-bar progress-bar-danger"></div>
                                        </div>
                                        <p>Project end: 4:00 pm - 12.06.2014</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="project-list-flow">
                                    <div class="projects-st-heading">
                                        <h2>Business Card</h2>
                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                        <span class="project-st-time">5 hours ago</span>
                                    </div>
                                    <div class="projects-st-content">
                                        <p>Completion with: 28%</p>
                                        <div class="progress progress-mini">
                                            <div style="width: 28%;" class="progress-bar progress-bar-danger"></div>
                                        </div>
                                        <p>Project end: 4:00 pm - 12.06.2014</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="project-list-flow">
                                    <div class="projects-st-heading">
                                        <h2>Ecommerce Business</h2>
                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                        <span class="project-st-time">6 hours ago</span>
                                    </div>
                                    <div class="projects-st-content project-rating-cl">
                                        <p>Completion with: 68%</p>
                                        <div class="progress progress-mini">
                                            <div style="width: 68%;" class="progress-bar"></div>
                                        </div>
                                        <p>Project end: 4:00 pm - 12.06.2014</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="project-list-flow">
                                    <div class="projects-st-heading">
                                        <h2>Woocommerce Plugin</h2>
                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                        <span class="project-st-time">7 hours ago</span>
                                    </div>
                                    <div class="projects-st-content">
                                        <p>Completion with: 78%</p>
                                        <div class="progress progress-mini">
                                            <div style="width: 78%;" class="progress-bar"></div>
                                        </div>
                                        <p>Project end: 4:00 pm - 12.06.2014</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="project-list-flow">
                                    <div class="projects-st-heading">
                                        <h2>Wordpress Theme</h2>
                                        <p> The point of using Lorem Ipsum is that it has a more or less normal.</p>
                                        <span class="project-st-time">9 hours ago</span>
                                    </div>
                                    <div class="projects-st-content project-rating-cl2">
                                        <p>Completion with: 38%</p>
                                        <div class="progress progress-mini">
                                            <div style="width: 38%;" class="progress-bar progress-bar-danger"></div>
                                        </div>
                                        <p>Project end: 4:00 pm - 12.06.2014</p>
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