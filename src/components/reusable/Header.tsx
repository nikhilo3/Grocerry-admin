import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const title = pathname.substring(1)
  return <div className="w-full h-20 min-h-20 bg-white px-8 py-5 flex items-center justify-between">
    <h1 className="font-inter text-[28px] font-semibold text-[#374151] capitalize">{title}</h1>

    <div className="border border-[#EF4444] px-6 py-[14px] rounded-xl">
   <p className="font-inter font-medium text-base text-[#EF4444]">Logout</p>
    </div>
    </div>;
};
export default Header;
