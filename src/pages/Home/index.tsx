import InfoCard from "../../components/reusable/InfoCard";
import {
  BEST_SELLERS,
  SUGGESTED_PRODUCTS,
  overviewStats,
} from "../../assets/mockData/overviewData";
import Button from "../../components/reusable/Button";
import arrow from "../../assets/icons/fi-br-arrow-small-right.svg";
import arrowDown from "../../assets/icons/addrow-doen.svg";
import Chart from "./Chart";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-11 overflow-hidden">
      {/* all product cards */}
      <div className="flex gap-5">
        {overviewStats.map((stat, index) => (
          <InfoCard key={index} {...stat} />
        ))}
      </div>
      <div className="flex gap-5 flex-wrap">
        <div className="w-[700px] overflow-x-auto scrollbar-md bg-white border border-accent-200 rounded-[16px] py-[24px] flex flex-col gap-4">
          <span className="text-[18px] text-accent-700 font-medium font-poppins px-[24px]">
            Revenue Chart
          </span>
          <div className="flex gap-2 px-[24px]">
            <button className="flex gap-3 items-center px-4 py-2 text-accent-800 font-500 border border-accent-300 rounded-[4px]">
              <span>Metric</span>
              <img src={arrowDown} alt="" />
            </button>
            <button className="flex gap-3 items-center px-4 py-2 text-accent-800 font-500 border border-accent-300 rounded-[4px]">
              <span>Today</span>
              <img src={arrowDown} alt="" />
            </button>
            <button className="flex gap-3 items-center px-4 py-2 text-accent-800 font-500 border border-accent-300 rounded-[4px]">
              <span>Category</span>
              <img src={arrowDown} alt="" />
            </button>
          </div>

          <hr />

          <div className="px-[24px] flex flex-col gap-3">
            <Chart />
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <div className="h-3 w-3 rounded-full bg-secondary-500" />
                <span className="text-sm text-accent-500">Category 1</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-3 w-3 rounded-full bg-primary-500" />
                <span className="text-sm text-accent-500">Category 2</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[400px] h-fit bg-white border border-accent-200 rounded-[16px] p-[24px] flex flex-col gap-6">
          <span className="text-[20px] text-accent-700 font-medium font-poppins">
            Suggested Products
          </span>
          {/* table */}
          <div className="flex flex-col gap-2">
            <div
              className="grid bg-accent-500 rounded-xl p-4 text-accent-50 font-medium text-base"
              style={{
                gridTemplateColumns: "2fr 3fr",
              }}
            >
              <span>User Name</span>
              <span>Product Name</span>
            </div>
            <div className="flex flex-col h-[240px] overflow-y-scroll scrollbar-sm">
              {SUGGESTED_PRODUCTS.map((product, index) => (
                <div
                  key={index}
                  className="grid odd:bg-accent-50 rounded-xl p-4 text-accent-500 font-normal"
                  style={{
                    gridTemplateColumns: "2fr 3fr",
                  }}
                >
                  {Object.values(product).map((value, index) => (
                    <span className="truncate" key={index}>
                      {value}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border border-accent-200 rounded-[16px] p-[24px] flex flex-col gap-6 w-[700px]">
        <div className="flex justify-between w-full">
          <span className="text-[20px] text-accent-700 font-medium font-poppins">
            Best Sellers
          </span>
          <Button
            variant="primary-ghost"
            className="py-0 flex gap-2 items-center"
          >
            <span>More</span>
            <img src={arrow} alt="" />
          </Button>
        </div>
        {/* table */}
        <div className="flex flex-col gap-2 w-full">
          <div
            className="grid bg-accent-500 rounded-xl p-4 text-accent-50 font-medium text-base"
            style={{
              gridTemplateColumns: "4fr 1fr 1fr 1fr",
            }}
          >
            <span>Product</span>
            <span>Price</span>
            <span>Sold</span>
            <span>Profit</span>
          </div>
          <div className="flex flex-col w-full h-[400px] overflow-y-scroll scrollbar-sm gap-2">
            {BEST_SELLERS.map((product, index) => (
              <div
                key={index}
                className="grid odd:bg-accent-50 rounded-xl p-4 text-accent-500 font-normal"
                style={{
                  gridTemplateColumns: "4fr 1fr 1fr 1fr",
                }}
              >
                {Object.values(product).map((value, index) => (
                  <span className="truncate" key={index}>
                    {value}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
