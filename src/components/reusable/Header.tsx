import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = pathname.substring(1);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout from the system?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("auth_token");
        navigate("/login");
      }
    });
  };
  return (
    <div className="w-full h-20 min-h-20 bg-white px-8 py-5 flex items-center justify-between">
      <h1 className="font-inter text-[28px] font-semibold text-[#374151] capitalize">
        {title}
      </h1>

      <button
        onClick={handleLogout}
        className="border border-[#EF4444] px-6 py-[14px] rounded-xl"
      >
        <p className="font-inter font-medium text-base text-[#EF4444]">
          Logout
        </p>
      </button>
    </div>
  );
};
export default Header;
