
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface SpuData {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number | string; //品牌id
  spuSaleAttrList: null | SaleAttr[];
  spuImageList: null | SpuImage[];
}

export type Records = SpuData[];

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  }
}

export interface Trademark {
  id?: number;
  tmName: string;
  logoUrl: string;
}

export interface AllTradeMark extends ResponseData {
  data: Trademark[];
}

export interface SpuImage {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  imgName?: string;
  imgUrl?: string;
  name?: string,
  url?: string
}

export interface SpuImageList extends ResponseData {
  data: SpuImage[];
}

export interface SpuSale {
  id?: number | string;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrName?: string;
  saleAttrValueName: string;
  isChecked?: null
}

export type SpuSaleAttrList = SpuSale[];

export interface SaleAttr {
  id?: number | string;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrList;
  flag?: boolean;
  saleAttrValue?: string
}

export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}


export interface AllSaleAttr {
  id: number;
  name: string;
}

export interface AllSaleAttrResponseData extends ResponseData {
  data: AllSaleAttr[];
}

export interface skuAttr {
  attrId: string | number,
  valueId: string | number,
}

export interface skuSale {
  saleAttrId: string | number,
  saleAttrValueId: string | number,
}

export interface SkuData {
  category3Id: string | number,
  spuId: string | number,
  tmId: string | number,
  skuName: string,
  price: string | number,
  weight: string | number,
  skuDesc: string,
  skuAttrValueList?: skuAttr[],
  skuSaleAttrValueList?: skuSale[],
  skuDefaultImg: string
}


export interface skuInfoData extends ResponseData {
  data: SkuData[]
}
