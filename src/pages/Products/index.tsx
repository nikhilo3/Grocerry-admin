import { productDetails, products } from "../../assets/mockData/products";
import InfoCard from "../../components/reusable/InfoCard";
import searchIcon from "../../assets/icons/search.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";
import uploadIcon from "../../assets/icons/upload.svg";
import downloadIcon from "../../assets/icons/download.svg";
import addCircleIcon from "../../assets/icons/add-circle.svg";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import ThreeDots from "../../assets/icons/three-dots";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  return (
    <div className="flex flex-col gap-11 overflow-hidden">
      {/* product cards */}
      <div className="flex gap-5">
        {productDetails.map((product, index) => (
          <InfoCard key={index} {...product} />
        ))}
      </div>
      {/* product table */}
      <div className="overflow-x-scroll hide-scrollbar">
        <div className="border border-accent-200 rounded-[20px] bg-white p-6 flex flex-col gap-6 min-w-[1100px]">
          {/* product top action buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <label className="input input-bordered flex items-center !outline-none gap-[10px] text-accent-400 w-[258px] p-4 bg-accent-100 rounded-xl">
                <img
                  src={searchIcon}
                  alt="search"
                  className="w-[18px] h-[18px]"
                />
                <input
                  type="text"
                  placeholder="Search Orders"
                  className="text-base font-medium "
                />
              </label>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn bg-accent-300 text-accent-600 flex items-center justify-center font-medium text-base rounded-xl"
                >
                  <span>Filter by Category</span>
                  <img
                    src={arrowDown}
                    alt="arrow down"
                    className="w-[18px] h-[18px]"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-xl border border-secondary-100 bg-secondary-50 px-4 py-3 flex items-center justify-center gap-2">
                <span className="text-secondary-600 font-medium">
                  Upload CSV
                </span>
                <img
                  src={uploadIcon}
                  alt="upload"
                  className="w-[16px] h-[16px]"
                />
              </button>
              <button className="rounded-xl border border-secondary-100 bg-secondary-50 px-4 py-3 flex items-center justify-center gap-2">
                <span className="text-secondary-600 font-medium">
                  Download CSV
                </span>
                <img
                  src={downloadIcon}
                  alt="download"
                  className="w-[16px] h-[16px]"
                />
              </button>
              <Link
                to="/products/add-a-product"
                className="rounded-xl bg-primary-500 px-4 py-3 flex items-center justify-center gap-2"
              >
                <span className="text-white font-medium">Add Product</span>
                <img
                  src={addCircleIcon}
                  alt="add product"
                  className="w-[16px] h-[16px]"
                />
              </Link>
            </div>
          </div>
          {/* products list */}
          <div className="flex flex-col gap-4">
            <div
              className="grid bg-accent-500 rounded-xl p-4 text-accent-50 font-normal"
              style={{
                gridTemplateColumns: "1fr 7fr 4fr 5fr 4fr 4fr 4fr 2fr",
              }}
            >
              <button>
                <UnCheckedBox className="w-[18px] h-[18px]" />
              </button>
              <span>Product Name</span>
              <span>Category</span>
              <span>Sub Category</span>
              <span>Stock</span>
              <span>Sold</span>
              <span>Revenue</span>
              <span>Actions</span>
            </div>
            {products.map((product, index) => (
              <div
                key={index}
                className="grid even:bg-accent-50 rounded-xl p-4 text-accent-500 font-normal"
                style={{
                  gridTemplateColumns: "1fr 7fr 4fr 5fr 4fr 4fr 4fr 2fr",
                }}
              >
                <button>
                  <UnCheckedBox className="w-[18px] h-[18px]" />
                </button>
                {Object.values(product).map((value, index) => (
                  <span className="truncate" key={index}>
                    {value}
                  </span>
                ))}
                <button className="ml-auto">
                  <ThreeDots className="w-[18px] h-[18px]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
