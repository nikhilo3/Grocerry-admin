import { useQuery } from "@tanstack/react-query";
import { handleGetProductReport } from "../../api/product";
import { Skeleton } from "../../components/reusable/Skeleton";
import InfoCard from "../../components/reusable/InfoCard";
import { PRODUCT_CATEGORIES } from "../../assets/data/constants";

const ProductReports = () => {
  // get product reports
  const {
    data: productReports,
    isLoading: isReportLoading,
    isError: isReportError,
  } = useQuery({
    queryKey: ["productReports"],
    queryFn: handleGetProductReport,
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
            title="Total Products"
            data={productReports?.totalProducts!}
          />
          <InfoCard
            title="Products In Stock"
            data={productReports?.totalInStockProducts!}
          />
          <InfoCard
            title="Products Out Of Stock"
            data={productReports?.totalOutOfStockProducts!}
          />
          <InfoCard
            title="Total Categories"
            data={Object.keys(PRODUCT_CATEGORIES).length}
          />
        </>
      )}
    </div>
  );
};
export default ProductReports;
