import searchIcon from "../../assets/icons/search.svg";

const SearchBar = () => {
  return (
    <label className="input input-bordered flex items-center !outline-none gap-[10px] text-accent-400 w-[258px] p-4 bg-accent-100 rounded-xl">
                            <img
                                src={searchIcon}
                                alt="search"
                                className="w-[18px] h-[18px]"
                            />
                            <input
                                type="text"
                                placeholder="Search Orders"
                                className="text-base font-medium "
                            />
                        </label>
  )
}

export default SearchBar
