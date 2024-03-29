import { PanelEnum } from "../panels/PanelEnum";
import { DataCmdEnum } from "./DataCmdEnum";
import { ExtCmd } from "./ExtCmd";
import { State } from "./State";
import { StateCmdEnum } from "./StateCmdEnum";
import { UICmdEnum } from "./UICmdEnum";
import { MsgLevel, UICmdHelper } from "./UICmdHelper";

export class StateController {
    private static state: State;

    public static initState() {
        this.state = new State();
        this.state.waitingForData = 0;
    }
    
    public static exec(cmd: StateCmdEnum, arg: any): Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();
        switch (cmd) {
            case StateCmdEnum.Tick100ms:
                extCmds = this.tick100ms();
                break;
            case StateCmdEnum.Init:
                extCmds = this.init();
                break;
            case StateCmdEnum.IsSessionValidResult:
                extCmds = this.isSessionValidResult(arg);
                break;
            case StateCmdEnum.Login:
                extCmds = this.login(arg);
                break;
            case StateCmdEnum.LoginResult:
                extCmds = this.loginResult(arg);
                break;
            case StateCmdEnum.PanelLoaded:
                extCmds = this.panelLoaded(arg);
                break;
            case StateCmdEnum.RegisterResult:
                extCmds = this.registerResult(arg);
                break;
            case StateCmdEnum.UpdateDeviceData:
                extCmds = this.updateDeviceData(arg);
                break;
            case StateCmdEnum.UpdateDeviceDataError:
                console.log({"Update Errror": arg});
                break;
            case StateCmdEnum.MountPanel:
                extCmds = this.switchPanel(arg);
                break;
            case StateCmdEnum.DeviceStateChange:
                extCmds = this.deviceStateChange(arg);
                break;
            case StateCmdEnum.ShowPopup:
                extCmds = this.showPopup(arg);
                break;
            case StateCmdEnum.StatsRefresh:
                extCmds = this.statsRefresh(arg);
                break;
            case StateCmdEnum.StatsRefreshResult:
                extCmds = this.statsRefreshResult(arg);
                break;
            case StateCmdEnum.VisibilityChanged:
                extCmds = this.visibilityChanged(arg);
                break;
        }
        return extCmds;
    }

    private static tick100ms(): Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();
        if (this.state.isDataTokenSet) {
            extCmds.push(ExtCmd.createUICmd(UICmdEnum.WaitingForDataState, this.state.waitingForData));
            if(this.state.waitingForData == 1) {
                extCmds.push(ExtCmd.createDataCmd(DataCmdEnum.GetDeviceData, this.state.dataToken));
            }
            if (this.state.waitingForData > 0) {
                this.state.waitingForData--;
            }
        }
        return extCmds;
    }

    private static init(): Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();
        extCmds.push(ExtCmd.createUICmd(UICmdEnum.LogMessage, "to wiadomosć ze state;a"));
        extCmds.push(ExtCmd.createDataCmd(DataCmdEnum.IsSessionValid));
        return extCmds;
    }

    private static isSessionValidResult(arg: any): Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();
        if (!arg.result) {
            extCmds.push(ExtCmd.createUICmd(UICmdEnum.MountPanel, PanelEnum.Login));
        } else {
            extCmds = extCmds.concat(this.setUserLogged(arg.session));
        }
        extCmds.push(ExtCmd.createUICmd(UICmdEnum.ToogleLoaderVisibility, false));
        return extCmds;
    }

    private static login(arg: any): Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();
        extCmds.push(ExtCmd.createDataCmd(DataCmdEnum.Login, arg));
        return extCmds;
    }

    private static loginResult(arg: any): Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();
        if (arg.result) {
            extCmds = extCmds.concat(this.setUserLogged(arg.session));
        } else {
            extCmds.push(ExtCmd.createUICmd(UICmdEnum.ShowMessage, UICmdHelper.CreateMsg("Logowanie się nie powiodło", MsgLevel.Info)));
        }
        //extCmds.push(ExtCmd.createDataCmd(DataCmdEnum.Login, arg));
        return extCmds;
    }

    private static switchPanel(panel: string): Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();
        this.state.loading = true;
        this.state.deviceDefinition = null;
        this.state.waitingForData = 0;
        this.state.dataToken = '';
        this.state.isDataTokenSet = false;
        extCmds.push(ExtCmd.createUICmd(UICmdEnum.ShowLoader));
        extCmds.push(ExtCmd.createUICmd(UICmdEnum.SwitchPanel, panel));
        return extCmds;
    }

    private static panelLoaded(arg: any): Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();

        this.state.deviceDefinition = arg;

        if (Object.keys(this.state.deviceDefinition || []).length > 0) {
            extCmds.push(ExtCmd.createDataCmd(DataCmdEnum.Register, this.state.deviceDefinition));
        }

        return extCmds;
    }

    private static registerResult(arg: any): Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();

        this.state.dataToken = arg;
        this.state.isDataTokenSet = true;
        
        extCmds.push(ExtCmd.createDataCmd(DataCmdEnum.GetDeviceData, this.state.dataToken));

        return extCmds;
    }

    private static updateDeviceData(arg: any): Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();

        if (this.state.loading) {
            this.state.loading = false;
            extCmds.push(ExtCmd.createUICmd(UICmdEnum.HideLoader));
        }

        if (this.state.isDataTokenSet) {
            if (arg.params == this.state.dataToken) {
                extCmds.push(ExtCmd.createUICmd(UICmdEnum.UpdateDeviceData, arg.value));
                extCmds.push(ExtCmd.createUICmd(UICmdEnum.DataActualityState, { state: true, reqDate : arg.date, dbDate: arg.value.date }));
                this.state.waitingForData = 50;
            } else {
                extCmds.push(ExtCmd.createUICmd(UICmdEnum.LogMessage, "niepoprawny token. State: " + this.state.dataToken + "; z servera: " + arg.params));
            }
        }

        return extCmds;
    }

    private static deviceStateChange(arg: any): Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();

        extCmds.push(ExtCmd.createDataCmd(DataCmdEnum.DeviceStateChange, arg));

        return extCmds;
    }

    private static showPopup(arg: any) : Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();

        extCmds.push(ExtCmd.createUICmd(UICmdEnum.ShowPopup, arg));

        return extCmds;
    }

    private static statsRefresh(arg: any) : Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();
        console.log("stats refresh");
        this.state.dataToken = arg.guid.value;
        extCmds.push(ExtCmd.createDataCmd(DataCmdEnum.StatsRefresh, arg));

        return extCmds;
    }

    private static statsRefreshResult(arg: any) : Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();
        if (this.state.dataToken === arg.guid.value) {
            extCmds.push(ExtCmd.createUICmd(UICmdEnum.UpdateStatsData, arg.data));
        }

        return extCmds;
    }

    private static setUserLogged(session: any) : Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();
        console.log(session);
        this.state.sessionId = session.id;
        this.state.user = session.user;
        let panel: string = PanelEnum.Dashboard;
        if (session.user.toLowerCase() === "marcin") {
            panel = PanelEnum.Dashboard;
        } else if (session.user.toLowerCase() === "ania") {
            panel = PanelEnum.AniasDashboard;
        }
        extCmds.push(ExtCmd.createUICmd(UICmdEnum.LoadLayout));
        extCmds = extCmds.concat(this.switchPanel(panel));
        return extCmds;
    }

    private static visibilityChanged(visible: boolean) : Array<ExtCmd> {
        var extCmds: Array<ExtCmd> = new Array<ExtCmd>();
        if (!visible) {
            this.state.reappearing = true;
            this.state.waitingForData = 0;
            extCmds.push(ExtCmd.createUICmd(UICmdEnum.DataActualityState, { state: false, reqDate : null, dbDate: null }));
        } else {
            if (this.state.reappearing) {
                this.state.waitingForData = 10;
            }

            this.state.reappearing = false;
        }
        return extCmds;
    }
}