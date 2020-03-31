import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Money Tracker';
  navItems = [
    {
      icon: 'far fa-window-restore',
      navName: 'Dashboard',
      navLink: '/dashboard'
    },
    {
      icon: 'fas fa-money-bill-alt',
      navName: 'Incomes',
      navLink: '/income'
    },
    {
      icon: 'far fa-money-bill-alt',
      navName: 'Expenses',
      navLink: '/expense'
    },
    {
      icon: 'fas fa-receipt',
      navName: 'Bills & Payments',
      navLink: '/bill'
    },
    {
      icon: 'fas fa-user-friends',
      navName: 'Debt',
      navLink: '/debt'
    },
    {
      icon: 'far fa-chart-bar',
      navName: 'Reports',
      navLink: '/report'
    },
    {
      icon: 'fas fa-list',
      navName: 'Categories',
      navLink: '/category'
    },
    {
      icon: 'fas fa-cog',
      navName: 'Settings',
      navLink: '/setting'
    }
  ];

  constructor(public matDialog: MatDialog) {  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);

  }

}
