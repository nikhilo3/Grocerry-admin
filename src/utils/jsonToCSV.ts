import { json2csv } from "json-2-csv";
import toast from "react-hot-toast";

const jsonToCSV = (json: any[]) => {
  return new Promise((resolve, reject) => {
    try {
      const res = json2csv(json);
      resolve(res);
    } catch (error) {
      toast.error("Failed to convert JSON to CSV");
      console.error(error);
      reject();
    }
  });
};

export default jsonToCSV;
