import React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  close: () => void;
};

const ActionModal = ({ className, children, close, ...props }: Props) => {
  return (
    <>
      {/* //overlay */}
      <div
        onClick={() => close()}
        className="fixed inset-0 z-20 bg-black bg-opacity-10 w-screen h-screen"
      />
      <div
        onClick={() => close()}
        style={{
          boxShadow: "0px 8px 32px 0px rgba(0, 0, 0, 0.10)",
        }}
        className={twMerge(
          "absolute top-0 right-full z-30 mr-2 w-[165px] bg-white border border-accent-100 rounded-xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export default ActionModal;
