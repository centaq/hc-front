import { Retriever } from "src/data/Retriever";
import { DataCmdEnum } from "./DataCmdEnum";
import { StateCmdEnum } from "./StateCmdEnum";
import { StateQueue } from "./StateQueue";

export class DataController {

    private static dataRetriever: Retriever;

    public static init(dataRetriever: Retriever) {
        this.dataRetriever = dataRetriever;
    }

    public static exec(cmd: DataCmdEnum, arg: any) {
        switch (cmd) {
            case DataCmdEnum.IsSessionValid:
                this.dataRetriever.logged().done((res) => {
                    StateQueue.enqueue(StateCmdEnum.IsSessionValidResult, res["logged"]);
                });
                break;
            case DataCmdEnum.Login:
                this.dataRetriever.login(arg).done((res: any, b: any, c: any) => {
                    StateQueue.enqueue(StateCmdEnum.LoginResult, {success: c.status == 200, sessionId: res.result});
                });
                break;
            case DataCmdEnum.Register:
                this.dataRetriever.register(arg).done((res: any) => {
                    StateQueue.enqueue(StateCmdEnum.RegisterResult, res.token);
                });
                break;
            case DataCmdEnum.GetDeviceData:
                this.dataRetriever.getData({ token: arg, stats: true }).done((res: any) => {
                    StateQueue.enqueue(StateCmdEnum.UpdateDeviceData, res);
                }).fail((err) => {
                    StateQueue.enqueue(StateCmdEnum.UpdateDeviceDataError, err);
                });
                break;
            case DataCmdEnum.DeviceStateChange:
                this.dataRetriever.stateChange(arg);
                break;
            case DataCmdEnum.StatsRefresh:
                this.dataRetriever.statsRefresh(arg).done((result: any) => {
                    StateQueue.enqueue(StateCmdEnum.StatsRefreshResult, result);
                })
                break;
        }
    }
}