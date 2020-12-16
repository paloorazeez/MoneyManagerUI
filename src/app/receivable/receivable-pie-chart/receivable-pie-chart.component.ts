import { Component, OnInit } from '@angular/core';
import { ReceivableService } from '../receivable.service';

@Component({
  selector: 'app-receivable-pie-chart',
  templateUrl: './receivable-pie-chart.component.html',
  styleUrls: ['./receivable-pie-chart.component.css']
})
export class ReceivablePieChartComponent implements OnInit {

  constructor(private recSrv: ReceivableService) { }
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType = 'pie';
  dataLoaded:boolean = false;

  ngOnInit() {

    this.recSrv.getSummaryForOneMonthByReceiveFrom().subscribe(
        data=>{
           console.log("data in component:"+data.categoryArr);
           console.log(data.totalAmtArr);
           
            this.pieChartLabels= data.categoryArr;
            this.pieChartData = data.totalAmtArr;
            this.dataLoaded = true;
        }
    );
  }

}
