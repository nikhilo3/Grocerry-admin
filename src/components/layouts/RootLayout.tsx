import { useLocation } from "react-router-dom";
import Sidebar from "../reusable/Sidebar";
import Header from "../reusable/Header";

type Props = {
  children: React.ReactNode;
};
const RootLayout = (props: Props) => {
  const { pathname } = useLocation();
  if (pathname === "/login") return props.children;
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
