import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ProviderService } from 'src/app/services/provider.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  catItems:any;
  incomeItems: any;
  totalAmount: number;
  incomeForm: FormGroup;
  isLoading: boolean;

  constructor( private providerSvc: ProviderService, private formBuilder: FormBuilder, public dialog: MatDialog, public snackBar: MatSnackBar ) { }

  displayedColumns: string[] = ['no', 'date', 'amount'];
  dataSource = new MatTableDataSource<any>(this.catItems);
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
    this.getCategoryItems();
    this.createFormGroup();
  }

  getData() {
    this.providerSvc.getData("income.php").subscribe(
      data => {
        if (data != null) {
          this.incomeItems = data;
          this.dataSource.data = this.incomeItems;
        }
      }, error => {
        console.log("Error: ", error);
      }
    )
  }

  getCategoryItems() {
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
    this.incomeForm = this.formBuilder.group({
      // category: ['', Validators.required],
      amount: ['', [Validators.pattern('[0-9]*'), Validators.required]],
    })
  }

  get category() {
    return this.incomeForm.get('category');
  }

  get amount() {
    return this.incomeForm.get('amount');
  }

  onSubmit() {
    this.isLoading = true;
    let dataPost = new FormData();
    dataPost.append('inputAmount', this.incomeForm.get('amount').value);
    this.providerSvc.postData("income_add.php", dataPost).subscribe(
      res => {
        this.isLoading = false;
        this.closeModal();
        this.snackBar.open('Successful', 'Done', {
          duration: 2000
        });
        this.getData();
      }, err => {
        this.isLoading = false;
        console.log("Error: ", err);
      }
    )
  }

  openModal(templateModal) {
    this.dialog.open(templateModal, {
      width: '500px'
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }  

}
