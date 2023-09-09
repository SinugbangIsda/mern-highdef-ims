import { Tab } from "../../../interfaces";
import CompletedTransactions from "./completed";
import PendingTransactions from "./pending";
import TrashedTransactions from "./trashed";

export const transactions_tables_list: Tab[] =  [
    {
        name: "Pending",
        table: <PendingTransactions />,
        isAdminOnly: false
    },
    {
        name: "Completed",
        table: <CompletedTransactions />,
        isAdminOnly: false
    },
    {
        name: "Trashed",
        table: <TrashedTransactions />,
        isAdminOnly: true

    }
];