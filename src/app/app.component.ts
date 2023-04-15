import { AfterViewInit, Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CompanyRepository } from './infrastructure/repositories/company.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'JobIn';
  public companies: any[];

  constructor(private readonly companyRepository: CompanyRepository) { }

  async ngAfterViewInit(): Promise<void> {
    this.companies = await firstValueFrom(this.companyRepository.getCompanies());
  }

  async ngOnInit(): Promise<void> {
  }
}
