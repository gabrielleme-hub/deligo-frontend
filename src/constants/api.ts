const baseUrl = "http://localhost:3000";
export const urls = {
  USER: {
    CREATE_USER: `${baseUrl}/users`,
    LOGIN: `${baseUrl}/users/login`,
  },
  PRODUCTS: {
    CREATE_PRODUCT: `${baseUrl}/products`,
    EDIT_PRODUCT: `${baseUrl}/products`,
    DELETE_PRODUCT: `${baseUrl}/products`,
    GET_PRODUCT_BY_ID: `${baseUrl}/products`,
    GET_PRODUCTS_FIND_ALL: `${baseUrl}/products`,
  },
  ORDERS: {
    GET_ORDERS: `${baseUrl}/orders`,
  },
  CHECKOUT: {
    CREATE_CHECKOUT: `${baseUrl}/orders`,
  },
};
