import request from "@/utils/request";
import type { Role, RoleResponseData, AllRole, MenuResponseData } from "./type"

enum API {
  ROLE_URL = "/admin/acl/role/",
  ADDROLE_URL = "/admin/acl/role/save",
  UPDATEROLE_URL = '/admin/acl/role/update',
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
  SETPERMISSION_URL = '/admin/acl/permission/doAssign/?',
  DELETEROLE_URL = '/admin/acl/role/remove/',
}

export const reqRole = (page: number, limit: number, roleName: string) => request.get<any, RoleResponseData>(API.ROLE_URL + `${page}/${limit}/?roleName=${roleName}`)
export const reqAddOrUpdateRole = (data: Role) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
export const reqAllMenuList = (roleId: number | string) => request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + roleId)

export const reqSetPermission = (roleId: number | string, permissionId: number[]) => request.post<any, any>(API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`)

export const reqDelRole = (id: number | string) => request.delete<any, any>(API.DELETEROLE_URL + id)