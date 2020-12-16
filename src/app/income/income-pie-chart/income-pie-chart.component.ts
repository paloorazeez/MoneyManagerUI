import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-income-pie-chart',
  templateUrl: './income-pie-chart.component.html',
  styleUrls: ['./income-pie-chart.component.css']
})
export class IncomePieChartComponent implements OnInit {

  constructor(private incSrc: IncomeService) { }
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType = 'pie';
  dataLoaded:boolean = false;

  ngOnInit() {

    this.incSrc.getSummaryForOneMonthByCategory().subscribe(
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
