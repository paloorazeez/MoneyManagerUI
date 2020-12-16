import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {


  constructor(private expSrv: ExpenseService){}

  singleRowSelected:boolean = false;

  noRowSelected:boolean = true;


  columnDefs = [
    { field: 'id', hide: true },
    { field: 'expenseDate' ,type: ['dateColumn'] , checkboxSelection:true},
    { field: 'category'},
    { field: 'amount', type: 'numericColumn'},
    { field: 'description'},
    { field: 'detail' },
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
             this.expSrv.dataModified.subscribe(
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
    
  this.agGrid.api.refreshCells();

}


  editExpense()
  {

    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if(selectedData.length !== 1)
      return;
    this.expSrv.setRowSelectedForUpdate(selectedData[0]);
  }

  deleteExpense()
  {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if(selectedData.length === 0)
      return;
    this.expSrv.delete(selectedData);
  }

  refreshGrid()
  {
    this.rowData = this.expSrv.getExpenseForOneMonth();
    this.singleRowSelected = false;
    this.noRowSelected = true;
  }
      
}
