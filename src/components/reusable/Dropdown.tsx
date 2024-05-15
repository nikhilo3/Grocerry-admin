import { useState } from "react";
import arrowDown from "../../assets/icons/arrow-down.svg";
import checked from "../../assets/icons/checked-box-svgrepo-com.svg";
import unchecked from "../../assets/icons/unchecked.svg";
import { twMerge } from "tailwind-merge";

interface IDropdownProps {
  dropdownItems: Array<string>;
  setDropdownItem: (item: string | null) => void;
  selectedItem: string | null;
  label: string;
}
const Dropdown = (props: IDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="relative !outline-none w-[260px]">
      <div
        tabIndex={0}
        role="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={twMerge(
          "btn rounded-t-xl !scale-100 !ring-0 !border-none focus:border-none bg-accent-300 text-accent-600 flex items-center justify-between font-medium text-base transition-all",

          isDropdownOpen ? "rounded-b-none" : "rounded-b-xl"
        )}
      >
        <span>{props.selectedItem || props.label}</span>
        <img
          src={arrowDown}
          alt="arrow down"
          className={twMerge(
            "w-[18px] h-[18px] transition-transform",
            isDropdownOpen && "rotate-180"
          )}
        />
      </div>
      <ul
        tabIndex={0}
        className="absolute outline-none z-[1] menu shadow bg-white rounded-b-xl w-full text-accent-600 font-medium overflow-hidden flex-col"
        style={{
          display: isDropdownOpen ? "flex" : "none",
        }}
      >
        {props.dropdownItems?.map((item, index) => (
          <button
            onClick={() => {
              if (props.selectedItem === item) {
                props.setDropdownItem(null);
              } else {
                props.setDropdownItem(item);
              }
              setIsDropdownOpen(false);
            }}
            key={index}
            className={twMerge(
              "flex justify-between btn !bg-transparent !text-accent-600 !font-medium shadow-none rounded-t-xl !scale-100 !ring-0 rounded-none",
              index !== 0
                ? "border-t border-accent-300 border-b-0 border-l-0 border-r-0"
                : "border-none focus:border-none"
            )}
          >
            <span>{item}</span>
            {props.selectedItem === item ? (
              <img
                src={checked}
                alt="checked btn"
                className="w-[21px] h-[21px]"
              />
            ) : (
              <img
                src={unchecked}
                alt="unchecked"
                className="w-[18px] h-[18px]"
              />
            )}
          </button>
        ))}
      </ul>
    </div>
  );
};
export default Dropdown;
