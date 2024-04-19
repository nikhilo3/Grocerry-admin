import Button from "./Button";
import downloadIcon from "../../assets/icons/download.svg";

const DownloadCSVButton = ({
  data,
  fileName,
}: {
  data: Array<Record<string, any>>;
  fileName: string;
}) => {
  const downloadCSV = () => {
    console.log("Downloading CSV...");
    // Convert the data to CSV format
    console.log(data, fileName);
  };
  return (
    <Button
      onClick={downloadCSV}
      variant="green"
      className="flex items-center justify-center gap-2"
    >
      <span>Download CSV</span>
      <img src={downloadIcon} alt="download" className="w-[16px] h-[16px]" />
    </Button>
  );
};
export default DownloadCSVButton;
