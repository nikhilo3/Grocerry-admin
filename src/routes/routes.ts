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
    component: lazy(async () => await import("../pages/orders")),
  },
  {
    path: "/products",
    component: lazy(async () => await import("../pages/Products")),
  },
  {
    path: "/login",
    component: lazy(async () => await import("../pages/Login/Login")),
  },
  {
    path: "/products",
    component: lazy(async () => await import("../pages/Products")),
  },
  {
    path: "/drivers",
    component: lazy(async () => await import("../pages/Drivers")),
  },
  {
    path: "/users",
    component: lazy(async () => await import("../pages/Users")),
  },
];

export default ROUTES;
