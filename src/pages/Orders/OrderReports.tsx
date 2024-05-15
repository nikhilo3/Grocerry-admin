import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../../components/reusable/Skeleton";
import InfoCard from "../../components/reusable/InfoCard";
import { handleGetAllOrderReport } from "../../api/order";

const OrderReport = () => {
  // get product reports
  const {
    data: orderReport,
    isLoading: isReportLoading,
    isError: isReportError,
  } = useQuery({
    queryKey: ["orderReport"],
    queryFn: handleGetAllOrderReport,
  });

  if (isReportError) return null;
  return (
    <div className="flex gap-5 overflow-x-auto hide-scrollbar">
      {isReportLoading ? (
        <>
          <Skeleton className="w-[269px] h-[100px] rounded-xl" />
          <Skeleton className="w-[269px] h-[100px] rounded-xl" />
          <Skeleton className="w-[269px] h-[100px] rounded-xl" />
          <Skeleton className="w-[269px] h-[100px] rounded-xl" />
          <Skeleton className="w-[269px] h-[100px] rounded-xl" />
          <Skeleton className="w-[269px] h-[100px] rounded-xl" />
        </>
      ) : (
        <>
          <InfoCard title="Total Orders" data={orderReport?.totalOrders!} />
          {Object.keys(orderReport?.countPerStatus!).map((key) => (
            <InfoCard
              key={key}
              title={key
                .split("_")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
              // @ts-ignore
              data={orderReport?.countPerStatus![key]}
            />
          ))}
        </>
      )}
    </div>
  );
};
export default OrderReport;
