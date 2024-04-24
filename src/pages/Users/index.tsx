import InfoCard from "../../components/reusable/InfoCard";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import SearchInput from "../../components/reusable/SearchInput";
import { useEffect, useState } from "react";
import DownloadCSVButton from "../../components/reusable/DownloadCSVButton";
import search from "../../utils/search";
import { userData, userStats } from "../../assets/mockData/userData";
import Button from "../../components/reusable/Button";
import UserDetailsModal from "./UserDetailsModal";

const UsersPage = () => {
  const [filteredData, setFilteredData] = useState(userData);
  const [queryString, setQueryString] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<(typeof userData)[number]>();

  useEffect(() => {
    const searchKeys = ["name", "category", "subCategory"];
    const data = search(userData, queryString, searchKeys);
    setFilteredData(data);
  }, [queryString]);

  return (
    <>
      <div className="flex flex-col gap-11 overflow-hidden">
        {/* product cards */}
        <div className="flex gap-5">
          {userStats.map((stat, index) => (
            <InfoCard key={index} {...stat} />
          ))}
        </div>
        {/* product table */}
        <div className="overflow-x-scroll hide-scrollbar min-h-[40vh]">
          <div className="border border-accent-200 rounded-[20px] bg-white p-6 flex flex-col gap-6 min-w-[1100px]">
            {/* product top action buttons */}
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <SearchInput
                  placeholder="Search user..."
                  onChange={(e) => setQueryString(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <DownloadCSVButton data={userData} fileName="userData" />
              </div>
            </div>
            {/* userData list */}
            <div className="flex flex-col gap-4">
              <div
                className="grid bg-accent-500 rounded-xl p-4 text-accent-50 font-normal"
                style={{
                  gridTemplateColumns: "1fr 3fr 4fr 4fr 4fr 1.5fr",
                }}
              >
                <button>
                  <UnCheckedBox className="w-[18px] h-[18px]" />
                </button>
                <span>User Id</span>
                <span>Full Name</span>
                <span>Email ID</span>
                <span>Phone No.</span>
                <span className="m-auto">Actions</span>
              </div>
              {filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <div
                    key={index}
                    className="grid even:bg-accent-50 rounded-xl p-4 text-accent-500 font-normal"
                    style={{
                      gridTemplateColumns: "1fr 3fr 4fr 4fr 4fr 1.5fr",
                    }}
                  >
                    <button>
                      <UnCheckedBox className="w-[18px] h-[18px]" />
                    </button>
                    {Object.values(data).map((value, index) => (
                      <span className="truncate my-auto" key={index}>
                        {value}
                      </span>
                    ))}
                    <Button
                      variant="primary/100"
                      className="mx-auto w-[100px] py-2"
                      onClick={() => {
                        setSelectedUser(data);
                        document
                          .getElementById("user_details_modal")
                          //@ts-ignore
                          ?.showModal();
                      }}
                    >
                      View
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center text-accent-400 text-lg h-44 flex items-center justify-center">
                  No user data found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <UserDetailsModal
        user={selectedUser!}
        clearUser={() => setSelectedUser(undefined)}
      />
    </>
  );
};
export default UsersPage;
