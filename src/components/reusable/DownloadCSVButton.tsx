import Button from "./Button";
import downloadIcon from "../../assets/icons/download.svg";
import jsonToCSV from "../../utils/jsonToCSV";

const DownloadCSVButton = ({
  data,
  fileName,
}: {
  data: Array<Record<string, any>>;
  fileName: string;
}) => {
  const downloadCSV = async () => {
    jsonToCSV(data).then((csv: any) => {
      const csvBlob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(csvBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
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
