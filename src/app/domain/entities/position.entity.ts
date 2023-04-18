import { RoleRange } from "./role-range.enum";
import { Role } from "./role.enum";

export interface Position{
  id: number;
  title: string;
  salary: string;
  salaryMax: number;
  salaryMin: number;
  role: Role;
  range: RoleRange;
}
