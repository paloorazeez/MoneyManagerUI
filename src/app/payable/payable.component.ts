import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PayableService } from './payable.service';

@Component({
  selector: 'app-payable',
  templateUrl: './payable.component.html',
  styleUrls: ['./payable.component.css']
})
export class PayableComponent implements OnInit {

  @ViewChild('payForm') payForm: NgForm;
 
  constructor(private paySrv:PayableService) { }

  saveMode:boolean = true;

  payToList:string[];
  payToOtherSelected:boolean = false;

  ngOnInit() {

    this.reloadPayToList();
 

    this.paySrv.custPayToChanged.subscribe(
      data=>{
    
        console.log("Reloading payTo");
        this.reloadPayToList();
        
      }
      
    );
    
    
    this.paySrv.rowSelectedForEdit.subscribe(
      data=>{
        console.log("Payable comp updated");
        console.log(data);
          if(this.payForm != undefined)
          {
            
            this.payForm.setValue(data);
            this.payToOtherSelected = false;
            
          }
          else{
            console.log("payForm undefined");
            
          }
            
        
      }
    )
  }

  onSubmit(payForm:NgForm){
    if(payForm.invalid)
      return
    let custPayToCtrl = <HTMLInputElement>document.getElementById("custpayto");
    let custPayTo = null;
    if(custPayToCtrl != null)
      custPayTo = custPayToCtrl.value;
    if(this.payToOtherSelected && (!custPayTo || custPayTo.trim() === ''))
        {
          console.log("invalid payForm: "+custPayTo);
          
          return;
        }
      else if(this.payToOtherSelected)
      { 
        payForm.value.payTo = custPayTo;
        this.paySrv.setPayToAdded(true);
      }
    console.log(this.payForm.value);

    if(this.saveMode)
    {
      this.paySrv.save(payForm.value, this.payToOtherSelected);
      //clear the form show toast
      this.clearForm();
      
    }
  }

  clearForm()
  {
    this.payForm.setValue({
      id:null,
      user:null,
      payTo:null,
      description:null,
      detail:null,
      amount:null,
      paymentDate: null,
      createdDate: null,
      status: null,
      updatedDate:null
    });

    let custpayToCtrl = <HTMLInputElement>document.getElementById("custpayto");
    if(custpayToCtrl != null)
       custpayToCtrl.value = "";
    this.payToOtherSelected=false;
  }
  
  onPayToChange()
  {
    if(this.payForm.value.payTo === "Other")
      this.payToOtherSelected = true;
    else
      this.payToOtherSelected = false;
  }

  reloadPayToList()
  {
    this.paySrv.getPayToList().subscribe(
      data=>{
        this.payToList = data;
      }
    );
  }

}
