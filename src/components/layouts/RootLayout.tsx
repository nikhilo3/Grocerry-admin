import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "../reusable/Sidebar";
import Header from "../reusable/Header";
import Cookies from "js-cookie";

type Props = {
  children: React.ReactNode;
};
const RootLayout = (props: Props) => {
  const { pathname } = useLocation();
  if (pathname === "/login") return props.children;

  const isAuth = Cookies.get("auth_token");
  console.log(isAuth);
  if (!Cookies.get("auth_token")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen w-screen flex ">
      <Sidebar />
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Header />
        <main className="w-full h-full p-8 bg-background overflow-y-scroll scrollbar-md">
          {props.children}
        </main>
      </div>
    </div>
  );
};
export default RootLayout;
