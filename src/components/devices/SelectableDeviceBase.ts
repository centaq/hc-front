
import { IDevice, IDeviceOptions, IDeviceContentOptions, IDeviceHeaderOptions, DefaultDeviceHeader, SelectableDeviceContent } from "../../interfaces/IDevice";
import { DeviceBase } from "./DeviceBase";
import  "jquery-sparkline";

export class SelectableDeviceBase extends DeviceBase implements IDevice {

    constructor(title: string, icon: string) {
        super({
            content: new SelectableDeviceContent({
                icon: icon,
                formatter: () => { return '' },
                stats: true
            } as IDeviceContentOptions, (type: string, sensorNo: number, cmd: any, val: any) => { this.stateChange(type, sensorNo, cmd, val); }),
            header: new DefaultDeviceHeader({
                title: title,
                collapsable: false,
                buttons: []
            } as IDeviceHeaderOptions)
        } as IDeviceOptions);
    }
    
    public getDefinition(): any {
        let definition = {};
        return definition;
    }

    public update(data: any) {
    }

    public stateChange(type: string, sensorNo: number, cmd: any, val: any) {
        console.log("asdasd");
        this.changeValueWithType(type, sensorNo.toString(), cmd, val);
    }

}