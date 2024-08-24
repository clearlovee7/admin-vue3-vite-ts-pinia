import request from "@/utils/request";
import type { TradeMarkResponseData, Trademark } from "./type";

enum API {
  //获取已有品牌的接口
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  //添加品牌
  ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
  //修改品牌
  UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
  //删除品牌
  DELETETRADEMARK_URL = "/admin/product/baseTrademark/remove/",
  //获取品牌详情
  GETTRADEMARK_URL = "/admin/product/baseTrademark/get/",
}

export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

export const reqAddOrUpdateTrademark = (data: Trademark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

export const reqDeleteTrademark = (id: number) => request.delete<any, any>(API.DELETETRADEMARK_URL + id)