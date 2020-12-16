import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ReceivableService } from '../receivable.service';

@Component({
  selector: 'app-receivable-list',
  templateUrl: './receivable-list.component.html',
  styleUrls: ['./receivable-list.component.css']
})
export class ReceivableListComponent implements OnInit {

  
  constructor(private recSrv: ReceivableService){}

  singleRowSelected:boolean = false;

  noRowSelected:boolean = true;


  columnDefs = [
    { field: 'id', hide: true },
    { field: 'receivableDate' ,type: ['dateColumn'] , checkboxSelection:true},
    { field: 'receiveFrom'},
    { field: 'amount', type: 'numericColumn'},
    { field: 'description'},
    { field: 'detail' },
    { field: 'paymentStatus' ,
        cellStyle: function(params) 
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
             this.recSrv.dataModified.subscribe(
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
    this.recSrv.setRowSelectedForUpdate(selectedData[0]);
  }

  delete()
  {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if(selectedData.length === 0)
      return;
    this.recSrv.delete(selectedData);
  }

  refreshGrid()
  {
    this.rowData = this.recSrv.getReceivableForOneMonth();
    this.singleRowSelected = false;
    this.noRowSelected = true;
  }
}
