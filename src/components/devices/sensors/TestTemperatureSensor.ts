
import { IDevice, IDeviceOptions, IDeviceContent, IDeviceContentOptions, DefaultDeviceHeader, IDeviceHeaderOptions } from "../../../interfaces/IDevice";
import { DeviceBase } from "../DeviceBase";
import { Guid } from 'guid-typescript';
import  "jquery-sparkline";
import { HorizontalLayout, ILayout } from '../../../interfaces/ILayouts';

export class TestTemperatureSensor extends DeviceBase implements IDevice {
    private sensor: string = "2.16.2";
    private sensorDown: string = "2.16.1";
    private sensorUp: string = "2.16.3";
    private activator: string = "1.10.31";

    constructor(title: string) {
        super({
            content: new TestDeviceContent({
                icon: 'fas fa-thermometer-half',
                formatter: (text: string) => { return text + "°C"},
                stats: true
            } as IDeviceContentOptions),
            header: new DefaultDeviceHeader({
                title: title,
                collapsable: false,
                buttons: []
            } as IDeviceHeaderOptions),
        } as IDeviceOptions);
    }
    
    public getDefinition(): any {
        let definition = {};
        definition[this.sensor] = { stats: true, statsConfig: { type: 'minute', points: 20, period: 1 } };
        definition[this.sensorDown] = { stats: false };
        definition[this.sensorUp] = { stats: false };
        definition[this.activator] = { stats: false };
        return definition;
    }

    public update(data: any) {
        var stats = data[this.sensor].stats;
        this.options.content.update({0: data[this.sensor].data, 1: data[this.sensorDown].data, 2: data[this.sensorUp].data, 3: data[this.activator].data});

        if (stats !== undefined) {
            /*$("#" + this.uid).find('.stats').sparkline(stats, {
                type: 'line',
                lineColor: '#03a9f4', width:'100%', height:'34' });*/
        }
    }

    public bind() {
    }

    public unbind() {

    }
}

class TestDeviceContent implements IDeviceContent {
    private uid: string;
    private options: IDeviceContentOptions;
    private layout: ILayout;

    constructor(options: IDeviceContentOptions) {
        this.uid = Guid.create().toString();
        this.options = options;
        this.layout = new HorizontalLayout(options.icon, "row");
    }

    public render(): string {
        let content = `
                <h5 class="centered col-xs-3 col-md-3" style='padding-left: 5px; padding-right: 5px;'>
                    <span id='` + this.uid + `_1'>` + this.options.formatter('22.3') + `</span>
                </h5> 
                <h3 class="centered col-xs-6 col-md-6" style='padding-left: 5px; padding-right: 5px;'>
                    <span id='` + this.uid + `_0'>` + this.options.formatter('22.3') + `</span>
                </h3>
                <h5 class="centered col-xs-3 col-md-3" style='padding-left: 5px; padding-right: 5px;'>
                    <span id='` + this.uid + `_2'>` + this.options.formatter('22.3') + `</span>
                </h5> `
        if (this.options.stats)
            content += `<span class="stats"></span>`;

        return this.layout.render(content);
    }

    public update(data: any) {
        $("#" + this.uid + "_0").text(this.options.formatter(data[0]));
        $("#" + this.uid + "_1").text(this.options.formatter(data[1]));
        $("#" + this.uid + "_2").text(this.options.formatter(data[2]));
        this.layout.updateIconClass(data[3], "content-active");
    }

    public bind() {

    }

    public unbind() {

    }
}