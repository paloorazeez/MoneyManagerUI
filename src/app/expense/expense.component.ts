import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Expense } from './expense';
import { ExpenseService } from './expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  @ViewChild('expForm') expForm: NgForm;
  rowEdit:Observable<Expense>;
  constructor(private expSrv:ExpenseService) { }

  saveMode:boolean = true;

  categoryList:string[];
  catetoryOtherSelected:boolean = false;

  ngOnInit() {

    this.expSrv.getCategoryList().subscribe(
      data=>{
        this.categoryList = data;
      }
    );

    this.expSrv.custCategoryChanged.subscribe(
      data=>{
          //reload grid
      
        console.log("Reloading category");
        
        this.expSrv.getCategoryList().subscribe(
          data=>{
            this.categoryList = data;
          }
        );
      }
      
    );
    
    //this.expSrv.getExpenseForOneMonth();
    this.expSrv.rowSelectedForEdit.subscribe(
      data=>{
        console.log("Expense comp updated");
        console.log(data);
          if(this.expForm != undefined)
          {
            console.log("category"+data);
            this.expForm.setValue(data);
            //this.expForm.value.category=data.category
            this.catetoryOtherSelected = false;
            
          }
          else{
            console.log("expForm undefined");
            
          }
            
        
      }
    )
  }

  onSubmit(expForm:NgForm){
    if(expForm.invalid)
      return
    let custCategoryCtrl = <HTMLInputElement>document.getElementById("custcategory");
    let custCategory = null;
    if(custCategoryCtrl != null)
      custCategory = custCategoryCtrl.value;
    if(this.catetoryOtherSelected && (!custCategory || custCategory.trim() === ''))
        {
          console.log("invalid category: "+custCategory);
          
          return;
        }
      else if(this.catetoryOtherSelected)
      { 
          this.expForm.value.category = custCategory;
          this.expSrv.setCustomCategoryAdded(true);
      }
    console.log(expForm.value);

    const category = expForm.value.category;
    const description = expForm.value.description;
    const detail = expForm.value.detail;
    const amount = expForm.value.amount;
    const expenseDate = expForm.value.expenseDate;

    if(this.saveMode)
    {
      this.expSrv.save2(expForm.value, this.catetoryOtherSelected);
      //clear the form show toast
      this.clearForm();
      
    }
  }

  clearForm()
  {
    this.expForm.setValue({
      id:null,
      user:null,
      category:null,
      description:null,
      detail:null,
      amount:null,
      expenseDate: null,
      createdDate: null,
      proof: null,
      updatedDate:null
    });

    let custCategoryCtrl = <HTMLInputElement>document.getElementById("custcategory");
    if(custCategoryCtrl != null)
      custCategoryCtrl.value = "";
    this.catetoryOtherSelected=false;
  }
  
  onCategoryChange()
  {
    if(this.expForm.value.category === "Other")
      this.catetoryOtherSelected = true;
    else
      this.catetoryOtherSelected = false;
  }

  reloadCategory()
  {
    this.expSrv.getCategoryList().subscribe(
      data=>{
        this.categoryList = data;
      }
    );
  }

}
