import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProviderService } from 'src/app/services/provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  expenseForm: FormGroup;
  catItems: any;

  constructor(public dialogRef: MatDialogRef<ModalComponent>, private providerSvc: ProviderService, public formBuilder: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategoryItems();
    this.createFormGroup();
  }

  closeModal() {
    this.dialogRef.close();
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

  onSubmit() {
    let dataPost = new FormData();
    dataPost.append('inputCategory', this.expenseForm.get('category').value);
    dataPost.append('inputAmount', this.expenseForm.get('amount').value);
    dataPost.append('inputRemark', this.expenseForm.get('remark').value);
    this.providerSvc.postData("expense_add.php", dataPost).subscribe(
      res => {
        this.closeModal();
        let snackRef = this.snackBar.open('Successful', 'Done', {
          duration: 2000
        });

        snackRef.afterDismissed().subscribe(res => {
          window.location.reload();
        })
      }, err => {
        console.log("Error: ", err);
      }
    )
  }


}
