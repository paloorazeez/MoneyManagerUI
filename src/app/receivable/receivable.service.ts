import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ExpenseSummary } from '../expense/expense-summary';
import { Receivable } from './receivable';

@Injectable({
  providedIn: 'root'
})
export class ReceivableService {

  constructor(private http:HttpClient, private authSrv:AuthService) { 

   
  }

  rowSelectedForEdit = new BehaviorSubject<Receivable>(null);

  dataModified = new BehaviorSubject<Boolean>(null);

  custReceiveFromChanged = new BehaviorSubject<Boolean>(null);

  getReceivableForOneMonth()
  {
    const userData = this.authSrv.getLoggedInUser();

      if(userData)
      {
         const expenseList = this.http.get<Receivable[]>("http://localhost:8080/receivables/findReceivableForOneMonth?userId="+userData.userId);
         
         return expenseList;

      }
    
  }


  getReceiveFromList()
  {
    const userData = this.authSrv.getLoggedInUser();
    if(userData)
    {
      const catList = this.http.get<string[]>("http://localhost:8080/receivables/findReceivableFromList?userId="+userData.userId);
      return catList;
    }
  }

  getSummaryForOneMonthByReceiveFrom()
  {
    const userData = this.authSrv.getLoggedInUser();
    if(userData)
    {
      const result = this.http.get<ExpenseSummary>("http://localhost:8080/receivables/findSummaryByReceivableOneMonth?userId="+userData.userId);
      console.log(result);
      return result;
    }
  }

  

  save(receivable:Receivable, recFromModified: boolean)
  {
    const userData = this.authSrv.getLoggedInUser();
    
      this.http.post("http://localhost:8080/receivables",{
        "id":receivable.id,
        "user":{
          "id": userData.userId
        },
        "receivableDate": receivable.receivableDate,
        "receiveFrom": receivable.receiveFrom,
        "description": receivable.description,
        "detail": receivable.detail,
        "amount": receivable.amount,
        "paymentStatus": receivable.paymentStatus,
        "createdDate": receivable.createdDate

      }).subscribe(
        data=>{
          this.dataModified.next(true)
          console.log("grid data modification event fired");
          if(recFromModified)
          {
            this.custReceiveFromChanged.next(true);
          }
        }
      )
  }


  delete(receivableList: Receivable[])
  {
      console.log("receivableList:  "+JSON.stringify(receivableList));
     
      const params={
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body:{
          receivableList:receivableList
          
        }
      }
      console.log(JSON.stringify(params));
      
      this.http.delete("http://localhost:8080/receivables",params).subscribe(
        data=>
        {
          this.dataModified.next(true)
          console.log(data);
          
        }
      )
  }

  setRowSelectedForUpdate(row: Receivable)
  {
      this.rowSelectedForEdit.next(row);
  }

  setReceiveFromAdded(flag:boolean)
  {
      this.custReceiveFromChanged.next(flag);
  }
}
