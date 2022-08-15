import { ComponentBase } from '../ComponentBase';
import { IComponent } from 'src/interfaces/IComponent';

export class HeaderSettings extends ComponentBase implements IComponent {

    constructor() {
        super();
    }

    public bind() {

    }
    
    public render(): string {
        let content =  `
        <div id="Settings" class="tab-pane fade in active">
            <div class="setting-panel-area">
                <div class="note-heading-indicate">
                    <h2><i class="fa fa-gears"></i> Settings Panel</h2>
                    <p> You have 20 Settings. 5 not completed.</p>
                </div>
                <ul class="setting-panel-list">
                    <li>
                        <div class="checkbox-setting-pro">
                            <div class="checkbox-title-pro">
                                <h2>Show notifications</h2>
                                <div class="ts-custom-check">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="example">
                                        <label class="onoffswitch-label" for="example">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="checkbox-setting-pro">
                            <div class="checkbox-title-pro">
                                <h2>Disable Chat</h2>
                                <div class="ts-custom-check">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="example3">
                                        <label class="onoffswitch-label" for="example3">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="checkbox-setting-pro">
                            <div class="checkbox-title-pro">
                                <h2>Enable history</h2>
                                <div class="ts-custom-check">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="example4">
                                        <label class="onoffswitch-label" for="example4">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="checkbox-setting-pro">
                            <div class="checkbox-title-pro">
                                <h2>Show charts</h2>
                                <div class="ts-custom-check">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="example7">
                                        <label class="onoffswitch-label" for="example7">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="checkbox-setting-pro">
                            <div class="checkbox-title-pro">
                                <h2>Update everyday</h2>
                                <div class="ts-custom-check">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="collapsemenu" checked="" class="onoffswitch-checkbox" id="example2">
                                        <label class="onoffswitch-label" for="example2">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="checkbox-setting-pro">
                            <div class="checkbox-title-pro">
                                <h2>Global search</h2>
                                <div class="ts-custom-check">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="collapsemenu" checked="" class="onoffswitch-checkbox" id="example6">
                                        <label class="onoffswitch-label" for="example6">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="checkbox-setting-pro">
                            <div class="checkbox-title-pro">
                                <h2>Offline users</h2>
                                <div class="ts-custom-check">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="collapsemenu" checked="" class="onoffswitch-checkbox" id="example5">
                                        <label class="onoffswitch-label" for="example5">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

            </div>
        </div>`;
        return content;
    }
}