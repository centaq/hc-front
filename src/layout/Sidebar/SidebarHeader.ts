
import { IComponent } from "../../interfaces/IComponent";

import '../../Env';

export class SidebarHeader implements IComponent {
    constructor() {

    }

    public render(): string {
        return `
        <div class="sidebar-header">
            <div class="sidebar-header-button-area">
                <button type="button" id="sidebarCollapse" class="btn">
                    <i class="fa fa-bars"></i>
                </button>
                <h3>` + process.env.SiteTitle + `</h3>
            </div>
            <strong>` + process.env.SiteTitleShort + `</strong>
        </div>`;
    }

    public bind(): void {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
			$("body").toggleClass("mini-navbar");
        });
    }
}