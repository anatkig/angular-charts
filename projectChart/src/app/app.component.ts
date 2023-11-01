
import * as Highcharts from "highcharts";
import { HighchartsChartModule } from 'highcharts-angular';
import HC_exporting from 'highcharts/modules/exporting';
import HC_Data from 'highcharts/modules/export-data';
import Accessbility from 'highcharts/modules/accessibility';
import { Component, VERSION, ViewChild, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

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
}
