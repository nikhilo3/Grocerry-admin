import Button from "../../components/reusable/Button";
import { DriversData, drivers } from "../../assets/mockData/driverData";
import InfoCard from "../../components/reusable/InfoCard";
import SearchInput from "../../components/reusable/SearchInput";
import addCircleSvg from "../../assets/icons/add-circle.svg";
import Download from "../../components/reusable/Download";
import { useEffect, useState } from "react";
import search from "../../utils/search";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import DriverDetail from "./DriverDetail";
import AddDriver from "./AddDriver";

const Drivers = () => {
  const [filteredData, setFilteredData] = useState(drivers);
  const [queryString, setQueryString] = useState<string>("");
  const [driverId, setDriverId] = useState("");

  useEffect(() => {
    let data = drivers;
    const searchKeys = ["id", "name", "vehicle"];
    data = search(data, queryString, searchKeys);
    setFilteredData(data);
  }, [queryString]);

  return (
    <div>
      <div className="flex flex-col gap-7 justify-center">
        <div className="flex items-center gap-5">
          {DriversData.map((item) => (
            <>
              <InfoCard data={item.value} title={item.title} />
            </>
          ))}
        </div>

        <div className="overflow-x-scroll hide-scrollbar min-h-[40vh]">
          <div className="border border-accent-200 rounded-[20px] bg-white p-6 flex flex-col gap-6 min-w-[1100px]">
            {/* top buttons and searchBar */}
            <div className="">
              <div className="flex justify-between items-center">
                <SearchInput
                  onChange={(e) => setQueryString(e.target.value)}
                  placeholder="Search Drivers"
                />
                {/* add Drivers and Download CSV */}
                <div className="flex justify-center gap-3 items-center">
                  <Download />
                  <Button
                    onClick={() => {
                      if (document) {
                        (
                          document.getElementById(
                            "addDriverModal"
                          ) as HTMLFormElement
                        ).showModal();
                      }
                    }}
                    variant="primary"
                    className="flex justify-center items-center gap-2"
                  >
                    <span className="text-base font-medium">Add Driver</span>
                    <img src={addCircleSvg} alt="" />
                  </Button>
                </div>
              </div>
            </div>
            {/* Table */}
            <div className="flex justify-center  flex-col gap-4">
              <div
                className="grid justify-center text-center bg-accent-500 rounded-xl p-4 text-accent-50 font-normal"
                style={{
                  gridTemplateColumns: "0.1fr 2fr 3fr 3fr 3fr 3fr 1fr",
                }}
              >
                <button>
                  <UnCheckedBox className="w-[18px] h-[18px]" />
                </button>
                <span className="text-nowrap">Driver ID</span>
                <span className="text-nowrap">Full Name</span>
                <span className="text-nowrap">Phone No.</span>
                <span className="text-nowrap">Vehicle No.</span>
                <span className="text-nowrap">Deliveries Completed</span>
                <span className="text-nowrap  ">Actions</span>
              </div>
              {filteredData.length > 0 ? (
                filteredData.map((drivers, index) => (
                  <div
                    key={index}
                    className="grid justify-center items-center w-full text-center  even:bg-accent-50 rounded-xl p-4 text-accent-500 font-normal"
                    style={{
                      gridTemplateColumns: "0.1fr 2fr 3fr 3fr 3fr 3fr 1fr",
                    }}
                  >
                    <button>
                      <UnCheckedBox className="w-[18px] h-[18px]" />
                    </button>
                    {Object.values(drivers).map((value, index) => (
                      <span className="truncate" key={index}>
                        {value}
                      </span>
                    ))}
                    <Button
                      onClick={() => {
                        setDriverId(drivers.id);
                        if (document) {
                          (
                            document.getElementById(
                              "my_modal_3"
                            ) as HTMLFormElement
                          ).showModal();
                        }
                      }}
                      variant="primary-outline"
                      className="px-8 m-0 my-0 mx-0"
                    >
                      <span className="font-medium text-base">View</span>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center text-accent-400 text-lg h-44 flex items-center justify-center">
                  No drivers found
                </div>
              )}
            </div>
          </div>
        </div>

        <DriverDetail driverId={driverId} />
        <AddDriver />
      </div>
    </div>
  );
};

export default Drivers;
