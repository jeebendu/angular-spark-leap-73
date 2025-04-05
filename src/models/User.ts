import { Branch } from "./Branch";

export interface User {
  id: number;
  branch: Branch;
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  effectiveTo?: Date;
  effectiveFrom?: Date;
  role: Role;
}

export interface Role {
    id: number;
    name: string;
  }