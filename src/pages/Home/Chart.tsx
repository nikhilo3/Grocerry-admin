import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [0, 100, 40, 60, 500, 100],
      borderColor: "#F97316",
    },
    {
      label: "Dataset 2",
      data: [10, 900, 1, 500, 50, 40],
      borderColor: "#22C55E",
    },
  ],
};

const Chart = () => {
  return <Line options={options} data={data} />;
};

export default Chart;
