import { IMainPanel } from '../../interfaces/IMainPanel';
import { IDevicesDefinitions } from '../../interfaces/IDevice';
import { Guid } from 'guid-typescript';
import Chart from 'chart.js/auto';
import { Multiselect } from 'ts-multiselect';

import "ts-multiselect/dist/style.css";
import { StateQueue } from '../../state/StateQueue';
import { StateCmdEnum } from '../../state/StateCmdEnum';
import { IStatsRefresh } from 'src/data/Retriever';

export class StatsPanel implements IMainPanel {
    private uid: string = Guid.create().toString();
    private chart: Chart;
    private statSelect: Multiselect;
    private periodSelect: Multiselect;

    constructor() {
    }

    public update(data: any) {
        if (data.length == 0) {
            console.log('Brak danych - alert ?');
            return;
        }
        let labels: string[] = [];
        let datasets: any[] = [];
        let i: number = 0;
        for (let col in data[0]) {
            if (col != 'date') {
                let color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
                datasets[i] = {
                    label: this.getColTitle(col),
                    fill: false,
                    backgroundColor: color,
                    borderColor: color,
                    data: []
                }
                i++;
            }
        }
        for(let row of data) {
            let i = 0;
            for (let cell in row) {
                if (cell == 'date') {
                    labels.push(row['date']);
                } else {
                    datasets[i].data.push(row[cell]);
                    i++;
                }
            }
        }
        this.chart.data.labels = labels;
        this.chart.data.datasets = datasets;
        this.chart.update();
    }

    public getDefinition(): IDevicesDefinitions {
        let definitions = {};
        definitions[this.uid] = { sensors: [] };

        return {};
    }

