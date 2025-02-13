import { ICategory } from "@/app/lib/definitions/categories";
import { IUnit } from "@/app/lib/definitions/units";

export type IProduct = {
  id: string;
  name: string;
  category_id: string;
  unit_id: string;
  quantity: number;
};

export type IProductWithUnit = IProduct & { unit: IUnit };

export type IGroupedProducts = ICategory & {
  products: IProductWithUnit[];
};

//** ******* Products Requests ******* */
export type IAddProductRequest = Partial<IProduct>;

export type IEditProductRequest = {
  productId: string;
} & Partial<IProduct>;

export type IDeleteProductRequest = {
  productId: string;
};
