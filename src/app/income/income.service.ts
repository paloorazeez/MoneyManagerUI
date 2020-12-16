import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ExpenseSummary } from '../expense/expense-summary';
import { Income } from './income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  
  constructor(private http:HttpClient, private authSrv:AuthService) { 

   
  }

  rowSelectedForEdit = new BehaviorSubject<Income>(null);

  dataModified = new BehaviorSubject<Boolean>(null);

  custCategoryChanged = new BehaviorSubject<Boolean>(null);

  getIncomeForOneMonth()
  {
    const userData = this.authSrv.getLoggedInUser();

      if(userData)
      {
         const expenseList = this.http.get<Income[]>("http://localhost:8080/incomes/findIncomeForOneMonth?userId="+userData.userId);
         
         return expenseList;

      }
    
  }


  getCategoryList()
  {
    const userData = this.authSrv.getLoggedInUser();
    if(userData)
    {
      const catList = this.http.get<string[]>("http://localhost:8080/incomes/findCategoryList?userId="+userData.userId);
      return catList;
    }
  }

  getSummaryForOneMonthByCategory()
  {
    const userData = this.authSrv.getLoggedInUser();
    if(userData)
    {
      const result = this.http.get<ExpenseSummary>("http://localhost:8080/incomes/findSummaryByCatForOneMonth?userId="+userData.userId);
      console.log(result);
      return result;
    }
  }

  

  save(income:Income, catModified: boolean)
  {
    const userData = this.authSrv.getLoggedInUser();
    
      this.http.post("http://localhost:8080/incomes",{
        "id":income.id,
        "user":{
          "id": userData.userId
        },
        "incomeDate": income.incomeDate,
        "category": income.category,
        "description": income.description,
        "detail": income.detail,
        "amount": income.amount,
        "createdDate": income.createdDate

      }).subscribe(
        data=>{
          this.dataModified.next(true)
          console.log("grid data modification event fired");
          if(catModified)
          {
            this.custCategoryChanged.next(true);
          }
        }
      )
  }


  delete(incomeList: Income[])
  {
      console.log("incomeList:  "+JSON.stringify(incomeList));
     
      const params={
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body:{
          incomeList:incomeList
          
        }
      }
      console.log(JSON.stringify(params));
      
      this.http.delete("http://localhost:8080/incomes",params).subscribe(
        data=>
        {
          this.dataModified.next(true)
          console.log(data);
          
        }
      )
  }

  setRowSelectedForUpdate(row: Income)
  {
      this.rowSelectedForEdit.next(row);
  }

  setCustomCategoryAdded(flag:boolean)
  {
      this.custCategoryChanged.next(flag);
  }
}
