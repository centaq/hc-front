import { Guid } from 'guid-typescript';
import { HorizontalLayout, ILayout } from './ILayouts';
import  "jquery-sparkline";
import "jquery-knob"
import { ISensorData } from './IData';

export interface IDevice {
    getUID(): string;
    render(): string;

    bind(): void;
    unbind(): void;

    getDefinition(): any;
    update(data: any): void;
}

export interface IDeviceOptions {
    header: IDeviceHeader;
    content: IDeviceContent;
}

export interface IStringFormatter {
    format(text: string): string;
}

export class DefaultStringFormatter {
    static format(text: string): string {
        return text;
    }
}

export interface IDeviceContent {
    render(): string;
    update(data: any): void;
    bind(): void;
    unbind(): void;
}

export interface IActionComponent {
    render(): string;
    update(data: any): void;
    bind(): void;
    unbind(): void;
}

export interface IDeviceHeader {
    render(): string;
    update(data: any): void;
    bind(): void;
    unbind(): void;
}

export class DefaultDeviceHeader implements IDeviceHeader {
    private uid: string;
    private options: IDeviceHeaderOptions;

    constructor(options: IDeviceHeaderOptions) {
        this.uid = Guid.create().toString();
        this.options = options;
    }

    render(): string {
        let content = `
                    <div id="` + this.uid + `" class="device-component-header-title">
                        <h2 class="device-header-title">` + this.options.title + `</h2>
                        
                        <div class="sparkline9-outline-icon">`;
        this.options.buttons.forEach(element => {
            content += '<span class="sparkline9-collapse-link"><i class="fa ' + element.icon + '"></i></span>';
        });
        content += (this.options.collapsable ? 
            '<span class="sparkline9-collapse-link"><i class="fa fa-chevron-up"></i></span>' : '');
        content += (this.options.settingsHandler != undefined ?
            '<span><i class="fa fa-wrench"></i></span>' : '');
        content += (this.options.closeable ?
            '<span class="sparkline9-collapse-close"><i class="fa fa-times"></i></span>' : '');
        content +=
                        `</div>
                    </div>`;
        
        return content;
    }
    update(data: any): void {
        throw new Error('Method not implemented.');
    }
    bind(): void {
        throw new Error('Method not implemented.');
    }
    unbind(): void {
        throw new Error('Method not implemented.');
    }
    
}

export class DefaultDeviceContent implements IDeviceContent {
    private uid: string;
    private options: IDeviceContentOptions;
    private layout: ILayout;

    constructor(options: IDeviceContentOptions) {
        this.uid = Guid.create().toString();
        this.options = options;
        this.layout = new HorizontalLayout(options.icon);
    }

    public render(): string {
        let content = `<div id="` + this.uid + `">
            <h4 class="centered">
                <span class="content-text">` + this.options.formatter('-') + `</span>
            </h4> `;
        if (this.options.stats)
            content += `<span class="stats"></span>`;
        content += `</div>`;
        return this.layout.render(content);
    }

    public update(data: ISensorData) {
        $("#" + this.uid + " .content-text").text(this.options.formatter(data.data));
        if (this.options.stats && data.stats != undefined) {
            /*$("#" + this.uid + " .stats").sparkline(data.stats, {
                type: 'line',
                lineColor: '#03a9f4',
                width:'100%',
                height:'34'
            });*/
        }
    }

    public bind() {

    }

    public unbind() {

    }
}

export class ButtonsDeviceContent implements IDeviceContent {
    private options: IDeviceContentOptions;
    private layout: ILayout;
    private buttons: IActionComponent;

    constructor(sensors: string[], options: IDeviceContentOptions, stateChange: (sensor: string, state: number) => void) {
        this.options = options;
        this.layout = new HorizontalLayout(this.options.icon, "centered");
        this.buttons = new ButtonsActionComponent(sensors, stateChange);
    }

    public render(): string {
        let content = this.buttons.render();
        return this.layout.render(content);
    }

    public update(data: any) {
        this.buttons.update(data);
    }

    public bind() {
        this.buttons.bind()
    }

    public unbind() {

    }
}

export class ButtonsActionComponent implements IActionComponent {
    private uid: string;
    private sensors: string[];
    private stateChange: (sensor: string, state: number) => void;

