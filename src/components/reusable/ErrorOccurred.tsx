import { twMerge } from "tailwind-merge";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  error?: string | null;
};

const ErrorOccurred = ({ error, children, className, ...rest }: Props) => {
  return (
    <div
      className={twMerge(
        "h-full w-full flex items-center justify-center",
        className
      )}
      {...rest}
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-error-300">Error Occurred</h3>
        <p className="text-error-300">{error}</p>
      </div>
    </div>
  );
};

export default ErrorOccurred;
