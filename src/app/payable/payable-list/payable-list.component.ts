import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { PayableService } from '../payable.service';

@Component({
  selector: 'app-payable-list',
  templateUrl: './payable-list.component.html',
  styleUrls: ['./payable-list.component.css']
})
export class PayableListComponent implements OnInit {

  constructor(private paySrv: PayableService){}

  singleRowSelected:boolean = false;

  noRowSelected:boolean = true;


  columnDefs = [
    { field: 'id', hide: true },
    { field: 'paymentDate' ,type: ['dateColumn'] , checkboxSelection:true},
    { field: 'payTo'},
    { field: 'amount', type: 'numericColumn'},
    { field: 'description'},
    { field: 'detail' },
    { field: 'status', cellStyle: function(params) 
        {
            if (params.value=='PAID') {
                //mark police cells as red
                return {color: 'green', backgroundColor: 'Aquamarine'};
            }else if (params.value=='PENDING') {
              //mark police cells as red
              return {color: 'LightPink', backgroundColor: 'Crimson'};
            } 
            else{
                return null;
            }
        }
    },
    { field: 'createdDate'},
    { field: 'updatedDate'}
];

rowData:any;

defaultColDef = {
  sortable: true,
  filter: true
};



@ViewChild("agGrid") agGrid: AgGridAngular;

ngOnInit(){

            this.refreshGrid();
             this.paySrv.dataModified.subscribe(
              data=>{
                    console.log("grod data modification event recieved");
                    
                    this.refreshGrid();
              }
            );


        }

 

getSelectedRows() {
  const selectedNodes = this.agGrid.api.getSelectedNodes();
  const selectedData = selectedNodes.map(node => node.data );
  
  if(selectedData.length==1)
    this.singleRowSelected = true;
   else
  
    this.singleRowSelected = false;
  
    
 if(selectedData.length>0)
    this.noRowSelected = false;
  else
    this.noRowSelected = true;
  const selectedDataStringPresentation = selectedData.map(node => node.category + ' ' + node.expenseDate).join(', ');
    
  //this.agGrid.api.refreshCells();

}


  edit()
  {

    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if(selectedData.length !== 1)
      return;
    this.paySrv.setRowSelectedForUpdate(selectedData[0]);
  }

  delete()
  {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if(selectedData.length === 0)
      return;
    this.paySrv.delete(selectedData);
  }

  refreshGrid()
  {
    this.rowData = this.paySrv.getPayableForOneMonth();
    this.singleRowSelected = false;
    this.noRowSelected = true;
  }

}
