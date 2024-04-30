import UnCheckedBox from "../../assets/icons/unchecked-box";
import SearchInput from "../../components/reusable/SearchInput";
import { useEffect, useState } from "react";
import DownloadCSVButton from "../../components/reusable/DownloadCSVButton";
import search from "../../utils/search";
import Button from "../../components/reusable/Button";
import { suggestedd } from "../../assets/mockData/suggested";
import trash from "../../assets/icons/trash.svg";

const SuggestedProducts = () => {
  const [filteredData, setFilteredData] = useState(suggestedd);
  const [queryString, setQueryString] = useState<string>("");

  useEffect(() => {
    const searchKeys = ["name", "_id"];
    const data = search(suggestedd, queryString, searchKeys);
    setFilteredData(data);
  }, [queryString]);

  return (
    <>
      <div className="flex flex-col gap-11 overflow-hidden">
        {/* table */}
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
                <DownloadCSVButton data={suggestedd} fileName="userData" />
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
                <span className="col-span-2">Message</span>
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
                    <span className="truncate my-auto">{data._id}</span>
                    <span className="truncate my-auto">{data.name}</span>
                    <span className="truncate my-auto  col-span-2">
                      {data.message}
                    </span>
                    <Button variant="primary-ghost" className="mx-auto py-2">
                      <img src={trash} alt="delete" />
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
    </>
  );
};
export default SuggestedProducts;
