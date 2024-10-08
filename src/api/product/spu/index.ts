import request from "@/utils/request";
import type { skuInfoData, SkuData, SpuData, HasSpuResponseData, AllTradeMark, SpuImageList, SaleAttrResponseData, AllSaleAttrResponseData } from "./type"

enum API {
  HASSPU_URL = "/admin/product/",
  ALLTRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
  IMAGE_URL = "/admin/product/spuImageList/",
  SPUHASSALEATTR_URL = "/admin/product/spuSaleAttrList/",
  AllSALEATTR_URL = "/admin/product/baseSaleAttrList",
  ADDSPU_URL = "/admin/product/saveSpuInfo",
  UPDATESPU_URL = "/admin/product/updateSpuInfo",
  ADDSKU_URL = "/admin/product/saveSkuInfo",
  SKUINFO_URL = "/admin/product/findBySpuId/",
  DELETESPU_URL = "/admin/product/deleteSpu/"
}

export const reqHasSpu = (page: number, limit: number, category3Id: number | string) => request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}/?category3Id=${category3Id}`)

export const reqAllTrademark = () => request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)

export const reqSpuImageList = (spuId: number) => request.get<any, SpuImageList>(API.IMAGE_URL + spuId)

export const reqSpuHasSaleAttr = (spuId: number) => request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)

export const reqAllSaleAttr = () => request.get<any, AllSaleAttrResponseData>(API.AllSALEATTR_URL)

export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    request.post<any, any>(API.ADDSPU_URL, data)
  }
}

export const reqAddSku = (data: SkuData) => request.post<any, any>(API.ADDSKU_URL, data)

export const reqSkuInfo = (spuId: number | string) => request.get<any, skuInfoData>(API.SKUINFO_URL + spuId)

export const reqDelSpu = (spuId: number | string) => request.delete<any, any>(API.DELETESPU_URL + spuId)