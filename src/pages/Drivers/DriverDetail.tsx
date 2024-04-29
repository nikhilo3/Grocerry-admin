import React from "react";
import crossSvg from "../../assets/icons/cross-black.svg";
import cross from "../../assets/icons/cross.svg";
import blockIcon from "../../assets/icons/block-icon.svg";
import checkIcon from "../../assets/icons/checked.svg";
import { drivers } from "../../assets/mockData/driverData";
import Button from "../../components/reusable/Button";

interface driverDetail {
  driverId: String;
}

const DriverDetail: React.FC<driverDetail> = ({ driverId }) => {
  const filteredDriver = drivers.find((item) => item.id === driverId);
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="max-w-[752px] h-auto p-8 scrollbar-md  modal-box">
          <form method="dialog">
            <div className="flex flex-col gap-6 justify-center">
              <div className="flex justify-between items-center">
                <div className="">
                  <h1 className="font-medium text-[28px] text-accent-700">
                    Driver Details
                  </h1>
                  <p className="text-sm font-normal text-accent-500 ">
                    Lorem ipsum dolor sit amet consectetur. Tortor elit{" "}
                  </p>
                </div>
                <button>
                  <img className="h-8 w-8" src={crossSvg} alt="" />
                </button>
              </div>

              <div className="flex  items-center justify-between gap-[26px]">
                <div className="flex flex-col justify-center w-[688px] gap-[6px]">
                  <span className="text-base font-medium text-accent-500 ">
                    Full Name
                  </span>
                  <h1 className="text-xl font-semibold  text-accent-700">
                    {filteredDriver?.name}
                  </h1>
                </div>
                <div className="flex flex-col justify-center w-[688px] gap-[6px]">
                  <span className="text-base font-medium text-accent-500 ">
                    Mobile No.
                  </span>
                  <h1 className="text-xl font-semibold  text-accent-700">
                    {filteredDriver?.phone}
                  </h1>
                </div>
              </div>
              <hr className="h-[1px] bg-accent-200" />
              <div className="">
                <span className="text-accent-500 text-base font-medium ">
                  Address
                </span>
                <p className="text-[17px] leading-normal font-medium text-accent-700 ">
                  Lorem ipsum dolor sit amet consectetur. Neque lacus phasellus
                  egestas rhoncus sit sed dictumst consequat accumsan.
                </p>
              </div>
              <hr className="h-[1px] bg-accent-200" />
              <div className="flex  items-center justify-between gap-[26px]">
                <div className="flex flex-col justify-center w-[688px] gap-[6px]">
                  <span className="text-base font-medium text-accent-500 ">
                    Vehicle Model
                  </span>
                  <h1 className="text-[20px] font-semibold  text-accent-700">
                    Jawa 42 Bobber{" "}
                  </h1>
                </div>
                <div className="flex flex-col justify-center w-[688px] gap-[6px]">
                  <span className="text-base font-medium text-accent-500 ">
                    Vehicle Number
                  </span>
                  <h1 className="text-[20px] font-semibold  text-accent-700">
                    {filteredDriver?.vehicle}
                  </h1>
                </div>
              </div>
              <hr className="h-[1px] bg-accent-200" />
              <div className="flex flex-col justify-center gap-[6px]">
                <span className="text-accent-500 text-base font-medium ">
                  Proof ID
                </span>
                <div className="border flex justify-between items-center  border-accent-200 bg-accent-50 rounded-xl py-5 px-6">
                  <h6>File_Name_123.jpg</h6>
                  <button type="button">
                    <img src={cross} alt="" />
                  </button>
                </div>
              </div>
              {/* submit btn */}
              <div className="flex items-center justify-between ">
                <Button
                  variant="error-outline"
                  className="gap-2 flex justify-center  items-center bg-white"
                >
                  <span className="text-base text-error-300">
                    Remove Driver
                  </span>
                  <img className="h-4 w-4" src={blockIcon} alt="" />
                </Button>
                <Button
                  onClick={() =>
                    // @ts-ignore
                    document.getElementById("addDriverModal")?.showModal()
                  }
                  variant="primary"
                  className="px-12 py-4 gap-2 flex justify-center  items-center"
                >
                  <span className="text-base">Edit Driver</span>
                  <img className="h-4 w-4" src={checkIcon} alt="" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DriverDetail;
