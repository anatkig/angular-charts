
import * as Highcharts from "highcharts";
import { HighchartsChartModule } from 'highcharts-angular';
import HC_exporting from 'highcharts/modules/exporting';
import HC_Data from 'highcharts/modules/export-data';
import Accessbility from 'highcharts/modules/accessibility';
import { Component, VERSION, ViewChild, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

HC_exporting(Highcharts);
HC_Data(Highcharts);
Accessbility(Highcharts);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('lineChart', { static: false }) lineChart: any;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) {}

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  data = [1, 2, 3, 4];
  data2 = [2, 8, 9];
  title = 'projectChart';

  chartOptions: Highcharts.Options = {
    plotOptions: {
      series: {
        events: {
          legendItemClick: function () {
            return false; // Prevent the default click behavior for each series
          },
        },
      },
    },
    series: [
      {
        type: 'line',
        data: this.data,
        name: 'gor',
      },
      {
        type: 'line',
        data: this.data2,
      },
      {
        type: 'area',
        data: this.data2,
      },
    ],
    legend: {
      layout: 'horizontal',
      verticalAlign: 'bottom',
    },
    tooltip: {
      backgroundColor: '#FCFFC5',
      borderColor: 'black',
      formatter: function () {
        // Format the date to 'YYYY-MM-DD' using Highcharts.dateFormat
        const formattedDate = Highcharts.dateFormat('%Y-%m-%d', this.y as number);

        // this.y contains the data value
        const tooltipText = `Date: ${formattedDate}<br>Value: ${this.y}`;

        return tooltipText;
      },
      shared: true,
    },
    xAxis: {
      categories: ['10222023', '11222023'],
    },
  };

  
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'make'},
    { field: 'model'},
    { field: 'price' }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  
  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
