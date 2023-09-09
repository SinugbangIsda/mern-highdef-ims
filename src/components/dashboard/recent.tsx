import { useEffect } from "react";
import { transactions_table_headers } from "../../constants";
import { useGetRecentTransactionsQuery } from "../../redux/services/transactionsServices";
import Table from "../table";

const RecentTransactionsTable = () => {
    const { 
        data, 
        refetch, 
        isLoading, 
        isFetching 
    } = useGetRecentTransactionsQuery({});

    useEffect(() => {
        refetch();
    }, [ refetch ]);

    return (
        <Table
            data =  { data }
            isViewOnly
            headers = { transactions_table_headers }
            title = "Recent Sales"
            isFetching = { isFetching }
            isLoading = { isLoading }
            canDoubleClick
            recentTransactions
        />
    )
};

export default RecentTransactionsTable;
