export type ICategory = {
  id: string;
  name: string;
};

//** ******* Categories Requests ******* */
export type IAddCategoryRequest = {
  name: string;
};

export type IDeleteCategoryRequest = {
  categoryId: string;
};
