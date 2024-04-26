import arrowDown from "../../assets/icons/arrow-down.svg";

const Filter = () => {
    return (
        <div className="dropdown">
            <div
                tabIndex={0}
                role="button"
                className="btn bg-accent-300 text-accent-600 flex items-center justify-center font-medium text-base rounded-xl"
            >
                <span>Filter by Category</span>
                <img
                    src={arrowDown}
                    alt="arrow down"
                    className="w-[18px] h-[18px]"
                />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li>
                    <a>Item 1</a>
                </li>
                <li>
                    <a>Item 2</a>
                </li>
            </ul>
        </div>
    )
}
export default Filter
