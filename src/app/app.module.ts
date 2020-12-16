import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ExpenseComponent } from './expense/expense.component';
import { ReceivableComponent } from './receivable/receivable.component';
import { PayableComponent } from './payable/payable.component';
import { ExpenseService } from './expense/expense.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AgGridModule } from 'ag-grid-angular';
import { ExpenseListComponent } from './expense/expense-list/expense-list.component';
import { ChartsModule } from 'ng2-charts';
import { ExpensePieChartComponent } from './expense/expense-pie-chart/expense-pie-chart.component';
import { DropdownDirectiveDirective } from './shared/dropdown.directive.directive';
import { IncomeComponent } from './income/income.component';
import { IncomeListComponent } from './income/income-list/income-list.component';
import { IncomePieChartComponent } from './income/income-pie-chart/income-pie-chart.component';
import { ReceivableListComponent } from './receivable/receivable-list/receivable-list.component';
import { ReceivablePieChartComponent } from './receivable/receivable-pie-chart/receivable-pie-chart.component';
import { PayableListComponent } from './payable/payable-list/payable-list.component';
import { PayablePieChartComponent } from './payable/payable-pie-chart/payable-pie-chart.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
//import 'ag-grid-enterprise';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    ExpenseComponent,
    ReceivableComponent,
    PayableComponent,
    ExpenseListComponent,
    ExpensePieChartComponent,
    ExpensePieChartComponent,
    DropdownDirectiveDirective,
    IncomeComponent,
    IncomeListComponent,
    IncomePieChartComponent,
    ReceivableListComponent,
    ReceivablePieChartComponent,
    PayableListComponent,
    PayablePieChartComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    ChartsModule
  ],
  providers: [ExpenseService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
