import InfoCard from "../../components/reusable/InfoCard";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import SearchInput from "../../components/reusable/SearchInput";
import { useCallback, useEffect, useState } from "react";
import DownloadCSVButton from "../../components/reusable/DownloadCSVButton";
import { userData, userStats } from "../../assets/mockData/userData";
import Button from "../../components/reusable/Button";
import UserDetailsModal from "./UserDetailsModal";
import { useQuery } from "@tanstack/react-query";
import { IGetAllUsersResponse, handleGetAllUsers } from "../../api/users";
import objToQuery from "../../utils/objToQuery";
import ErrorOccurred from "../../components/reusable/ErrorOccurred";
import AppLoading from "../../components/loaders/AppLoading";
import debounce from "../../utils/debounce";
import UserReport from "./UserReport";

const DEFAULT_QUERY_PARAMS = {
  pageNo: 1,
  perPage: 10,
  name: null as string | null,
};

const UsersPage = () => {
  const [queryParams, setQueryParams] = useState(DEFAULT_QUERY_PARAMS);
  const [selectedUser, setSelectedUser] = useState<IGetAllUsersResponse>();
  const [debouncedQueryParams, setDebouncedQueryParams] =
    useState(DEFAULT_QUERY_PARAMS);

  // get all users query
  const {
    isError,
    isLoading,
    data: users,
  } = useQuery({
    queryKey: ["users", debouncedQueryParams],
    queryFn: () => handleGetAllUsers(objToQuery(debouncedQueryParams)),
    staleTime: Infinity,
  });

  const debouncedRefetch = useCallback(
    debounce((queryParams) => {
      setDebouncedQueryParams(queryParams);
    }),
    [] // dependencies
  ); //callback to ensure that setSearchParams is not called on every render

  useEffect(() => {
    debouncedRefetch(queryParams);
  }, [queryParams]);

  if (isError) return <ErrorOccurred error="Failed to fetch users!" />;
  return (
    <>
      <div className="flex flex-col gap-11 overflow-hidden">
        {/* product cards */}
        <UserReport />
        {/* product table */}
        <div className="overflow-x-scroll hide-scrollbar min-h-[40vh]">
          <div className="border border-accent-200 rounded-[20px] bg-white p-6 flex flex-col gap-6 min-w-[1100px]">
            {/* product top action buttons */}
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <SearchInput
                  placeholder="Search user..."
                  onChange={(e) => {
                    setQueryParams({
                      ...queryParams,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <DownloadCSVButton data={userData} fileName="users" />
              </div>
            </div>
            {/* userData list */}
            <div className="flex flex-col gap-4">
              <div
                className="grid bg-accent-500 rounded-xl p-4 text-accent-50 font-normal gap-4"
                style={{
                  gridTemplateColumns: "0.5fr 3fr 4fr 4fr 4fr 1.5fr",
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
              {isLoading ? (
                <AppLoading />
              ) : users && users.length > 0 ? (
                users.map((data, index) => (
                  <div
                    key={index}
                    className="grid even:bg-accent-50 rounded-xl p-4 text-accent-500 font-normal gap-4"
                    style={{
                      gridTemplateColumns: "0.5fr 3fr 4fr 4fr 4fr 1.5fr",
                    }}
                  >
                    <button>
                      <UnCheckedBox className="w-[18px] h-[18px]" />
                    </button>

                    <span className="truncate my-auto">
                      {data.userDetails.id}
                    </span>
                    <span className="truncate my-auto">
                      {data.userDetails.name}
                    </span>
                    <span className="truncate my-auto">
                      {data.userDetails.email}
                    </span>
                    <span className="truncate my-auto">
                      {data.userDetails.primaryPhoneNo}
                    </span>

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

            {/* pagination */}
            <div className="flex justify-end items-center gap-4">
              <button
                onClick={() => {
                  setQueryParams((prev) => ({
                    ...prev,
                    pageNo: prev.pageNo - 1,
                  }));
                }}
                disabled={queryParams.pageNo === 1}
                className="px-4 py-1 rounded-lg border border-accent-500 text-accent-800 disabled:text-accent-200 disabled:border-accent-200"
              >
                Prev
              </button>
              <span className="text-accent-500">Page {queryParams.pageNo}</span>
              <button
                onClick={() => {
                  setQueryParams((prev) => ({
                    ...prev,
                    pageNo: prev.pageNo + 1,
                  }));
                }}
                disabled={(users ? users?.length : 0) < queryParams.perPage}
                className="px-4 py-1 rounded-lg border border-accent-500 text-accent-800 disabled:text-accent-200 disabled:border-accent-200"
              >
                Next
              </button>
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
