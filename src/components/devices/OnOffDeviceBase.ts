
import { IDevice, IDeviceOptions, IDeviceContentOptions, ButtonsDeviceContent, IDeviceHeaderOptions, DefaultDeviceHeader } from "../../interfaces/IDevice";
import { DeviceBase } from "./DeviceBase";
import  "jquery-sparkline";

export class OnOffDeviceBase extends DeviceBase implements IDevice {
    private sensors: string[];

    constructor(title: string, icon: string, sensor: string, sensor1?: string) {
        
        let sensors = [ sensor ];
        if (sensor1 !== undefined) {
            sensors.push(sensor1);
        }

        super({
            content: new ButtonsDeviceContent(
                sensors, {
                icon: icon,
                formatter: () => { return '' },
                stats: true
            } as IDeviceContentOptions, (sensor: string, state: number) => { this.changeValue(sensor, state); }),
            header: new DefaultDeviceHeader({
                title: title,
                collapsable: false,
                buttons: []
            } as IDeviceHeaderOptions)
        } as IDeviceOptions);

        this.sensors = sensors;
    }
    
    public getDefinition(): any {
        let definition = {};
        this.sensors.forEach(el => {
            definition[el] = { stats: false }; 
        });
        return definition;
    }

    public update(data: any) {
        this.options.content.update(data);
    }

}