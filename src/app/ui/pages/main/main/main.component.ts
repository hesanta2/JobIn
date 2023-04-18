import { AfterViewInit, Component } from '@angular/core';
import { multiGraphData } from 'src/app/application/graph/multi-graph-data';
import { CompanyService } from 'src/app/application/services/company.service';
import { Company } from 'src/app/domain/entities/company.entity';
import { Position } from 'src/app/domain/entities/position.entity';
import { SearchType } from 'src/app/ui/components/search/enums/search-type.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  public companies: Company[];
  multi: multiGraphData[];

  constructor(private readonly companyService: CompanyService) { }

  async ngAfterViewInit(): Promise<void> {
    this.companies = await this.companyService.getCompanies();
    this.multi = await this.getCompaniesGraphData(this.companies);
    //this.multi = this.GetCompanyGraphData(this.companies[25]);
  }

  private getCompaniesGraphData(companies: Company[]) {
    var positions = this.companies.map(company => company.positions.filter(position => position.role !== undefined)).flat();
    return this.GetPositionsGraphData(positions);
  }

  private GetPositionsGraphData(positions: Position[]) {
    var groupedPositions = positions.reduce((r, a) => {
      r[a.role] = [...r[a.role] || [], a];
      return r;
    }, {});
    //Get max and min salary for each role
    var maxMinSalary = Object.keys(groupedPositions).map(key => {
      return {
        role: key,
        maxSalary: Math.max(...groupedPositions[key].map(position => position.salaryMax)),
        minSalary: Math.min(...groupedPositions[key].map(position => position.salaryMin))
      };
    });
    maxMinSalary = maxMinSalary.filter(maxMinSalary => maxMinSalary.role !== 'null');
    //Convert maxMinSalary to array
    var maxMinSalaryArray = maxMinSalary.map(maxMinSalary => {
      return {
        name: maxMinSalary.role,
        salaryMax: maxMinSalary.maxSalary,
        salaryMin: maxMinSalary.minSalary
      };
    });


    return maxMinSalaryArray.map(entry => {
      return new multiGraphData(entry.name, [
        {
          name: 'Max',
          value: entry.salaryMax
        },
        {
          name: 'Min',
          value: entry.salaryMin
        }
      ]);
    });
  }

  private GetCompanyGraphData(company: Company) {
    var positions = company.positions.filter(position => position.role !== undefined);
    return this.GetPositionsGraphData(positions);
  }

  async ngOnInit(): Promise<void> {
  }

  public onSearch(term: string, type: SearchType): void {
    var company = this.companies.find(company => company.name.toLowerCase() === term.toLowerCase());
    if (company !== undefined) {
      this.multi = this.GetCompanyGraphData(company);
      return;
    }

    this.multi = this.getCompaniesGraphData(this.companies);
  }
}
