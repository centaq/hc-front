
import { IDevice, IDeviceOptions, DefaultDeviceContent, IDeviceContentOptions, DefaultDeviceHeader } from "../../../interfaces/IDevice";
import { DeviceBase } from "../DeviceBase";

export class SensorBase extends DeviceBase implements IDevice {
    private sensors: string[];

    constructor(title: string, icon: string, sensors: string[], formatter: (text: string) => void) {
        super({
            content: new DefaultDeviceContent({
                icon: icon,
                formatter: formatter,
                stats: true
            } as IDeviceContentOptions),
            header: new DefaultDeviceHeader({
                title: title,
                collapsable: false,
                buttons: []
            })
        } as IDeviceOptions);
        this.sensors = sensors;
    }
    
    public getDefinition(): any {
        let definition = {};
        definition[this.sensors[0]] = { stats: true, statsConfig: { type: 'minute', points: 20, period: 1 } };
        for (let i = 1; i < this.sensors.length; i++) {
            definition[this.sensors[i]] = { stats: false };
        }
        return definition;
    }

    public update(data: any) {
        this.sensors.forEach((el) => {
            this.options.content.update(data[el]);
        });
    }
}