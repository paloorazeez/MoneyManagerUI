import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IncomeService } from './income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  @ViewChild('incForm') incForm: NgForm;
 
  constructor(private incSrv:IncomeService) { }

  saveMode:boolean = true;

  categoryList:string[];
  catetoryOtherSelected:boolean = false;

  ngOnInit() {

    this.incSrv.getCategoryList().subscribe(
      data=>{
        this.categoryList = data;
      }
    );

    this.incSrv.custCategoryChanged.subscribe(
      data=>{
          //reload grid
      
        console.log("Reloading category");
        
        this.incSrv.getCategoryList().subscribe(
          data=>{
            this.categoryList = data;
          }
        );
      }
      
    );
    
    
    this.incSrv.rowSelectedForEdit.subscribe(
      data=>{
        console.log("Income comp updated");
        console.log(data);
          if(this.incForm != undefined)
          {
            console.log("category"+data);
            this.incForm.setValue(data);
            this.catetoryOtherSelected = false;
            
          }
          else{
            console.log("incForm undefined");
            
          }
            
        
      }
    )
  }

  onSubmit(incForm:NgForm){
    if(incForm.invalid)
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
          this.incForm.value.category = custCategory;
          this.incSrv.setCustomCategoryAdded(true);
      }
    console.log(incForm.value);

    const category = incForm.value.category;
    const description = incForm.value.description;
    const detail = incForm.value.detail;
    const amount = incForm.value.amount;
    const expenseDate = incForm.value.expenseDate;

    if(this.saveMode)
    {
      this.incSrv.save(incForm.value, this.catetoryOtherSelected);
      //clear the form show toast
      this.clearForm();
      
    }
  }

  clearForm()
  {
    this.incForm.setValue({
      id:null,
      user:null,
      category:null,
      description:null,
      detail:null,
      amount:null,
      incomeDate: null,
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
    if(this.incForm.value.category === "Other")
      this.catetoryOtherSelected = true;
    else
      this.catetoryOtherSelected = false;
  }

  reloadCategory()
  {
    this.incSrv.getCategoryList().subscribe(
      data=>{
        this.categoryList = data;
      }
    );
  }
}
