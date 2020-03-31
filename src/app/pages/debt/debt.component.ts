import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ControllerService } from 'src/app/services/controller.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.css']
})
export class DebtComponent implements OnInit {

  debtItems: any;
  debtForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public matDialog: MatDialog, private providerSvc: ProviderService, public ctrl: ControllerService) { }

  displayColumns: string[] = ['no', 'date', 'name', 'amount'];
  dataSource = new MatTableDataSource<any>(this.debtItems);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
    this.createFormGroup();
  }

  getData() {
    this.providerSvc.getData("debt.php").subscribe(
      data => {
        if (data != null) {
          this.debtItems = data;
          this.dataSource.data = this.debtItems;
        }
      }, error => {
        console.log("Error: ", error);
      }
    )
  }

  createFormGroup() {
    this.debtForm = this.formBuilder.group({
      amount: ['', [Validators.pattern('[0-9]*'), Validators.required]],
      name: ['', Validators.required]
    })
  }

  get amount() {
    return this.debtForm.get('amount');
  }

  get name() {
    return this.debtForm.get('name');
  }

  onSubmit() {
    let dataPost = new FormData();
    dataPost.append('inputName', this.debtForm.get('name').value);
    dataPost.append('inputAmount', this.debtForm.get('amount').value);
    this.providerSvc.postData("debt_add.php", dataPost).subscribe(
      res => {
        this.closeModal();
        this.getData();
      }, err => {
        console.log("Error: ", err);
      }
    )
  }

  openModal(templateModal) {
    this.ctrl.openModal(templateModal);
  }

  closeModal() {
    this.matDialog.closeAll();
  }

}