    constructor(sensors: string[], stateChange: (sensor: string, state: number) => void) {
        this.uid = Guid.create().toString();
        this.sensors = sensors;
        this.stateChange = stateChange;
    }

    public render(): string {
        const sensor = this.sensors[0];
        let content = `
                <div class="btn-group btn-group-sm" role="group" data="` + sensor + `">
                    <input type="radio" class="btn-check" name="options_` + sensor + `" id="` + this.uid + "_" + sensor + `_on" autocomplete="off" value="1">
                    <label class="btn btn-primary" for="` + this.uid + "_" + sensor + `_on">On</label>
                    <input type="radio" class="btn-check" name="options_` + sensor + `" id="` + this.uid + "_" + sensor + `_off" autocomplete="off" checked value="0">
                    <label class="btn btn-primary" for="` + this.uid + "_" + sensor + `_off">Off</label>
                </div>
                `;
        if (this.sensors.length > 1) {
            const sensor1 = this.sensors[1];
            content += `
                <div class="btn-group btn-group-sm" role="group" data="` + sensor1 + `">
                    <input type="checkbox" class="btn-check" id="` + this.uid + "_" + sensor1 + `_auto" autocomplete="off">
                    <label class="btn btn-primary" for="` + this.uid + "_" + sensor1 + `_auto">Auto</label>
                </div>`;
        }
        return content;
    }

    public update(data: any) {
        const sensor = this.sensors[0];
        this.updateOnOffValue(sensor, data[sensor]);
        if (this.sensors.length > 1) {
            const sensor1 = this.sensors[1];
            this.updateToggleValue(sensor1, data[sensor1]);
        }
    }
    
    private updateOnOffValue(sensor: string, data: any) {
        const val = data["data"];
        $("#" + this.uid + "  [name='options_" + sensor + "'][value='" + val + "']").prop("checked", true);
    }

    private updateToggleValue(sensor: string, data: any) {
        const val = data["data"];
        $("[id='" + this.uid + "_" + sensor + "_auto']").prop("checked", val == 1 ? true : false);
    }

    public bind() {
        const sensor = this.sensors[0];
        $("[type='radio'][id^='" + this.uid + "_" + sensor + "']").click((e) => {
            this.handleOnOffEvent(e);
        });
        if (this.sensors.length > 1) {
            const sensor1 = this.sensors[1];
            $("[type='checkbox'][id='" + this.uid + "_" + sensor1 + "_auto']").click((e) => {
                this.handleToogleEvent(e);
            });
        }
    }

    private handleOnOffEvent(e: JQuery.TriggeredEvent) {
        let target = $(e.target);
        this.stateChange(<string>target.parent().attr("data"), <number>$("[name='" + target.attr("name") + "']:checked").val());
    }

    private handleToogleEvent(e: JQuery.TriggeredEvent) {
        let target = $(e.target);
        var isChecked = target.is(':checked');
        this.stateChange(<string>target.parent().attr("data"), isChecked ? 1 : 0);
    }

    public unbind() {

    }
}

export class SelectableDeviceContent implements IDeviceContent {
    private uid: string;
    private options: IDeviceContentOptions;
    private stateChange: (type: string, sensorNo: number, cmd: any, val: any) => void;
    private layout: ILayout;

    constructor(options: IDeviceContentOptions, stateChange: (type: string, sensorNo: number, cmd: any, val: any) => void) {
        this.uid = Guid.create().toString();
        this.options = options;
        this.stateChange = stateChange;
        this.layout = new HorizontalLayout(this.options.icon, "centered");
    }

    public render(): string {
        let content = `
                <div id="` + this.uid + `">
                    type:<select name="type">
                        <option value="light">Światło</option>
                        <option value="led">LED</option>
                        <option value="blind_up">Otwórz roletę</option>
                        <option value="blind_down">Zamknij roletę</option>
                    </select>
                    <input type="number" name="sensorNo"/>
                    <input type="input" name="cmd"/>
                    <input type="input" name="value" />
                    <input type="button" name="button" value="Exec" />
                </div>`;
        return this.layout.render(content);
    }

    public update(data: any) {
        //$("#" + this.uid + " input:radio").parent().removeClass('active');
        //$("#" + this.uid + " input:radio[value=" + data + "]").parent().addClass('active');
    }

