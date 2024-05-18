import { twMerge } from "tailwind-merge";

const AppLoading = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "h-full w-full flex items-center justify-center",
        className
      )}
    >
      <span className="loading loading-spinner loading-md" />
    </div>
  );
};
export default AppLoading;
