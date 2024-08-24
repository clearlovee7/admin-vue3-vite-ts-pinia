import request from "@/utils/request";
import type { SkuResponseData, SkuInfoData } from "./type"

enum Api {
  SKU_URL = "/admin/product/list/",
  SLAE_URL = "/admin/product/onSale/",
  CANCELSALE_URL = "/admin/product/cancelSale/",
  GETSKUINFO_URL = "/admin/product/getSkuInfo/",
  DELETESKU_URL = '/admin/product/deleteSku/'
}


export const reqSkuList = (page: number, limit: number) => request.get<any, SkuResponseData>(Api.SKU_URL + `${page}/${limit}`)
export const reqSaleSku = (skuId: number) => request.get<any, any>(Api.SLAE_URL + skuId)
export const reqCancelSale = (skuId: number) => request.get<any, any>(Api.CANCELSALE_URL + skuId)
export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoData>(Api.GETSKUINFO_URL + skuId)
export const reqDelSku = (skuId: number) => request.delete<any, any>(Api.DELETESKU_URL + skuId)