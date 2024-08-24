import request from "@/utils/request";
import type { UserResponseData, User, RoleResponseData, AssignRoleData } from "./type";

enum API {
  USER_URL = '//admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  ASSIGNROLE_URL = '/admin/acl/user/doAssignRole',
  DELUSER_URL = '/admin/acl/user/remove/',
  DELALLUSER_URL = '/admin/acl/user/batchRemove'
}

export const reqUser = (page: number, limit: number, username: string) => request.get<any, UserResponseData>(API.USER_URL + `${page}/${limit}/?username=${username}`)

export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}

export const reqAllRole = (userId: number | string) => request.get<any, RoleResponseData>(API.ALLROLE_URL + userId)

export const reqAssignRole = (data: AssignRoleData) => request.post<any, any>(API.ASSIGNROLE_URL, data)

export const reqDelUser = (id: number | string) => request.delete<any, any>(API.DELUSER_URL + id)

export const reqDelAllUser = (idList: number[]) => request.delete<any, any>(API.DELALLUSER_URL, { data: idList })