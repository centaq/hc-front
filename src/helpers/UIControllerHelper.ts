import { PanelEnum } from "../components/PanelEnum";
import * as panels from '../components/panels/index'

export class UIControllerHelper {
    public static mountPanel(rootId: string, arg: any): any {
        const panel = new (<any>panels)[arg](this);
        if (UIControllerHelper.isFullScreenPanel(arg)) {
            $(rootId + " .content-inner-all").addClass("without-menu");
        } else {
            $(rootId + " .content-inner-all").removeClass("without-menu");
        }

        $(rootId + " .content-inner-all").append(panel.render());
        panel.bind();
        return panel;
    }

    private static isFullScreenPanel(panel: PanelEnum): boolean {
        return panel == PanelEnum.Login;
    }
}