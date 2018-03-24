import { RolePermission } from "./role-permission.entity";


export interface Role {
    id?: number;
    code?: string;
    name?: string;
    rolePermissions?: RolePermission[];
}
