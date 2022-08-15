
import { IDevice, IDeviceOptions, IDeviceContentOptions, KnobDeviceContent, DefaultDeviceHeader, IDeviceHeaderOptions } from "../../interfaces/IDevice";
import { DeviceBase } from "./DeviceBase";
import  "jquery-sparkline";

export class LightFluentDevice extends DeviceBase implements IDevice {
    private sensor: string;

    constructor(title: string, sensor: string) {
        super({
            content: new KnobDeviceContent({
                icon: 'fas fa-lightbulb',
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
        this.classOverride = "col-lg-2 col-md-3 col-sm-3";
    }
    
    public getDefinition(): any {
        let definition = {};
        definition[this.sensor] = { stats: false };
        return definition;
    }

    public update(data: any) {
        this.options.content.update(data[this.sensor].data);
    }

    public stateChange(value: number) {
        this.changeValue(this.sensor, 1, value);
    }
}