import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {

  
  constructor(private incSrc: IncomeService){}

  singleRowSelected:boolean = false;

  noRowSelected:boolean = true;


  columnDefs = [
    { field: 'id', hide: true },
    { field: 'incomeDate' ,type: ['dateColumn'] , checkboxSelection:true},
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
             this.incSrc.dataModified.subscribe(
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


  editIncome()
  {

    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if(selectedData.length !== 1)
      return;
    this.incSrc.setRowSelectedForUpdate(selectedData[0]);
  }

  deleteIncome()
  {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if(selectedData.length === 0)
      return;
    this.incSrc.delete(selectedData);
  }

  refreshGrid()
  {
    this.rowData = this.incSrc.getIncomeForOneMonth();
    this.singleRowSelected = false;
    this.noRowSelected = true;
  }
}
