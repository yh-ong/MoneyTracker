import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  expenseItems: any;
  expenseTotalAmount: any;
  incomeItems: any;
  incomeTotalAmount: any;
  billItems: any;
  billTotalAmount: number;
  debtItems: any;
  debtTotalAmount: any;

  constructor(private providerSvc: ProviderService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getExpenseData();
    this.getIncomeData();
    this.getBillData();
    this.getDebtData();
  }

  getExpenseData() {
    this.providerSvc.getData("expense.php").subscribe(
      data => {
        if (data != null) {
          this.expenseItems = data;
          let sum = 0;
          
          /* var totalRow = this.expenseItems.length;
          for(var i=0; i < totalRow; i++) {
            sum = sum + Number(data[i].amount);
          } */

          this.expenseItems.forEach(val => {
            sum += Number(val.amount);
          });

          this.expenseTotalAmount = sum;
        }
      }, error => {
        console.log("Error: ", error);
        let snackBarRef = this.snackBar.open('No Network Connection', 'Refresh');
        snackBarRef.afterDismissed().subscribe(() => {
          window.location.reload();
        });
      }
    )
  }
  
  getIncomeData() {
    this.providerSvc.getData("income.php").subscribe(
      data => {
        if (data != null) {
          this.incomeItems = data;
          let sum = 0;

          this.incomeItems.forEach(val => {
            sum += Number(val.amount);
          });

          this.incomeTotalAmount = sum;
        }
      }, error => {
        console.log("Error: ", error);
      }
    )
  }
  
  getBillData() {
    this.providerSvc.getData("bill.php").subscribe(
      data => {
        if (data != null) {
          this.billItems = data;
          let sum = 0;

          this.billItems.forEach(val => {
            sum += Number(val.amount);
          });

          this.billTotalAmount = sum;
        }
      }, error => {
        console.log("Error: ", error);
      }
    )
  }
  
  getDebtData() {
    this.providerSvc.getData("debt.php").subscribe(
      data => {
        if (data != null) {
          this.debtItems = data;
          let sum = 0;

          this.debtItems.forEach(val => {
            sum += Number(val.amount);
          });

          this.debtTotalAmount = sum;
        }
      }, error => {
        console.log("Error: ", error);
      }
    )
  }

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75, 99, 100, 70, 90, 95, 80], label: 'Income' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augusr', 'September', 'October', 'November', 'December'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: '',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

}