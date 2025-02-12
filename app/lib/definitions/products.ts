export type IProduct = {
  id: string;
  name: string;
  category_id: string;
  unit_id: string;
  quantity: number;
};

//** ******* Products Requests ******* */
export type IAddProductRequest = Partial<IProduct>;

export type IEditProductRequest = {
  productId: string;
} & Partial<IProduct>;

export type IDeleteProductRequest = {
  productId: string;
};
