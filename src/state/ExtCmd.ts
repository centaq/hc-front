import { DataCmdEnum } from "./DataCmdEnum";
import { ExtCmdType } from "./ExtCmdType";
import { UICmdEnum } from "./UICmdEnum";

export class ExtCmd {
    private cmdType: ExtCmdType;
    private cmd: any;
    private arg: any;

    public get getCmdType(): ExtCmdType {
        return this.cmdType;
    }

    public get getCmd(): any {
        return this.cmd;
    }

    public get getArg(): any {
        return this.arg;
    }

    public constructor(cmdType: ExtCmdType, cmd: any, arg: any) {
        this.cmdType = cmdType;
        this.cmd = cmd;
        this.arg = arg;
    }

    public static createDataCmd(cmd: DataCmdEnum, arg: any = undefined) {
        return new ExtCmd(ExtCmdType.Data, cmd, arg);
    }

    public static createUICmd(cmd: UICmdEnum, arg: any = undefined) {
        return new ExtCmd(ExtCmdType.UI, cmd, arg);
    }
}