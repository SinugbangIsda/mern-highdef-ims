import { Tab } from "../../../interfaces";
import ActivatedUsers from "./activated";
import PendingUsers from "./pending";

export const users_tables_list: Tab[] =  [
    {
        name: "Activated",
        table: <ActivatedUsers />,
        isAdminOnly: true
    },
    {
        name: "Pending",
        table: <PendingUsers />,
        isAdminOnly: true
    }
];