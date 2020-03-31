import { Component, OnInit, ViewChild } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  catItems:any;
  categoryForm: FormGroup;
  // form = new CategoryForm();

  constructor( private providerSvc: ProviderService, private formBuilder: FormBuilder, public snackBar: MatSnackBar, public dialog: MatDialog ) {  }

  displayedColumns: string[] = ['no', 'name'];
  dataSource = new MatTableDataSource<any>(this.catItems);
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
    this.providerSvc.getData("category.php").subscribe(
      data => {
        if (data != null) {
          this.catItems = data;
          this.dataSource.data = this.catItems;
        }
      }, error => {
        console.log("Error: ", error);
      }
    )
  }

  createFormGroup() {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    })
  }

  get name() {
    return this.categoryForm.get('name');
  }

  onSubmit() {
    let dataPost = new FormData();
    dataPost.append('inputCategory', this.categoryForm.get('name').value);
    this.providerSvc.postData("category_add.php", dataPost).subscribe(
      res => {
        this.closeModal();
        this.snackBar.open('Successful', 'Done', {
          duration: 2000
        });
        this.getData();
      }, err => {
        console.log("Error: ", err);
      }
    )
  }

  onClear() {
    this.categoryForm.reset();
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
        width: '500px'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //     window.location.reload();
    // });
  }

  closeModal() {
    this.dialog.closeAll();
  }

}

// export class CategoryForm {
//   public name: string;
// }

export interface PeriodicElement {
  category_id: number;
  category_name: string;
}

// export interface PeriodicElement {
//   name: string;
//   position: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen'},
//   {position: 2, name: 'Helium'},
//   {position: 3, name: 'Lithium'},
//   {position: 4, name: 'Beryllium'},
//   {position: 5, name: 'Boron'},
// ];

