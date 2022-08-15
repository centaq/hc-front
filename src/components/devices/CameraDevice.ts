
import { Guid } from 'guid-typescript';
import { DeviceBase } from './DeviceBase';
import { IDeviceOptions, IDeviceContent, DefaultDeviceHeader, IDeviceHeaderOptions } from '../../interfaces/IDevice';

import '../../Env';

export class CameraDevice extends DeviceBase {

    constructor(title: string, no: number, ch: number = 0) {
        super({
            content: new CameraDeviceContent(no, ch),
            header: new DefaultDeviceHeader({
                title: title,
                collapsable: false,
                buttons: []
            } as IDeviceHeaderOptions)
        } as IDeviceOptions);
        this.height = 'auto';
        this.classOverride = 'col-xs-12 col-sm-6';
    }
    
    public getDefinition(): any {
        let definition = {};
        return definition;
    }

    public update(data: any) {
    }

    public bind() {
        this.options.content.bind();
    }

    public unbind() {
        this.options.content.unbind();
    }
}

class CameraDeviceContent implements IDeviceContent {
    private uid: string;
    private modalUid: string;
    private url: string;
    private timeout: any;

    constructor(no: number, ch: number) {
        this.uid = 'video_' + Guid.create().toString();
        this.modalUid = 'modal_' + Guid.create().toString();
        this.url = process.env.ServerURL + 'api/camera/' + no + "/" + ch;
    }

    public render(): string {
        let content = `
        <div class="row">
            <div class="col-xs-12 col-md-12 " id='` + this.uid + `' style='min-height: 50px;'>
                <image src='` + this.url  + `?data=0' />
                <div class="c-player">
                    <div class="c-player__screen" data-vjs-player="true">
                    </div>
                </div>
                <button type="button" class="btn btn-custon-four btn-default image-action-button top-left">
                    <span class="fas fa-sync"></span>
                </button>
                <button type="button" class="btn btn-custon-four btn-default image-action-button top-right" data-toggle="modal" data-target="#` + this.modalUid + `">
                    <span class="fas fa-expand"></span>
                </button>
                <div id="` + this.modalUid + `" class="modal default-popup-PrimaryModal fade" role="dialog">
                    <div class="modal-dialog full-screen">
                        <div class="modal-content full-screen-content">
                            <div class="modal-close-area modal-close-df">
                                <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
                            </div>
                            <div class="modal-body">
                                <image src='` + this.url  + `?data=0' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        return content;
    }

    public update(data: any) {
    }

    public refreshImage() {
        this.timeout = setTimeout(() => { this.refreshImage() }, 5000);
        let obj = this.uid;
        if ($("#" + this.modalUid).css('display') != 'none') {
            obj = this.modalUid;
        }
        $("#" + obj + " img").first().attr('src', this.url + "?data=" + this.timeout);
    }

    private toggleRefresh() {
        if (this.timeout > 0) {
            clearTimeout(this.timeout);
            this.timeout = 0;
            $("#" + this.uid + " .fa-sync").parent().addClass("image-action-button-inactive");
        } else {
            this.refreshImage();
            $("#" + this.uid + " .fa-sync").parent().removeClass("image-action-button-inactive");
        }
    }
    
    public bind() {
        $("#" + this.uid + " img").on('error', (event) => {
            const img = (<HTMLImageElement>event.target);
            if (img.src != 'static/img/imagenotfound.png') {
                img.src = 'static/img/imagenotfound.png';
            }
        });
        this.refreshImage();
        $("#" + this.uid + " .fa-sync").parent().click(() => { this.toggleRefresh(); });
    }

    public unbind() {
        clearTimeout(this.timeout);
    }
}