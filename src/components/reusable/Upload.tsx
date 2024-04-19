import uploadIcon from "../../assets/icons/upload.svg";

const Upload = () => {
  return (
    <button className="rounded-xl border border-secondary-100 bg-secondary-50 px-4 py-3 flex items-center justify-center gap-2">
    <span className="text-secondary-600 font-medium">
        Upload CSV
    </span>
    <img
        src={uploadIcon}
        alt="upload"
        className="w-[16px] h-[16px]"
    />
</button>
  )
}

export default Upload
