export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface Permission {
  id?: number | string;
  createTime?: string;
  updateTime?: string,
  pid?: number | string;
  name?: string;
  code?: null;
  toCode?: string;
  type?: number;
  status: null;
  level?: number;
  children?: PermissionList;
  select?: boolean
}

export type PermissionList = Permission[]

export interface PermissionResponseData extends ResponseData {
  data: PermissionList
}

export interface menuParams {
  id?: number | string;
  level: number;
  pid: number;
  code: string;
  name: string;
}

