export class UICmdHelper {
    public static CreateMsg(msg: string, level: MsgLevel) {
        return {
            msg: msg,
            level: level
        }
    }
}

export enum MsgLevel {
    Error,
    Warning,
    Info
}