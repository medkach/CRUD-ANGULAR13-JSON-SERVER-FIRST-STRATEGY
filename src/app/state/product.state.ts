export enum ProductActionsTypes{
GET_ALL_PRODUCTS="[Product] GET ALL Products",
GET_SELECTED_PRODUCTS="[Product] GET SELECTED Products",
GET_AVAILABLE_PRODUCTS="[Product] GET Available Products",
GET_SEARCH_PRODUCTS="[Product]  Search Products",
NEW_PRODUCT="[Product]  New Product",
SELECT_PRODUCT="[Product]  SELECT Product",
DELETE_PRODUCT="[Product]  DELETE Product",
EDIT_PRODUCT="[Product]  EDIT Product",
PRODUCT_ADDED="[Product]  Product Added",
PRODUCT_UPDATED="[Product] Product Updated"
}
export interface ActionEvent{
type?:ProductActionsTypes;
payload?:any;
}
export enum DataStateEnum{
LOADING,
LOADED,
ERROR
}

export interface AppDataState<T>{
dataState?: DataStateEnum;
data?:T;
errorMessage?: string;
}
