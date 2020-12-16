import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { ExpenseListComponent } from './expense/expense-list/expense-list.component';
import { ExpensePieChartComponent } from './expense/expense-pie-chart/expense-pie-chart.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomePieChartComponent } from './income/income-pie-chart/income-pie-chart.component';
import { IncomeComponent } from './income/income.component';
import { PayablePieChartComponent } from './payable/payable-pie-chart/payable-pie-chart.component';
import { PayableComponent } from './payable/payable.component';
import { ReceivablePieChartComponent } from './receivable/receivable-pie-chart/receivable-pie-chart.component';
import { ReceivableComponent } from './receivable/receivable.component';

const routes: Routes = [
  {
    path:'income',
    component: IncomeComponent
  },
  {
    path:'expense',
    component:ExpenseComponent
  },
  {
    path:'receivable',
    component: ReceivableComponent
  },
  {
    path:'payable',
    component:PayableComponent
  },
  {
    path: 'auth',
    component:AuthComponent
  },
  {
    path:"expenseReport",
    component:ExpensePieChartComponent
  },
  {
    path:"incomeReport",
    component: IncomePieChartComponent
  },
  {
    path:"receivableReport",
    component: ReceivablePieChartComponent
  },
  {
    path:"payableReport",
    component: PayablePieChartComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
