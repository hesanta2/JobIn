export class multiGraphData {
  name: string;
  series: {
    name: string;
    value: number;
    extra?: any;
  }[];

  constructor(name: string, series: { name: string; value: number; extra?: any; }[]) {
    this.name = name;
    this.series = series;
  }
}
