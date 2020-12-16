import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-pie-chart',
  templateUrl: './expense-pie-chart.component.html',
  styleUrls: ['./expense-pie-chart.component.css']
})
export class ExpensePieChartComponent implements OnInit {

  constructor(private expSrv: ExpenseService) { }
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType = 'pie';
  dataLoaded:boolean = false;

  ngOnInit() {

    this.expSrv.getSummaryForOneMonthByCategory().subscribe(
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
