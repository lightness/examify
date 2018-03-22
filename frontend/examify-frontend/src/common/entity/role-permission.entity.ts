import { Role } from "./role.entity";
import { Permission } from "./permission.enum";


export interface RolePermission {
    id?: number;
    role?: Role;
    permission?: Permission;
}
