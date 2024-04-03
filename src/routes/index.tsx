import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from "./routes";
import AppLoading from "../components/loaders/AppLoading";
import RootLayout from "../components/layouts/RootLayout";

const RoutesContainer = () => {
  return (
    <Router>
      <Routes>
        {ROUTES.map(({ component: Component, ...props }, index) => {
          return (
            <Route
              key={index}
              element={
                <RootLayout>
                  <Suspense fallback={<AppLoading />}>
                    <Component />
                  </Suspense>
                </RootLayout>
              }
              {...props}
            />
          );
        })}
      </Routes>
    </Router>
  );
};
export default RoutesContainer;
