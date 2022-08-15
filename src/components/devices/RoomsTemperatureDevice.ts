
import { IDevice, IDeviceOptions, IDeviceContent, IDeviceContentOptions, DefaultDeviceHeader, IDeviceHeaderOptions, RoomsTemperatureSensor } from "../../interfaces/IDevice";
import { DeviceBase } from "./DeviceBase";
import { Guid } from 'guid-typescript';
import  "jquery-sparkline";

export class RoomsTemperatureDevice extends DeviceBase implements IDevice {
    private sensors: RoomsTemperatureSensor[];

    constructor(title: string, sensors: RoomsTemperatureSensor[], height: number, unit: string) {
        super({
            content: new TestDeviceContent({
                formatter: (text: string) => { return text + unit}
            } as IDeviceContentOptions, sensors),
            header: new DefaultDeviceHeader({
                title: title,
                collapsable: false,
                buttons: []
            } as IDeviceHeaderOptions),
        } as IDeviceOptions, height);
        this.sensors = sensors;
    }
    
    public getDefinition(): any {
        let definition = {};
        this.sensors.forEach(element => {
            definition[element.sensor] = { stats: false };
            if (element.sensor1 !== undefined) {
                definition[element.sensor1] = { stats: false };
            }
            if (element.sensor2 !== undefined) {
                definition[element.sensor2] = { stats: false };
            }
        });
        return definition;
    }

    public update(data: any) {
        this.options.content.update(data);
    }

    public bind() {
    }

    public unbind() {

    }
}

class TestDeviceContent implements IDeviceContent {
    private uid: string;
    private options: IDeviceContentOptions;
    private sensors: RoomsTemperatureSensor[];

    constructor(options: IDeviceContentOptions, sensors: RoomsTemperatureSensor[]) {
        this.uid = Guid.create().toString();
        this.options = options;
        this.sensors = sensors;
    }

    public render(): string {
        
        let content = `
        
        <div id="` + this.uid + `" class="" style="width: 100%; height: 100%;">
            <div class="col-12" style="top:5px;">`;
        this.sensors.forEach(element => {
            content += `
            <div class="row">
                <div class="col-6" section="0" section-value="0">
                    <h6 class="">
                        ` + element.title + `
                    </h6>
                </div>`;
            if (element.sensor1 !== undefined) {
                content += `
                    <div class="col-2" section="0" section-value="0">
                        <h6 class="right">
                            <span data='` + element.sensor + `'>12.3</span>
                        </h6>
                    </div>
                    <div class="col-2" section="0" section-value="0">
                        <h6 class="right">
                            <span data='` + element.sensor1 + `'>12.3</span>
                        </h6>
                    </div>`;
            } else {
                content += `
                    <div class="col-4" section="0" section-value="0">
                        <h6 class="right">
                            <span data='` + element.sensor + `'>12.3</span>
                        </h6>
                    </div>`;
            }
            content += `
                <div class="col-2" section="0" section-value="0">
                    <h6 class="left">
                        <span>` + this.options.formatter('') + `</span>
                    </h6>
                </div>
            </div>`;
        });
        
        content += `
                </div>
        </div>`;
        return content;
    }

    public update(data: any) {
        this.sensors.forEach(element => {
            $("#" + this.uid + " [data='" + element.sensor + "']").text(data[element.sensor].data.toFixed(1));
            
            if (element.sensor1 !== undefined) {
                var val = "(" + data[element.sensor1].data.toFixed(1) + ")";
                $("#" + this.uid + " [data='" + element.sensor1 + "']").text(val);
            }
        });
    }

    public bind() {

    }

    public unbind() {

    }
}