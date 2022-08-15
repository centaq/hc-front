
import { IDevice, IDeviceOptions, IDeviceContentOptions, RollerDeviceContent, DefaultDeviceHeader, IDeviceHeaderOptions } from "../../interfaces/IDevice";
import { DeviceBase } from "./DeviceBase";
import  "jquery-sparkline";

export class RollerDeviceBase extends DeviceBase implements IDevice {
    private sensor: string;

    constructor(title: string, icon: string, sensor: string) {
        super({
            content: new RollerDeviceContent({
                icon: icon,
                formatter: () => { return '' },
                stats: true
            } as IDeviceContentOptions, (state: number) => { this.stateChange(state); }),
            header: new DefaultDeviceHeader({
                title: title,
                collapsable: false,
                buttons: []
            } as IDeviceHeaderOptions)
        } as IDeviceOptions);
        this.sensor = sensor;
    }
    
    public getDefinition(): any {
        let definition = {};
        definition[this.sensor] = { stats: false };
        return definition;
    }

    public update(data: any) {
        //this.options.content.update(data[this.sensor].data);
    }

    public stateChange(state: number) {
        this.changeValue(this.sensor, state);
    }

}

