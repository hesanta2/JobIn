import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyRepository {

  constructor(private readonly httpClient: HttpClient) { }

  public getCompanies(): Observable<any[]> {
    const httpOptions = this.getHttpOptions();

    return this.httpClient.get<any[]>(`${environment.apiBaseUrl}/Company`, httpOptions);
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
