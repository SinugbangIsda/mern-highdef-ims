import { 
    useState,
    useEffect
} from "react";
import { useGetTransactionsStatisticsQuery } from "../../redux/services/transactionsServices";
import { Statistics } from "../../interfaces";
import DashboardStastisticCard from "./card/stat";
import { 
    MdOutlinePendingActions,
    MdPercent
} from "react-icons/md";
import { 
    TbReportMoney,
    TbTrendingUp2
 } from  "react-icons/tb";
import DashboardDailySalesChart from "./chart/dailysales";
import Button from "../form/button";
import { formatMoney } from "../../utils/formatMoney";

const INITIAL_VALUES: Statistics = {
    total: 0,
    highest: 0,
    average: 0,
    pending: 0,
    daily: []
};

const DashboardStastics = () => {
    const [ statistics, setStatistics ] = useState<Statistics>(INITIAL_VALUES);
    const {
        data,
        isLoading,
        refetch
    } = useGetTransactionsStatisticsQuery({});
    
    useEffect(() => {
        if (data) {
            setStatistics(data);
        };
    }, [ data ]);
    
    useEffect(() => {
        refetch();
    }, [ refetch ]);

    return (
        <div className = "space-y-4 mt-2">
            <div className = "w-full flex justify-end items-center">
                <div>
                    <Button 
                        label = "This Month"
                        type =  "button"
                        className = "bg-white dark:bg-[#222938]"

                    />
                </div>
            </div>
            <div className = "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-4 w-full">
                <DashboardStastisticCard 
                    label = { "Total" }
                    value = { statistics ? formatMoney(statistics.total) : 0 }
                    icon = { <TbReportMoney /> }
                    className = "bg-[#E8F2FE] text-[#3887FE]"
                />
                <DashboardStastisticCard 
                    label = { "Highest" }
                    value = { statistics ? formatMoney(statistics.highest) : 0 }
                    icon = { <TbTrendingUp2 /> }
                    className = "bg-[#EBF9EA] text-[#33C5D3]"
                />
                <DashboardStastisticCard 
                    label = { "Average" }
                    value = { statistics ? formatMoney(statistics.average) : 0 }
                    icon = { <MdPercent /> }
                    className = "bg-[#F3F1FF] text-[#8338EA]"
                />
                <DashboardStastisticCard 
                    label = { "Pending" }
                    value = { statistics ? formatMoney(statistics.pending) : 0 }
                    icon = { <MdOutlinePendingActions /> }
                    className = "bg-[#FEF8E2] text-[#FFAC2F]"
                />
            </div>
            <DashboardDailySalesChart 
                data = { statistics.daily }
                isLoading = { isLoading }
            />
        </div>
    )
}

export default DashboardStastics;