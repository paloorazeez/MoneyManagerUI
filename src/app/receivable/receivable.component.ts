import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReceivableService } from './receivable.service';

@Component({
  selector: 'app-receivable',
  templateUrl: './receivable.component.html',
  styleUrls: ['./receivable.component.css']
})
export class ReceivableComponent implements OnInit {

  @ViewChild('recForm') recForm: NgForm;
 
  constructor(private recSrv:ReceivableService) { }

  saveMode:boolean = true;

  receiveFromList:string[];
  recFromOtherSelected:boolean = false;

  ngOnInit() {

    this.reloadReceiveFromList();
 

    this.recSrv.custReceiveFromChanged.subscribe(
      data=>{
    
        console.log("Reloading receiveFrom");
        this.reloadReceiveFromList();
        
      }
      
    );
    
    
    this.recSrv.rowSelectedForEdit.subscribe(
      data=>{
        console.log("Receivable comp updated");
        console.log(data);
          if(this.recForm != undefined)
          {
            
            this.recForm.setValue(data);
            this.recFromOtherSelected = false;
            
          }
          else{
            console.log("recForm undefined");
            
          }
            
        
      }
    )
  }

  onSubmit(recForm:NgForm){
    if(recForm.invalid)
      return
    let custRecFromCtrl = <HTMLInputElement>document.getElementById("custrecfrom");
    let custRecFrom = null;
    if(custRecFromCtrl != null)
      custRecFrom = custRecFromCtrl.value;
    if(this.recFromOtherSelected && (!custRecFrom || custRecFrom.trim() === ''))
        {
          console.log("invalid recFrom: "+custRecFrom);
          
          return;
        }
      else if(this.recFromOtherSelected)
      { 
        recForm.value.receiveFrom = custRecFrom;
        this.recSrv.setReceiveFromAdded(true);
      }
    console.log(this.recForm.value);

    if(this.saveMode)
    {
      this.recSrv.save(recForm.value, this.recFromOtherSelected);
      //clear the form show toast
      this.clearForm();
      
    }
  }

  clearForm()
  {
    this.recForm.setValue({
      id:null,
      user:null,
      receiveFrom:null,
      description:null,
      detail:null,
      amount:null,
      receivableDate: null,
      createdDate: null,
      paymentStatus: null,
      updatedDate:null
    });

    let custrecFromCtrl = <HTMLInputElement>document.getElementById("custrecfrom");
    if(custrecFromCtrl != null)
      custrecFromCtrl.value = "";
    this.recFromOtherSelected=false;
  }
  
  onReceiveFromChange()
  {
    if(this.recForm.value.receiveFrom === "Other")
      this.recFromOtherSelected = true;
    else
      this.recFromOtherSelected = false;
  }

  reloadReceiveFromList()
  {
    this.recSrv.getReceiveFromList().subscribe(
      data=>{
        this.receiveFromList = data;
      }
    );
  }
}
