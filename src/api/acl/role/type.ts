export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface Role {
  createTime?: string;
  id?: number | string;
  remark?: null;
  roleName?: string;
  updateTime?: string;
}

export type AllRole = Role[]

export interface RoleResponseData extends ResponseData {
  data: {
    records: AllRole;
    total: number;
    size: number;
    current: number;
    orders: [],
    optimizeCountSql: boolean;
    hitCount: boolean;
    searchCount: boolean;
    countId: null;
    maxLimit: null;
    pages: number;
  }
}

export interface MenuData {
  id?: number | string;
  pid?: number | string;
  name?: string;
  code?: string;
  toCode?: string;
  type?: number;
  status: null;
  level?: number;
  createTime?: string;
  updateTime?: string,
  children?: [];
  select?: boolean
}

export type MenuList = MenuData[]

export interface MenuResponseData extends ResponseData {
  data: MenuList
}