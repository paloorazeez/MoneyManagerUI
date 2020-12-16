import { Component, OnInit } from '@angular/core';
import { PayableService } from '../payable.service';

@Component({
  selector: 'app-payable-pie-chart',
  templateUrl: './payable-pie-chart.component.html',
  styleUrls: ['./payable-pie-chart.component.css']
})
export class PayablePieChartComponent implements OnInit {

  constructor(private paySrv: PayableService) { }
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType = 'pie';
  dataLoaded:boolean = false;

  ngOnInit() {

    this.paySrv.getSummaryForOneMonthByPayTo().subscribe(
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
