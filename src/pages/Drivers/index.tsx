import Button from "../../components/reusable/Button";
import SearchInput from "../../components/reusable/SearchInput";
import addCircleSvg from "../../assets/icons/add-circle.svg";
import Download from "../../components/reusable/Download";
import { useEffect, useState } from "react";
import search from "../../utils/search";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import DriverDetail from "./DriverDetail";
import AddDriver from "./AddDriver";
import { useQuery } from "@tanstack/react-query";
import { DriverResponseType, getAllDrivers } from "../../api/driver";
import UpdateDriver from "./UpdateDriver";

const Drivers = () => {
  const [filteredData, setFilteredData] = useState<DriverResponseType[]>([]);
  const [queryString, setQueryString] = useState<string>("");
  const [selectedDriverData, setSelectedDriverData] =
    useState<DriverResponseType | null>(null);
  const [editDriverData, setEditDriverData] =
    useState<DriverResponseType | null>(null);

  // get all drivers query
  const {
    isError,
    isLoading,
    data: drivers,
  } = useQuery({
    queryKey: ["drivers"],
    queryFn: getAllDrivers,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!drivers || isError || isLoading) return;
    let data = drivers!;
    const searchKeys = ["id", "name", "vehicle"];
    data = search(data, queryString, searchKeys);
    setFilteredData(data);
  }, [queryString, drivers, isLoading, isError]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <div>
      <div className="flex flex-col gap-7 justify-center">
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
                      setEditDriverData(null);
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
                  gridTemplateColumns: "0.1fr 2fr 3fr 3fr 3fr 1fr",
                }}
              >
                <button>
                  <UnCheckedBox className="w-[18px] h-[18px]" />
                </button>
                <span className="text-nowrap">Driver ID</span>
                <span className="text-nowrap">Full Name</span>
                <span className="text-nowrap">Phone No.</span>
                <span className="text-nowrap">Vehicle No.</span>
                <span className="text-nowrap  ">Actions</span>
              </div>
              {filteredData.length > 0 ? (
                filteredData.map((drivers, index) => (
                  <div
                    key={index}
                    className="grid justify-center items-center w-full gap-4 text-center  even:bg-accent-50 rounded-xl p-4 text-accent-500 font-normal"
                    style={{
                      gridTemplateColumns: "0.1fr 2fr 3fr 3fr 3fr 1fr",
                    }}
                  >
                    <button>
                      <UnCheckedBox className="w-[18px] h-[18px]" />
                    </button>
                    <span className="truncate" key={index}>
                      {drivers.id}
                    </span>
                    <span className="truncate">{drivers.name}</span>
                    <span className="truncate">{drivers.contactNo}</span>
                    <span className="truncate">{drivers.vehicleNo}</span>
                    <Button
                      onClick={() => {
                        setSelectedDriverData(drivers);
                        if (document) {
                          (
                            document.getElementById(
                              "driverDetails"
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

        <DriverDetail
          driver={selectedDriverData}
          setEditDriverData={setEditDriverData}
        />
        <AddDriver />
        <UpdateDriver
          driver={editDriverData}
          setEditDriverData={setEditDriverData}
        />
      </div>
    </div>
  );
};

export default Drivers;
