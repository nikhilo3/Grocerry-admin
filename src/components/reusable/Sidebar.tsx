import { Link, useLocation } from "react-router-dom";
import overview1 from "../../assets/icons/overview1.svg";
import overview2 from "../../assets/icons/overview2.svg";
import products1 from "../../assets/icons/products1.svg";
import products2 from "../../assets/icons/products2.svg";
import orders1 from "../../assets/icons/orders1.svg";
import orders2 from "../../assets/icons/orders2.svg";
import users1 from "../../assets/icons/user1.svg";
import users2 from "../../assets/icons/users2.svg";

const Sidebar = () => {
  const { pathname } = useLocation();

  const navLinks = [
    {
      label: "Overview",
      path: "/",
      icon1: overview1,
      icon2: overview2,
    },
    {
      label: "Products",
      path: "/products",
      icon1: products1,
      icon2: products2,
    },
    {
      label: "Categories",
      path: "/categories",
      icon1: products1,
      icon2: products2,
    },
    {
      label: "Orders",
      path: "/orders",
      icon1: orders1,
      icon2: orders2,
    },
    {
      label: "Users",
      path: "/users",
      icon1: users1,
      icon2: users2,
    },
  ];

  return (
    <div className="h-full w-[240px] bg-white px-6 py-[54px] border-r border-[#F3F4F6]">
      <div className="flex flex-col gap-14">
        <h1 className="font-inter text-[32px] font-bold leading-9 text-neutral-60">
          Grocerry
        </h1>

        {/* Navlinks */}
        <div className="flex flex-col gap-3">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`rounded-xl p-[14px] flex items-center gap-3 text-[16px] font-inter font-medium border border-[#F3F4F6] ${
                pathname.split("/")[1] === link.path.split("/")[1]
                  ? "bg-[#FFF7ED] text-[#374151]"
                  : "text-[#9CA3AF]"
              }`}
            >
              {pathname.split("/")[1] === link.path.split("/")[1] ? (
                <img src={link.icon2} alt="" />
              ) : (
                <img src={link.icon1} alt="" />
              )}
              {link?.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
