import { Position } from "./position.entity";

export interface Company{
  id: number;
  name: string;
  province: string;
  url: string;
  positions: Position[];
}