    public bind() {
        console.log($("#" + this.uid + " input[name=button]"));
        $("#" + this.uid + " input[name=button]").click((e) => {
            let type : any =  $("#" + this.uid + " select[name=type]").val();
            let sensorNo : any =  $("#" + this.uid + " input[name=sensorNo]").val();
            let cmd : any =  $("#" + this.uid + " input[name=cmd]").val();
            let val : any =  $("#" + this.uid + " input[name=value]").val();
            console.log({type: type, sensorNo: sensorNo, cmd: cmd, val: val});
            this.stateChange(type, sensorNo, cmd, val);
        });
    }

    public unbind() {

    }
}

export class KnobDeviceContent implements IDeviceContent {
    private uid: string;
    private options: IDeviceContentOptions;
    private stateChange: (state: number) => void;
    private layout: ILayout;

    constructor(options: IDeviceContentOptions, stateChange: (state: number) => void) {
        this.uid = Guid.create().toString();
        this.options = options;
        this.stateChange = stateChange;
        this.layout = new HorizontalLayout(this.options.icon, "centered");
    }

    public render(): string {
        let content = `
                <div id="` + this.uid + `" class="btn-group ">
                    <input type="text" class="input-knob" data-width="80" data-height="80" data-angleOffset="-125" data-angleArc="250" data-step="5" value="0" data-max="255">
                </div>`;
        return this.layout.render(content);
    }

    public update(data: any) {
    }

    public bind() {
        /*$("#" + this.uid + " .input-knob").knob({
            'release' : (v) => {
                this.stateChange(<number>v);
            }
        });*/
        if (false) this.stateChange(0);
    }

    public unbind() {

    }
}

export interface IDeviceContentOptions {
    icon: any;
    formatter: (text: string) => string;
    stats: boolean | false;
}

export interface IDeviceHeaderOptions {
    buttons: IDeviceHeaderButton[];
    title: string;
    closeable?: boolean | false;
    collapsable?: boolean | false;
    settingsHandler?: any | undefined;
}

export interface IDeviceHeaderButton {
    icon: any;
    action: () => void;
    title: string;
}

export interface IDevicesDefinitions {
    [uid: string]: {
        config?: any,
        sensors: []
    };
}


export class RollerDeviceContent implements IDeviceContent {
    private uid: string;
    private options: IDeviceContentOptions;
    private stateChange: (state: number) => void;
    private layout: ILayout;

    constructor(options: IDeviceContentOptions, stateChange: (state: number) => void) {
        this.uid = Guid.create().toString();
        this.options = options;
        this.stateChange = stateChange;
        this.layout = new HorizontalLayout(this.options.icon, "btn-vertical-group");
    }

    public render(): string {
        let content = `
                <div class="btn-group btn-custom-groups btn-custom-groups-one full-width input-group touchspin-inner">
                    <button type="button" class="btn btn-primary col-xs-4" data-toggle="button" aria-pressed="false" autocomplete="off">Auto</button>
                    <input type="text" class="touchspin3 btn btn-default col-xs-8" value="0" name="demo3">
                </div>
                <div id="` + this.uid + `" class="btn-group btn-custom-groups btn-custom-groups-one full-width">
                    <button type="button" class="btn btn-primary col-xs-4"><span class="fas fa-chevron-up"></span>
                    </button>
                    <button type="button" class="btn btn-primary col-xs-4"><span class="far fa-stop"></span>
                    </button>
                    <button type="button" class="btn btn-primary col-xs-4"><span class="fas fa-chevron-down"></span>
                    </button>
                </div>`;

        return this.layout.render(content);
    }

    public update(data: any) {
    }

    public bind() {
        $("#" + this.uid + " .btn-primary").click((e) => {
            this.stateChange(<number>$(e.target).find("input").val());
        });
    }

    public unbind() {

    }
}

export interface RoomsTemperatureSensor {
    title: string;
    sensor: string;
    sensor1?: string;
    sensor2?: string;
}

export interface ActionMultiSensor {
    title: string;
    sensor: string;
    sensor1?: string;
}

export interface ActionMultiDeviceContentRow {
    title: string;
    component: IActionComponent;
}