type Props = {
  title: string;
  data: string | number;
};
const InfoCard = ({ title, data }: Props) => {
  return (
    <div className="flex flex-col p-4 gap-2 w-[269px] rounded-2xl border border-[#E5E7EB] bg-[#FFF]">
      <h3 className="text-base leading-5">{title}</h3>
      <span className="font-bold text-[32px] text-[#374151] leading-[38.73px]">
        {data}
      </span>
    </div>
  );
};
export default InfoCard;
