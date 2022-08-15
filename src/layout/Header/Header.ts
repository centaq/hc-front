import { ComponentBase } from '../ComponentBase';
import { IComponent } from 'src/interfaces/IComponent';
import { HeaderLeftInfo } from './HeaderLeftInfo';
import { HeaderMenu } from './HeaderMenu';
import { HeaderRightInfo } from './HeaderRightInfo';

export class Header extends ComponentBase implements IComponent {
    private leftInfo: HeaderLeftInfo;
    private menu: HeaderMenu;
    private rightInfo: HeaderRightInfo;

    constructor() {
        super();
        
        this.leftInfo = new HeaderLeftInfo();
        this.menu = new HeaderMenu();
        this.rightInfo = new HeaderRightInfo();
    }

    public bind() {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
			$("body").toggleClass("mini-navbar");
        });
        	
		$('#sidebarCollapse').on('click', function () {
			
		});
    }
    
    public render(): string {
        let content =  `
        <div class="header-top-area">
            <div class="fixed-header-top">
                <div class="container-fluid">
                    <div class="row">
                    `;
        content += this.leftInfo.render();
        content += this.menu.render();
        content += this.rightInfo.render();
        content +=            `
                    </div>
                </div>
            </div>
        </div>`;
        return content;
    }
}