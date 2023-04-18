import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CompanyService } from 'src/app/application/services/company.service';
import { Company } from 'src/app/domain/entities/company.entity';
import { SearchType } from './enums/search-type.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @ViewChild("searchInput") public searchInput: ElementRef;
  @Output() public onSearch = new EventEmitter<{ term: string, type: SearchType }>();
  public searchType = SearchType.Positions;
  public companies: Company[];
  public term: string;
  public suggestions: Company[];
  private timer: any;

  constructor(private readonly companyService: CompanyService) {
  }
  public async ngOnInit(): Promise<void> {
    const companies = await this.companyService.getCompanies();
    this.companies = JSON.parse(JSON.stringify(companies));
    this.companies.forEach(company => company.positions = undefined);
  }

  public search(event: KeyboardEvent): void {
    clearTimeout(this.timer);
    const term = (event.currentTarget as HTMLInputElement).value;
    this.term = term;

    if (event.key === 'Enter') {
      this.onSearch.emit({ term, type: this.searchType });
      return;
    }

    this.timer = setTimeout(() => {
      this.onSearch.emit({ term, type: this.searchType });
    }, 1000);

    this.suggests(term);
  }

  public clear() {
    this.searchInput.nativeElement.value = '';
  }

  public renderSuggestion(company: Company): string {
    return company.name.replace(new RegExp(this.term, 'gi'), (match) => `<mark>${match}</mark>`);
  }

  public selectSuggestion(company: Company) {
    this.searchInput.nativeElement.value = company.name;
    this.onSearch.emit({ term: company.name, type: this.searchType });
    this.suggestions = [];
  }

  private suggests(term: string) {
    const t = this.removeAccents(term.toLowerCase());
    this.suggestions = this.companies.filter(company => this.removeAccents(company.name.toLowerCase()).includes(t));
  }

  private removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }
}
