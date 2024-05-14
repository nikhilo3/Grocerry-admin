import UnCheckedBox from "../../assets/icons/unchecked-box";
import SearchInput from "../../components/reusable/SearchInput";
import { useState } from "react";
import DownloadCSVButton from "../../components/reusable/DownloadCSVButton";
import Button from "../../components/reusable/Button";
import trash from "../../assets/icons/trash.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllSuggestions,
  handleRemoveSuggestion,
} from "../../api/suggestion";
import toast from "react-hot-toast";
import ErrorOccurred from "../../components/reusable/ErrorOccurred";
import AppLoading from "../../components/loaders/AppLoading";
import Swal from "sweetalert2";

const Suggestions = () => {
  const [queryString, setQueryString] = useState<string>("");
  const queryClient = useQueryClient();

  // get all suggestions query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allSuggestions"],
    queryFn: getAllSuggestions,
  });

  // remove suggestion query
  const { mutate, isPending } = useMutation({
    mutationFn: handleRemoveSuggestion,
    onSuccess: (msg) => {
      queryClient.invalidateQueries({
        queryKey: ["allSuggestions"],
      });
      toast.success(msg);
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const deleteSuggestion = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };

  const handleShowFullSuggestion = (suggestion: string) => {
    Swal.fire({
      title: "Suggestion",
      text: suggestion,
      icon: "info",
    });
  };

  if (isError) return <ErrorOccurred error="Failed to fetch suggestions" />;

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
                <DownloadCSVButton data={data!} fileName="suggestions" />
              </div>
            </div>
            {/* userData list */}
            <div className="flex flex-col gap-4">
              <div
                className="grid bg-accent-500 rounded-xl p-4 text-accent-50 font-normal gap-4"
                style={{
                  gridTemplateColumns: "0.5fr 4fr 7fr 1.5fr",
                }}
              >
                <button>
                  <UnCheckedBox className="w-[18px] h-[18px]" />
                </button>
                <span>User Id</span>
                <span className="ml-4">Message</span>
                <span className="m-auto">Actions</span>
              </div>
              {isLoading ? (
                <AppLoading />
              ) : data && data?.length > 0 ? (
                data.map((data, index) => (
                  <div
                    key={index}
                    className="grid even:bg-accent-50 rounded-xl p-4 text-accent-500 font-normal gap-4"
                    style={{
                      gridTemplateColumns: "0.5fr 4fr 7fr 1.5fr",
                    }}
                  >
                    <button>
                      <UnCheckedBox className="w-[18px] h-[18px]" />
                    </button>
                    <span className="truncate my-auto">{data.id}</span>
                    <span className="truncate my-auto ml-4">
                      {data.comment}
                    </span>
                    <div className="flex items-center justify-center">
                      <Button
                        onClick={() => deleteSuggestion(data.id)}
                        disabled={isPending}
                        variant="primary-ghost"
                        className="mx-auto py-2"
                      >
                        <img src={trash} alt="delete" />
                      </Button>
                      <Button
                        onClick={() => handleShowFullSuggestion(data.comment)}
                        variant="primary-ghost"
                        className="py-2 pl-0"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-accent-400 text-lg h-44 flex items-center justify-center">
                  No data available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Suggestions;
