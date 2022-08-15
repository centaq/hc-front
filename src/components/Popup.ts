import { Guid } from "guid-typescript"
import { IPopup } from "src/interfaces/IPopup";
/*
import { StateQueue } from "../state/StateQueue";
import { StateCmdEnum } from "../state/StateCmdEnum";
import { IDeviceStateChange } from "src/data/Retriever";
*/
export  class Popup implements IPopup {
    protected uid: string;
    //protected options: IDeviceOptions;
    protected classOverride: string;
    protected height: string;
    protected center: boolean = false;
    
    constructor( height: number = 100) {
        this.uid = Guid.create().toString();
        //this.options = options;
        this.height = height + 'px';
        this.classOverride = "col-lg-3 col-md-4 col-sm-6";
    }

    public getUID(): string {
        return this.uid;
    }

    public render(): string {
        let content = `
        
<!-- Modal -->
<div class="modal " id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header" style="display: flex;">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        
      `;  //<div style="position: fixed; height: 300px; width: 300px; left: 50%; top: 50%; background-color:red;">aaa</div>`;
/*
        float: right;
        margin: -1rem -1rem -1rem auto;
        padding: 1rem;
        font-weight: 800;
        font-size: 1.5rem;
        line-height: 1;
        */
    

        /*
        <div id="` + this.uid + `" class="` + this.classOverride + `">
            <div class="income-dashone-total shadow-reset nt-mg-b-30">
                <div class="device-component-title">`;
        content += this.options.header.render();
        content += `
                </div>
                <div class="device-component-content ` + (this.center ? "vcentered" : "") + `" style="height: ` + this.height.toString() + `;">`;
        content += this.options.content.render();
        content += `
                </div>
            </div>
        </div>`;*/
        return content;
    }

    public bind() {
        //this.options.content.bind();
    }

    public unbind() {
        //this.options.content.unbind();
    }


    public update(data: any) {
        //this.options.content.update(data);
    }

}