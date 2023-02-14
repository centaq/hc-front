import { IMainPanel } from '../interfaces/IMainPanel';
import { IDevicesDefinitions } from '../interfaces/IDevice';
import { Guid } from 'guid-typescript';
import Chart from 'chart.js/auto';
import { Multiselect } from 'ts-multiselect';

import "ts-multiselect/dist/style.css";
import { StateQueue } from '../state/StateQueue';
import { StateCmdEnum } from '../state/StateCmdEnum';
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
                                        <div id="stats-source" style='width: 100%;'></div>
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
		{value: 'fuel_level_00', label: 'Poziom opału'},
		{value: 'light_level_00', label: 'Czujnik światła'},
		{value: 'light_level_01', label: 'light_level_01'},
		{value: 'avg.cd.energy_meter_03', label: 'Energia całkowita (aggr)'},
		{value: 'avg.cd.energy_meter_00', label: 'Energia studnia (aggr)'},
		{value: 'avg.cd.energy_meter_01', label: 'Energia kotłownia (aggr)'},
		{value: 'avg.cd.energy_meter_02', label: 'Energia Szafa (aggr)'},
		{value: 'avg.cd.energy_meter_04', label: 'Energia teletechnika (aggr)'},
		{value: 'avg.cd.energy_meter_05', label: 'Energia Rekuperator (aggr)'},
		{value: 'avg.cd.energy_meter_06', label: 'Energia kuchnia (aggr)'},
		{value: 'avg.cd.energy_meter_07', label: 'Energia pralnia (aggr)'},
		{value: 'energy_meter_03', label: 'Energia całkowita'},
		{value: 'energy_meter_00', label: 'Energia studnia'},
		{value: 'energy_meter_01', label: 'Energia kotłownia'},
		{value: 'energy_meter_02', label: 'Energia Szafa'},
		{value: 'energy_meter_04', label: 'Energia teletechnika'},
		{value: 'energy_meter_05', label: 'Energia Rekuperator'},
		{value: 'energy_meter_06', label: 'Energia kuchnia'},
		{value: 'energy_meter_07', label: 'Energia pralnia'},
		{value: 'temperature_28', label: 'Temperatura zewnętrzna'},
		{value: 'temperature_05', label: 'Wiatrołap'},
		{value: 'temperature_21', label: 'Hol'},
		{value: 'temperature_06', label: 'Łazienka dół'},
		{value: 'temperature_26', label: 'Salon'},
		{value: 'temperature_24', label: 'Salon (kominek)'},
		{value: 'temperature_22', label: 'Jadalnia'},
		{value: 'temperature_20', label: 'Kuchnia'},
		{value: 'temperature_09', label: 'Gabient'},
		{value: 'temperature_23', label: 'Garaż'},
		{value: 'temperature_07', label: 'Spiżarnia'},
		{value: 'temperature_27', label: 'Kotłownia'},
		{value: 'temperature_10', label: 'Korytarz góra'},
		{value: 'temperature_13', label: 'Sypialnia'},
		{value: 'temperature_11', label: 'Garderoba'},
		{value: 'temperature_14', label: 'P1'},
		{value: 'temperature_15', label: 'P2'},
		{value: 'temperature_18', label: 'Łazienka góra'},
		{value: 'temperature_12', label: 'Bawialnia'},
		{value: 'temperature_04', label: 'Pralnia'},
		{value: 'temperature_16', label: 'P3'},
		{value: 'temperature_17', label: 'P4'},
		{value: 'temperature_19', label: 'Wyłaz dachowy'},
		{value: 'temperature_42', label: 'Temperatura szafy'},
		{value: 'temperature_44', label: 'CO'},
		{value: 'temperature_46', label: 'CWU'},
		{value: 'temperature_48', label: 'CO Powrót'},
		{value: 'temperature_49', label: 'CO Spaliny'},
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