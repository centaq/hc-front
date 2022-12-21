import { IComponent } from "../interfaces/IComponent";
import { ComponentBase } from './ComponentBase';


export class DebugInfo extends ComponentBase implements IComponent {

    constructor() {
        super();
    }

    public render(): string {

        let content = ` <div class="debug-info">
            <div class="timestamp-area">
                <span>_</span>
            </div>
        </div>`;

        return content;
    }

    public bind(): void {
    }
}