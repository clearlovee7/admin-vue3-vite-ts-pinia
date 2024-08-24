export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface User {
  id?: number | string,
  createTime?: string,
  updateTime?: string,
  username?: string,
  password?: string,
  name?: string,
  phone?: null,
  roleName?: string,
}

export type Records = User[]

export interface UserResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    pages: number;
    current: number;
    size: number;
  }
}

export interface Role {
  id?: number | string,
  createTime?: string,
  updateTime?: string,
  roleName?: string,
  remark?: null,
}

export type AllRole = Role[]

export interface RoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole;
    allRolesList: AllRole;
  }
}

export interface AssignRoleData {
  roleIdList: number[];
  userId: number | string;
}