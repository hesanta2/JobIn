import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Company } from 'src/app/domain/entities/company.entity';
import { CompanyRepository } from 'src/app/infrastructure/repositories/company.repository';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private readonly companiesRepository: CompanyRepository) { }

  public async getCompanies(): Promise<Company[]> {
    return await firstValueFrom(this.companiesRepository.getCompanies());
  }
}
