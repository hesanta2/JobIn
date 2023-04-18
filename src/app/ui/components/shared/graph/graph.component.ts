import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { multiGraphData } from 'src/app/application/graph/multi-graph-data';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent {
  @Input() public data: multiGraphData[];
  public view: [number, number] = [700, 400];
}
