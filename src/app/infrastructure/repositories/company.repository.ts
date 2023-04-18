import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from 'src/app/domain/entities/company.entity';
import companies from '../../../assets/data/companies.json';

@Injectable({
  providedIn: 'root'
})
export class CompanyRepository {

  constructor(private readonly httpClient: HttpClient) { }

  public getCompanies(): Observable<Company[]> {
    const httpOptions = this.getHttpOptions();

    return of(companies as Company[]);
  }

  public getHttpOptions(contentType?: string) {
    return {
      headers: this.headers(contentType),
      params: new HttpParams()
    };
  }

  public appendParameter(params: HttpParams, name: string, value: string): HttpParams {
    if (!value) { return params; }

    params = params.append(name, value);

    return params;
  }

  private headers(contentType: string): HttpHeaders {
    let httpHeaders = new HttpHeaders({});

    if (contentType) {
      httpHeaders = httpHeaders.set('Content-Type', contentType)
    }

    return httpHeaders;
  }
}
