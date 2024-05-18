import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../../components/reusable/Skeleton";
import InfoCard from "../../components/reusable/InfoCard";
import { handleGetAllUserReport } from "../../api/users";

const UserReport = () => {
  // get product reports
  const {
    data: userReport,
    isLoading: isReportLoading,
    isError: isReportError,
  } = useQuery({
    queryKey: ["userReports"],
    queryFn: handleGetAllUserReport,
  });

  if (isReportError) return null;
  return (
    <div className="flex gap-5">
      {isReportLoading ? (
        <>
          <Skeleton className="w-[269px] h-[100px] rounded-xl" />
          <Skeleton className="w-[269px] h-[100px] rounded-xl" />
          <Skeleton className="w-[269px] h-[100px] rounded-xl" />
          <Skeleton className="w-[269px] h-[100px] rounded-xl" />
        </>
      ) : (
        <>
          <InfoCard
            title="Total Users"
            data={userReport?.totalUserCount ?? 0}
          />
          <InfoCard
            title="Active Users"
            data={userReport?.totalActiveCount ?? 0}
          />
          <InfoCard
            title="Inactive Users"
            data={userReport?.totalInActiveCount ?? 0}
          />
        </>
      )}
    </div>
  );
};
export default UserReport;
