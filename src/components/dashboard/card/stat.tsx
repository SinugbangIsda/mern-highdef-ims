import { DashboardStasticCardProps } from "../../../interfaces";

const DashboardStastisticCard = ({
    value,
    label,
    icon,
    className
}: DashboardStasticCardProps) => {
    return (
        <div className = " bg-white dark:bg-[#222938] px-6 py-10 rounded-lg flex flex-col lg:flex-row lg:text-start text-center items-center stat gap-3">
            <div className = {`${className} p-4 rounded-full aspect-square text-3xl`}>
                <span>
                    { icon }
                </span>
            </div>
            <div className = "flex flex-col-reverse lg:flex-col gap-2">
                <span className = "stat-title text-[#A2ABAE] dark:text-[#8792A6] capitalize">
                    { label } Sales
                </span>
                <span className = "stat-value text-[#2C2E39] dark:text-white text-2xl">
                    PHP { value }
                </span>
            </div>
        </div>
    )
};

export default DashboardStastisticCard;