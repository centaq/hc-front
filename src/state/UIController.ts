import { SidebarMenu } from "../layout/Sidebar/SidebarMenu";
import { MobileMenu } from "../layout/MobileMenu/MobileMenu";

import { UICmdEnum } from "./UICmdEnum";
import { IMainPanel } from "src/interfaces/IMainPanel";
import { StateQueue } from "./StateQueue";
import { StateCmdEnum } from "./StateCmdEnum";
import { Popup } from "../components/Popup";
import * as bootstrap from "bootstrap";
import { UIControllerHelper } from "../helpers/UIControllerHelper";
import { DebugInfo } from "../layout/DebugInfo";

export class UIController {
    private static rootId: string;
    private static mainPanel: IMainPanel;

    public static init(rootId: string) {
        this.rootId = rootId;
    }

    public static exec(cmd: UICmdEnum, arg: any) {
        switch (cmd) {
            case UICmdEnum.LogMessage:
                console.log(arg);
                break;
            case UICmdEnum.WaitingForDataState:
                $("#status-area-wait-time").text(arg);
                break;
            case UICmdEnum.ShowMessage:
                alert(arg.msg);
                break;
            case UICmdEnum.ToogleLoaderVisibility:
                $(".loader-container").css('display', 'none');
                break;
            case UICmdEnum.LoadLayout:
                this.loadLayout();
                break;
            case UICmdEnum.MountPanel:
                this.mountPanel(arg);
                break;
            case UICmdEnum.SwitchPanel:
                this.switchPanel(arg);
                break;
            case UICmdEnum.ShowLoader:
                $(".loader-container").css('display', 'block');
                $(".loader-container").css('display', 'none');
                break;
            case UICmdEnum.HideLoader:
                $(".loader-container").css('display', 'none');
                break;
            case UICmdEnum.UpdateDeviceData:
                this.mainPanel?.update(arg);
                break;
            case UICmdEnum.DataActualityState:
                var icon = $("#status-area-icon span");
                if (arg.state) {
                    icon.removeClass("fa-times");
                    icon.addClass("fa-check");
                    icon.css("color", "green");
                } else {
                    icon.removeClass("fa-check");
                    icon.addClass("fa-times");
                    icon.css("color", "red");
                }
                var req = arg.state ? new Date(arg.reqDate).toLocaleTimeString() : "-";
                var db = arg.state ? new Date(arg.dbDate).toLocaleTimeString() : "-";
                
                $("#status-area-refresh-date").text(req);
                $("#status-area-db-date").text(db);
                
                break;
            case UICmdEnum.UpdateStatsData:
                this.mainPanel?.update(arg);
                break;
            case UICmdEnum.ShowPopup:
                this.showPopup(arg);
                break;
            default:
                console.log("Nieobsluzony wyjatek");
        }
    }

    private static loadLayout() {
        let sm = new SidebarMenu();
        let mm = new MobileMenu();
        let di = new DebugInfo();
        ;
        $(this.rootId).prepend(sm.render());
        $(this.rootId + " .content-inner-all").append(mm.render());
        $(function() {
            sm.bind();
            mm.bind();
        });
        $(this.rootId).append(di.render());
    }

    private static mountPanel(arg: any) {
        this.mainPanel = UIControllerHelper.mountPanel(this.rootId, arg);
    }

    private static switchPanel(arg: any) {
        $('#main-panel').remove();
        this.mainPanel?.unbind();
        this.mainPanel = (<any>null);
        
        const panel = UIControllerHelper.mountPanel(this.rootId, arg);
        this.mainPanel = panel;
        
        StateQueue.enqueue(StateCmdEnum.PanelLoaded, panel.getDefinition());
    }

    private static showPopup(arg: any) { //TODO
        var l = new bootstrap.Alert("string");
        l.close();
        //console.log(t);
        //console.log($("#content-wrapper"));
        //$("#content-wrapper").append("<div>sdasdasddasd</div>");
        if ($('#exampleModal').length == 0 ) {

            console.log("ADD");
            const popup = new Popup();
            const t = popup.render();
            $("#content-wrapper").append(t);
        }
        console.log("shwdsdo");
        console.log($);
        console.log($('#exampleModal'));
        console.log($('#exampleModal').modal);
        ($('#exampleModal')).modal('show');
    }
}