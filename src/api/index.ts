const AUTH_URL = import.meta.env.VITE_LOGIN_SERVICE_BASE_URL + "/v1";
const PRODUCT_URL = import.meta.env.VITE_PRODUCT_SERVICE_BASE_URL + "/v1";
// const AUTH_URL = "http://localhost:8080" + "/v1";

const API = {
  // products
  addProduct: PRODUCT_URL + "/product/add",
  allProducts: PRODUCT_URL + "/product/list",
  deleteProduct: PRODUCT_URL + "/product/delete",
  updateProduct: PRODUCT_URL + "/product/update",

  // drivers
  addDriver: PRODUCT_URL + "/driver/add",
  allDrivers: PRODUCT_URL + "/driver/list",
  deleteDriver: PRODUCT_URL + "/driver/delete",
  updateDriver: PRODUCT_URL + "/driver/update",

  // orders
  allOrders: PRODUCT_URL + "/order/list",
  updateOrder: PRODUCT_URL + "/order/update",

  // suggestions
  getAllSuggestions: PRODUCT_URL + "/suggestion/list",
  removeSuggestion: PRODUCT_URL + "/suggestion/remove",

  // reports
  getAllProductReport: PRODUCT_URL + "/report/product",
  getAllOrderReport: PRODUCT_URL + "/report/order",
};

export default API;
