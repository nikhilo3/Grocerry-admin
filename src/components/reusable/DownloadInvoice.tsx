import downloadIcon from "../../assets/icons/downloadinvoice.svg";

const Download = () => {
  return (
    <button className="rounded-xl border border-secondary-100 bg-primary-500 px-4 py-3 flex items-center justify-center gap-2">
      <span className="text-white font-medium">
        Download Invoice
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
