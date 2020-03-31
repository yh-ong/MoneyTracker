import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { CategoryComponent } from './pages/category/category.component';
import { BillComponent } from './pages/bill/bill.component';
import { ReportComponent } from './pages/report/report.component';
import { IncomeComponent } from './pages/income/income.component';
import { DebtComponent } from './pages/debt/debt.component';

const appRoutes: Routes = [
  {
    path: '', 
    component: DashboardComponent
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'expense',
    component: ExpenseComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'bill',
    component: BillComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'income',
    component: IncomeComponent
  },
  {
    path: 'debt',
    component: DebtComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
