import 'bootstrap/dist/css/bootstrap.min.css';
import './static/css/custom_style.css';

import { Retriever } from './data/Retriever';
import { StateCmdEnum } from "./state/StateCmdEnum";
import { StateQueue } from "./state/StateQueue";
import { DataController } from "./state/DataController";
import { UIController } from "./state/UIController";
import { StateController } from "./state/StateController";

export class App {
    private ticker100ms: any;
    
    private dataRetriever: Retriever;

    constructor(rootId: string) {
        this.dataRetriever = new Retriever();
        StateController.initState();
        DataController.init(this.dataRetriever);
        UIController.init(rootId);
    }

    public init() {
        StateQueue.enqueue(StateCmdEnum.Init);
        this.ticker100ms = setInterval(this.ticker100msHandler, 100);
        if (this.ticker100ms) {}
    }

    public test() {
        console.log('aa');
    }

    private ticker100msHandler() {
        StateQueue.enqueue(StateCmdEnum.Tick100ms);
    }
}

const factory = () => new App("#content-wrapper");
window.dispatchEvent(new CustomEvent('load-application', { detail: factory }));
