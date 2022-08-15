import { DataCmdEnum } from "./DataCmdEnum";
import { DataController } from "./DataController";
import { ExtCmd } from "./ExtCmd";
import { ExtCmdType } from "./ExtCmdType";
import { StateCmdEnum } from "./StateCmdEnum";
import { StateController } from "./StateController";
import { UICmdEnum } from "./UICmdEnum";
import { UIController } from "./UIController";

export class StateQueue {
    
    public static enqueue(cmd: StateCmdEnum, arg: any = null): void {
        //TODO tu powinno być dodanie do kolejki i metoda dequeue która pobiera z kolejki i wykonuje wykonywana w oddzielnym wątku
        //aktualnie jest po prostu operacja na stanie

        var extCmds: Array<ExtCmd> = StateController.exec(cmd, arg);
        extCmds.forEach(function(extCmd: ExtCmd) {
            StateQueue.dequeue(extCmd); 
        });
    }

    public static dequeue(extCmd: ExtCmd) {
        switch (extCmd.getCmdType) {
            case ExtCmdType.Data:
                console.log({cmdType: ExtCmdType[extCmd.getCmdType], cmd: DataCmdEnum[extCmd.getCmd], arg: extCmd.getArg});
                DataController.exec(extCmd.getCmd, extCmd.getArg);
                break;
            case ExtCmdType.UI:
                console.log({cmdType: ExtCmdType[extCmd.getCmdType], cmd: UICmdEnum[extCmd.getCmd], arg: extCmd.getArg});
                UIController.exec(extCmd.getCmd, extCmd.getArg);
                break;
        }
    }
}