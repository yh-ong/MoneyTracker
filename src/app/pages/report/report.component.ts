import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  catItems: any = [
    { 'category_name' : 'Income' },
    { 'category_name' : 'Expense' },
    { 'category_name' : 'Bills & Payment' },
    { 'category_name' : 'Debt' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }

}
