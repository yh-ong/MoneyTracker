import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './pages/category/category.component';
import { BillComponent } from './pages/bill/bill.component';
import { ReportComponent } from './pages/report/report.component';
import { ModalComponent } from './components/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { IncomeComponent } from './pages/income/income.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebtComponent } from './pages/debt/debt.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    ExpenseComponent,
    CategoryComponent,
    BillComponent,
    ReportComponent,
    ModalComponent,
    IncomeComponent,
    DebtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent],
})
export class AppModule { }
