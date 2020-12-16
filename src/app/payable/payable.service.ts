import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ExpenseSummary } from '../expense/expense-summary';
import { Payable } from './Payable';

@Injectable({
  providedIn: 'root'
})
export class PayableService {

  constructor(private http:HttpClient, private authSrv:AuthService) { 

   
  }

  rowSelectedForEdit = new BehaviorSubject<Payable>(null);

  dataModified = new BehaviorSubject<Boolean>(null);

  custPayToChanged = new BehaviorSubject<Boolean>(null);

  getPayableForOneMonth()
  {
    const userData = this.authSrv.getLoggedInUser();

      if(userData)
      {
         const expenseList = this.http.get<Payable[]>("http://localhost:8080/payables/findPayableForOneMonth?userId="+userData.userId);
         
         return expenseList;

      }
    
  }


  getPayToList()
  {
    const userData = this.authSrv.getLoggedInUser();
    if(userData)
    {
      const catList = this.http.get<string[]>("http://localhost:8080/payables/findPayToList?userId="+userData.userId);
      return catList;
    }
  }

  getSummaryForOneMonthByPayTo()
  {
    const userData = this.authSrv.getLoggedInUser();
    if(userData)
    {
      const result = this.http.get<ExpenseSummary>("http://localhost:8080/payables/findSummaryByPayToOneMonth?userId="+userData.userId);
      console.log(result);
      return result;
    }
  }

  

  save(payable:Payable, payToModified: boolean)
  {
    const userData = this.authSrv.getLoggedInUser();
    
      this.http.post("http://localhost:8080/payables",{
        "id":payable.id,
        "user":{
          "id": userData.userId
        },
        "paymentDate": payable.paymentDate,
        "payTo": payable.payTo,
        "description": payable.description,
        "detail": payable.detail,
        "amount": payable.amount,
        "createdDate": payable.createdDate,
        "status": payable.status

      }).subscribe(
        data=>{
          this.dataModified.next(true)
          console.log("grid data modification event fired");
          if(payToModified)
          {
            this.custPayToChanged.next(true);
          }
        }
      )
  }


  delete(payableList: Payable[])
  {
      console.log("payableList:  "+JSON.stringify(payableList));
     
      const params={
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body:{
          payableList:payableList
          
        }
      }
      console.log(JSON.stringify(params));
      
      this.http.delete("http://localhost:8080/payables",params).subscribe(
        data=>
        {
          this.dataModified.next(true)
          console.log(data);
          
        }
      )
  }

  setRowSelectedForUpdate(row: Payable)
  {
      this.rowSelectedForEdit.next(row);
  }

  setPayToAdded(flag:boolean)
  {
      this.custPayToChanged.next(flag);
  }
}
