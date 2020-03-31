import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ProviderService } from 'src/app/services/provider.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenseItems: any;
  catItems: any;
  expenseForm: FormGroup;

  constructor(private providerSvc: ProviderService, private formBuilder: FormBuilder, public dialog:MatDialog, public snackBar: MatSnackBar) { }

  displayedColumns: string[] = ['no', 'date', 'name', 'amount', 'remark'];
  dataSource = new MatTableDataSource<any>();
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
    this.createFormGroup();
  }

  getData() {
    this.providerSvc.getData("expense.php").subscribe(
      data => {
        if (data != null) {
          this.expenseItems = data;
          this.dataSource.data = this.expenseItems;
        }
      }, error => {
        console.log("Error: ", error);
      }
    )
  }

  createFormGroup() {
    this.expenseForm = this.formBuilder.group({
      category: ['', Validators.required],
      amount: ['', [Validators.pattern('[0-9]*'), Validators.required]],
      remark: ['']
    })
  }

  get category() {
    return this.expenseForm.get('category');
  }

  get amount() {
    return this.expenseForm.get('amount');
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    
    const modalDialog = this.dialog.open(ModalComponent, dialogConfig);

  }
}