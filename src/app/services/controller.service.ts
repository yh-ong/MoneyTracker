import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(public matDialog: MatDialog) { }

 /*  openModal(templateModal) {
    return this.matDialog.open(templateModal, {
      width: '500px'
    });
  } */

  openModal(templateModal) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.height = 'auto';
    dialogConfig.width = '600px';

    const modalDialog = this.matDialog.open(templateModal, dialogConfig);
  }

  closeModal() {
    this.matDialog.closeAll();
  }
}
