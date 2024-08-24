import request from "@/utils/request";
import type { PermissionResponseData ,menuParams} from "./type"

enum API {
  ALLPERMISSION_URL = '/admin/acl/permission',
  ADDPERMISSION_URL = '/admin/acl/permission/save',
  UPDATEPERMISSION_URL = '/admin/acl/permission/update',
  DELETEPERMISSION_URL = '/admin/acl/permission/remove/',
}

export const reqAllPermission = () => request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)
export const reqAddOrUpdatePermission = (data: menuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEPERMISSION_URL, data)
  } else {
    return request.post<any, any>(API.ADDPERMISSION_URL, data)
  }
}

export const reqDeletePermission = (id: number | string) => request.delete<any, any>(API.DELETEPERMISSION_URL + id)