import { Component, OnInit, ViewChild } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ControllerService } from 'src/app/services/controller.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  billItems: any;
  catItems: any;
  billForm: FormGroup;

  constructor(private providerSvc: ProviderService, private formBuilder: FormBuilder, public dialog:MatDialog, public snackBar: MatSnackBar, public ctrl: ControllerService) { }

  displayedColumns: string[] = ['no', 'date', 'name', 'amount'];
  dataSource = new MatTableDataSource<any>();
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
    this.getCategoryData();
    this.createFormGroup();
  }

  getData() {
    this.providerSvc.getData("bill.php").subscribe(
      data => {
        if (data != null) {
          this.billItems = data;
          this.dataSource.data = this.billItems;
        }
      }, error => {
        console.log("Error: ", error);
      }
    )
  }
  
  getCategoryData() {
    this.providerSvc.getData("category.php").subscribe(
      data => {
        if (data != null) {
          this.catItems = data;
        }
      }, error => {
        console.log("Error: ", error);
      }
    )
  }

  createFormGroup() {
    this.billForm = this.formBuilder.group({
      invoiceNo: ['', [Validators.pattern('[0-9]*'), Validators.required]],
      invoiceDate: ['', Validators.required],
      billCategory: [''],
      amount: ['']
    })
  }

  get invoiceNo() {
    return this.billForm.get('invoiceNo');
  }

  get invoiceDate() {
    return this.billForm.get('invoiceDate');
  }
  
  get billCategory() {
    return this.billForm.get('billCategory');
  }

  get amount() {
    return this.billForm.get('amount');
  }

  openDialog(templateDialog) {
    this.ctrl.openModal(templateDialog);
  }

  closeDialog() {
    this.ctrl.closeModal();
  }

  onSubmit() {
    let dataPost = new FormData();
    dataPost.append('inputInvoiceNo', this.billForm.get('invoiceNo').value);
    dataPost.append('inputInvoiceDate', this.billForm.get('invoiceDate').value);
    dataPost.append('inputCategory', this.billForm.get('billCategory').value);
    dataPost.append('inputAmount', this.billForm.get('amount').value);
    this.providerSvc.postData("bill_add.php", dataPost).subscribe(
      res => {
        this.closeDialog();
        this.getData();
      }, err => {
        console.log("Error: ", err);
      }
    )
  }

}
