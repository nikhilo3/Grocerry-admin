import type { LazyExoticComponent, ComponentType } from "react";
import { lazy } from "react";
import type { RouteProps } from "react-router-dom";

type IRoute = RouteProps & {
  component: LazyExoticComponent<ComponentType<any>>;
};

const ROUTES: IRoute[] = [
  {
    path: "/",
    component: lazy(async () => await import("../pages/Home")),
  },
  {
    path: "/orders",
    component: lazy(async () => await import("../pages/Orders")),
  },
  {
    path: "/products",
    component: lazy(async () => await import("../pages/Products")),
  },
  {
    path: "/login",
    component: lazy(async () => await import("../pages/Login")),
  },
  {
    path: "/products",
    component: lazy(async () => await import("../pages/Products")),
  },

  {
    path: "/products/add-a-product",
    component: lazy(async () => await import("../pages/AddUpdateProduct")),
  },
  {
    path: "/products/update/:productCode",
    component: lazy(async () => await import("../pages/AddUpdateProduct")),
  },
  {
    path: "/users",
    component: lazy(async () => await import("../pages/Users")),
  },
  {
    path: "/categories",
    component: lazy(async () => await import("../pages/Categories")),
  },
  {
    path: "/categories/add",
    component: lazy(async () => await import("../pages/AddCategories")),
  },
];

export default ROUTES;
