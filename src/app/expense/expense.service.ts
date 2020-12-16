import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, pipe } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Expense } from './expense';
import { ExpenseSummary } from './expense-summary';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient, private authSrv:AuthService) { 

   
  }

  rowSelectedForEdit = new BehaviorSubject<Expense>(null);

  dataModified = new BehaviorSubject<Boolean>(null);

  custCategoryChanged = new BehaviorSubject<Boolean>(null);

  getExpenseForOneMonth()
  {
    const userData = this.authSrv.getLoggedInUser();

      if(userData)
      {
         const expenseList = this.http.get<Expense[]>("http://localhost:8080/expenses/findExpenseForOneMonth?userId="+userData.userId);
         
         return expenseList;

      }
    
  }


  getCategoryList()
  {
    const userData = this.authSrv.getLoggedInUser();
    if(userData)
    {
      const catList = this.http.get<string[]>("http://localhost:8080/expenses/findCategoryList?userId="+userData.userId);
      return catList;
    }
  }

  getSummaryForOneMonthByCategory()
  {
    const userData = this.authSrv.getLoggedInUser();
    if(userData)
    {
      const result = this.http.get<ExpenseSummary>("http://localhost:8080/expenses/findSummaryByCatForOneMonth?userId="+userData.userId);
      console.log(result);
      return result;
    }
  }

  save(category: string, description: string, detail: string, amount: number, expenseDate: string)
  {
    const userData = this.authSrv.getLoggedInUser();
    
      this.http.post("http://localhost:8080/expenses",{
        "user":{
          "id": userData.userId
        },
        "expenseDate": expenseDate,
        "category": category,
        "description": description,
        "detail": detail,
        "amount": amount

      }).subscribe(
        data=>{
          this.dataModified.next(true)
          console.log("grid data modification event fired");
          
        }
        
      )
  }

  save2(expense:Expense, catModified: boolean)
  {
    const userData = this.authSrv.getLoggedInUser();
    
      this.http.post("http://localhost:8080/expenses",{
        "id":expense.id,
        "user":{
          "id": userData.userId
        },
        "expenseDate": expense.expenseDate,
        "category": expense.category,
        "description": expense.description,
        "detail": expense.detail,
        "amount": expense.amount,
        "createdDate": expense.createdDate

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


  delete(expenseList: Expense[])
  {
      console.log("expenseList:  "+JSON.stringify(expenseList));
      //const idList = expenseList.map(exp=>exp.id);
      //console.log("idList;"+idList);
      
      const params={
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body:{
          expenseList:expenseList
          
        }
      }
      console.log(JSON.stringify(params));
      
      this.http.delete("http://localhost:8080/expenses",params).subscribe(
        data=>
        {
          this.dataModified.next(true)
          console.log(data);
          
        }
      )
  }

  setRowSelectedForUpdate(row: Expense)
  {
      this.rowSelectedForEdit.next(row);
  }

  setCustomCategoryAdded(flag:boolean)
  {
      this.custCategoryChanged.next(flag);
  }
  

}
