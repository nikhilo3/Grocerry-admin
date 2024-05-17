import { useQuery } from "@tanstack/react-query";
import { handleGetProductReport } from "../../api/product";
import { Skeleton } from "../../components/reusable/Skeleton";
import InfoCard from "../../components/reusable/InfoCard";
import { PRODUCT_CATEGORIES } from "../../assets/data/constants";
import { handleGetAllUserReport } from "../../api/users";
import { useEffect } from "react";

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

  useEffect(() => {
    console.log(userReport);
  }, [userReport]);

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
          <InfoCard title="Total Users" data={userReport?.totalUserCount!} />
          <InfoCard title="Active Users" data={userReport?.totalActiveCount!} />
          <InfoCard
            title="Inactive Users"
            data={userReport?.totalInActiveCount!}
          />
        </>
      )}
    </div>
  );
};
export default UserReport;
