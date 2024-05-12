import { IDevice, IDeviceOptions, IDeviceContent, IDeviceContentOptions, DefaultDeviceHeader, IDeviceHeaderOptions, OvercurrentPreviewSensor } from "../../interfaces/IDevice";
import { DeviceBase } from "./DeviceBase";
import { Guid } from 'guid-typescript';
import  "jquery-sparkline";

export class OvercurrentPreviewDevice extends DeviceBase implements IDevice {
    private sensors: OvercurrentPreviewSensor[];

    constructor(title: string, sensors: OvercurrentPreviewSensor[], height: number) {
        super({
            content: new OvercurrentDeviceContent({
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

class OvercurrentDeviceContent implements IDeviceContent {
    private uid: string;
    private sensors: OvercurrentPreviewSensor[];

    constructor(options: IDeviceContentOptions, sensors: OvercurrentPreviewSensor[]) {
        this.uid = Guid.create().toString();
        this.sensors = sensors;
    }

    public render(): string {
        
        let content = `
        
        <div id="` + this.uid + `" class="" style="width: 100%; height: 100%;">
            <div class="col-12" style="top:5px;">`;

        
        var rows = Math.ceil( this.sensors.length / 2);
        for (let i = 0; i < rows; i++) {
            let sensorLeft = this.sensors[i];
            let sensorRight = undefined;
            if (this.sensors.length <= 2 * rows) {
                sensorRight = this.sensors[rows + i];
            }
            content += `
                <div class="row">
                    <div class="col-5" section="0" section-value="0">
                        <h6 class="overflown-title">
                            ` + sensorLeft.code + " - " + sensorLeft.title + `
                        </h6>
                    </div>
                    <div class="col-1" section="0" section-value="0" id="` + this.uid + "_" + sensorLeft.sensor + `">
                        <h6 class="right">
                            <span class="dot"></span>
                        </h6>
                    </div>`;
            if (sensorRight != undefined) {
                content += `
                    <div class="col-5" section="0" section-value="0">
                        <h6 class="overflown-title">
                            ` + sensorRight.code + " - " + sensorRight.title + `
                        </h6>
                    </div>
                    <div class="col-1" section="0" section-value="0" id="` + this.uid + "_" + sensorRight.sensor + `">
                        <h6 class="right">
                            <span class="dot"></span>
                        </h6>
                    </div>`;
            } else {
                content += `
                    <div class="col-6" section="0" section-value="0"><h6 class="overflown-title"></h6></div>`;
            }
            content += `
                </div>`;
        }
        
        content += `
                </div>
        </div>`;
        return content;
    }

    public update(data: any) {
        this.sensors.forEach(element => {
            var el = $("[id='" + this.uid + "_" + element.sensor + "'] span");
            if (data[element.sensor!].data) {
                el.addClass("active-dot");
            } else {
                el.removeClass("active-dot");
            }
        });
    }

    public bind() {

    }

    public unbind() {

    }
}