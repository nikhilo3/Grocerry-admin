import downloadIcon from "../../assets/icons/download.svg";

const Download = () => {
  return (
    <button className="rounded-xl border border-secondary-100 bg-secondary-50 px-4 py-3 flex items-center justify-center gap-2">
                            <span className="text-secondary-600 font-medium">
                                Download CSV
                            </span>
                            <img
                                src={downloadIcon}
                                alt="download"
                                className="w-[16px] h-[16px]"
                            />
                        </button>
  )
}

export default Download
