import { 
    Bar, 
    BarChart, 
    CartesianGrid, 
    ResponsiveContainer, 
    Tooltip, 
    XAxis, 
    YAxis 
} from 'recharts';
import { 
    DashboardDailySalesChartProps 
} from '../../../interfaces';
import { formatDate } from '../../../utils/formatDate';

const DashboardDailySalesChart = ({
    data,
    isLoading
}: DashboardDailySalesChartProps) => {
    const currentDate = new Date();
    const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const getAllDatesInMonth = () => {
        const dates = [];

        for (let date = firstDayOfCurrentMonth; date <= lastDayOfCurrentMonth; date.setDate(date.getDate() + 1)) {
            const formattedDate = formatDate(date.toISOString(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX', "MMM dd");
            dates.push(formattedDate);
        }

        return dates;
    };

    const allDatesInMonth = getAllDatesInMonth();

    const INITIAL_DATA = allDatesInMonth.map((date) => {
        return {
            date,
            total_sales: 0
        };
    });

    const formattedData = data.map((val: any) => ({
        date: formatDate(val.date, 'MM/dd/yyyy', 'MMM dd'),
        total_sales: val.total_sales,
    }));

    return (
        <div className = "w-full h-[23rem] bg-white dark:bg-[#222938] p-10 rounded-lg flex flex-col space-y-4">
            <span className = "font-semibold text-base text-[#2C3437] dark:text-[#798395]">
                Total no. of sales within the month
            </span>
            <ResponsiveContainer 
                width = "98%" 
                height = "94%"
            >
                <BarChart data = { isLoading ? INITIAL_DATA : formattedData }>
                    <XAxis 
                        dataKey = "date" 
                        stroke = "#485467"  
                        strokeWidth = { 0 }
                    />
                    <YAxis 
                        stroke = "#485467" 
                        strokeWidth = { 0 }
                    />
                    <Tooltip />
                    <CartesianGrid stroke="#E9EBEA" strokeDasharray = "10 10" vertical = { false } className = "dark:hidden"/>
                    <Bar 
                        dataKey = "total_sales" 
                        stackId = "a" 
                        fill = "#8338EA" 
                        radius = {[ 8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
};

export default DashboardDailySalesChart;