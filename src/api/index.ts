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
  allOrders: PRODUCT_URL + "/order/admin/list",
  updateOrder: PRODUCT_URL + "/order/update",

  // suggestions
  getAllSuggestions: PRODUCT_URL + "/suggestion/list",
  removeSuggestion: PRODUCT_URL + "/suggestion/remove",

  // reports
  getAllProductReport: PRODUCT_URL + "/report/product",
  getAllOrderReport: PRODUCT_URL + "/report/order",
  getAllUserReport: AUTH_URL + "/report/user",

  //users
  getAllUsers: AUTH_URL + "/profile/admin/fetch",
  login: AUTH_URL + "/login",

  // categories
  category: PRODUCT_URL + "/category/all",
  addCategory: PRODUCT_URL + "/category/add",
  fetchCategory: PRODUCT_URL + "/category/fetch",

  dashboardReport: PRODUCT_URL + "/report/overview",
};

export default API;