    public render(): string {
        let content = `
            <div id='main-panel' class="charts-area mg-b-15">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="charts-single-pro shadow-reset nt-mg-b-30" style="background-color: #fff; padding: 20px;">
                                <div class="panel-title">
                                    <h2>Statystyki</h2>
                                </div>
                                
                                <div class="row">
                                    <div class="chosen-select-single col-xs-8 col-sm-8">
                                        <div id="stats-source"></div>
                                    </div>
                                    <div class="chosen-select-single col-xs-3 col-sm-3">
                                        <div id="periods-source" ></div>
                                    </div>
                                    <div class="col-xs-1 col-sm-1">
                                        <div class="button-style-four btn-mg-b-10">
                                            <button id="refresh-stats" type="button" class="btn btn-custon-four btn-primary">Odśwież</button>
                                        </div>
                                    </div>
                                </div>
                                <div id="stats-chart">
                                    <canvas id="stats-canvas"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        return content;
    }

    private statsRefresh() {
        const stats = this.statSelect.selected;
        const period : number = Number(this.periodSelect.selected);
        if (stats !== null) {
            const statsLastGuid = Guid.create();
            const data = {
                guid: statsLastGuid,
                stats: stats,
                period: period
            } as IStatsRefresh;
            StateQueue.enqueue(StateCmdEnum.StatsRefresh, data);
        }
    }

    public bind() {
        this.statSelect = new Multiselect({
            id: 'stats-source',
            multiple: true,
            options: this.dataList,
        });
        this.periodSelect = new Multiselect({
            id: 'periods-source',
            options: this.periodList,
        });
        $("#refresh-stats").click(() => { this.statsRefresh() });
        

        this.chart = new Chart(<any>document.getElementById("stats-canvas"), {
            data: {
                labels: [],
                datasets: []
            },
            type: 'line',
            options: {
                responsive: true,
                plugins: {
                    title:{
                        display:true,
                        text:'Basic Line Chart'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: {
                        afterTickToLabelConversion: (data: any) => {
                            var xLabels = data.ticks;
                            xLabels.forEach((labels: any, i: any) => {
                                if (i % 6 != 0) {
                                    xLabels[i].label = '';
                                }
                            });
                        },
                        ticks: {
                            autoSkip: false,
                            //fontColor: "#fff" // this here
                        },
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    },
                    yAxes: {
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0,
                            //fontColor: "#fff"
                        },
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                }
            }});
    }

    public unbind() {
    }

    private getColTitle(colName: string): string {
        var title = '';
        this.dataList.forEach((element: any) => {
            if (element.value == colName) {
                title = element.label;
            }
        });
        return title;
    }

    private dataList: any = [
		{value: 'pressure_00', label: 'Ciśnienie atmosferyczne'},
		{value: 'rain_00', label: 'Czujnik deszczu'},
		{value: 'light_level_00', label: 'Czujnik światła'},
		{value: 'light_level_01', label: 'light_level_01'},
		{value: 'temperature_00', label: 'temperature_00'},
		{value: 'temperature_01', label: 'temperature_01'},
		{value: 'temperature_02', label: 'temperature_02'},
		{value: 'temperature_03', label: 'temperature_03'},
		{value: 'temperature_04', label: 'temperature_04'},
		{value: 'temperature_05', label: 'temperature_05'},
		{value: 'temperature_06', label: 'temperature_06'},
		{value: 'temperature_07', label: 'temperature_07'},
		{value: 'temperature_08', label: 'Temperatura sypialnia - podłoga'},
		{value: 'temperature_09', label: 'Temperatura sypialnia'},
		{value: 'temperature_10', label: 'temperature_10'},
		{value: 'temperature_11', label: 'temperature_11'},
		{value: 'temperature_12', label: 'temperature_12'},
		{value: 'temperature_13', label: 'temperature_13'},
		{value: 'temperature_14', label: 'temperature_14'},
		{value: 'temperature_15', label: 'temperature_15'},
		{value: 'temperature_16', label: 'temperature_16'},
		{value: 'temperature_17', label: 'temperature_17'},
		{value: 'temperature_18', label: 'temperature_18'},
		{value: 'temperature_19', label: 'Temperatura biuro - grzejnik powrót'},
		{value: 'temperature_20', label: 'temperature_20'},
		{value: 'temperature_21', label: 'Temperatura biuro'},
		{value: 'temperature_22', label: 'Temperatura sypialnia - góra'},
		{value: 'temperature_23', label: 'Temperatura biuro - grzejnik zasilanie'},
		{value: 'temperature_24', label: 'temperature_24'},
		{value: 'temperature_25', label: 'temperature_25'},
		{value: 'temperature_26', label: 'temperature_26'},
		{value: 'temperature_27', label: 'temperature_27'},
		{value: 'temperature_28', label: 'temperature_28'},
		{value: 'temperature_29', label: 'temperature_29'},
		{value: 'temperature_30', label: 'temperature_30'},
		{value: 'temperature_31', label: 'temperature_31'},
		{value: 'temperature_32', label: 'temperature_32'},
		{value: 'temperature_33', label: 'temperature_33'},
		{value: 'temperature_34', label: 'temperature_34'},
		{value: 'temperature_35', label: 'temperature_35'},
		{value: 'temperature_36', label: 'temperature_36'},
		{value: 'temperature_37', label: 'temperature_37'},
		{value: 'temperature_38', label: 'temperature_38'},
		{value: 'temperature_39', label: 'temperature_39'},
		{value: 'temperature_40', label: 'Temperatura zewnętrzna'},
		{value: 'temperature_41', label: 'temperature_41'},
		{value: 'temperature_42', label: 'Temperatura szafy'},
		{value: 'temperature_43', label: 'Temperatura pieca'},
		{value: 'temperature_44', label: 'temperature_44'},
		{value: 'temperature_45', label: 'temperature_45'},
		{value: 'temperature_46', label: 'temperature_46'},
		{value: 'temperature_47', label: 'temperature_47'},
		{value: 'humidity_00', label: 'humidity_00'},
		{value: 'humidity_01', label: 'humidity_01'},
		{value: 'humidity_02', label: 'humidity_02'},
		{value: 'humidity_03', label: 'humidity_03'},
		{value: 'humidity_04', label: 'humidity_04'},
		{value: 'humidity_05', label: 'humidity_05'},
		{value: 'humidity_06', label: 'humidity_06'},
		{value: 'humidity_07', label: 'humidity_07'},
		{value: 'energy_meter_00', label: 'Energia elektronika'},
		{value: 'energy_meter_01', label: 'energy_meter_01'},
		{value: 'energy_meter_02', label: 'energy_meter_02'},
		{value: 'energy_meter_03', label: 'Energia całkowita'},
		{value: 'energy_meter_04', label: 'energy_meter_04'},
		{value: 'water_meter_00', label: 'water_meter_00'},
		{value: 'smoke_level_00', label: 'Czujnik dymu szafy'},
		{value: 'smoke_level_01', label: 'smoke_level_01'},
		{value: 'smoke_level_02', label: 'Czujnik dymu kotłownia'},
		{value: 'smoke_level_03', label: 'smoke_level_03'},
		{value: 'pressure_level_00', label: 'pressure_level_00'},
		{value: 'pressure_level_01', label: 'pressure_level_01'},
		{value: 'pressure_level_02', label: 'pressure_level_02'},
		{value: 'pressure_level_03', label: 'pressure_level_03'}
    ]

    private periodList: any = [
        {value: 1, label: "HOURS 1"},
        {value: 2, label: "HOURS 2"},
        {value: 6, label: "HOURS 6"},
        {value: 8, label: "HOURS 8"},
        {value: 12, label: "HOURS 12"},
        {value: 24, label: "HOURS 24"},
        {value: 48, label: "DAYS 2"},
        {value: 72, label: "DAYS 3"},
        {value: 168, label: "DAYS 7"},
        {value: 720, label: "DAYS 30"},
        {value: 1440, label: "DAYS 60"},
        {value: 2160, label: "DAYS 90"},
    ]
}