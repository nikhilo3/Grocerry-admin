import InfoCard from "../../components/reusable/InfoCard";
import { overviewStats } from "../../assets/mockData/overviewData";

import arrowDown from "../../assets/icons/arrow-down-overview.svg";
import Chart from "./Chart";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-11 overflow-hidden">
      {/* all product cards */}
      <div className="flex gap-5">
        {overviewStats.map((stat, index) => (
          <InfoCard key={index} {...stat} opacity={0} />
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
      </div>
    </div>
  );
};
export default HomePage;
