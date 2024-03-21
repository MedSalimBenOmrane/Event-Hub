import { Role } from "../enum/role.enum";

export interface Info {
  email: string;
  firstname: string;
  name: string;
  phoneNumber: number;
  cin: number;
  password: string;
  salt?: string;
  role: Role;
}
