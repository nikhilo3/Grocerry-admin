import searchIcon from "../../assets/icons/search.svg";
import { twMerge } from "tailwind-merge";

type ISearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({ className, ...props }: ISearchInputProps) => {
  return (
    <label className="input input-bordered flex items-center !outline-none gap-[10px] text-accent-400 w-[258px] p-4 bg-accent-100 rounded-xl">
      <img src={searchIcon} alt="search" className="w-[18px] h-[18px]" />
      <input
        type="text"
        className={twMerge("text-base font-medium ", className)}
        {...props}
      />
    </label>
  );
};
export default SearchInput;
