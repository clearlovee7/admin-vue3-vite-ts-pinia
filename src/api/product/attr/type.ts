export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface Category {
  id: number | string;
  name: string;
  category1Id?: number | string;
  category2Id?: number | string;
}

export interface CategoryResponseData extends ResponseData {
  data: Category[];
}

export interface AttrValue {
  Id?: number;
  valueName: string;
  attrId?: number;
  flag?: boolean;
}

export type AttrValueList = AttrValue[];

export interface Attr {
  Id?: number;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number;
  attrValueList: AttrValueList;
}

export type AttrList = Attr[];

export interface AttrResponseData extends ResponseData {
  data: Attr[]
}