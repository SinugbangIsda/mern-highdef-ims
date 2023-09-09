import { SlOptionsVertical } from "react-icons/sl";
import { 
    MdDelete, 
    MdEdit, 
    MdOutlineRestore 
} from "react-icons/md";
import { TableActionsProps } from "../../../interfaces";
import TableActionButton from "./button";

const actions = [
    {
        label: "Edit",
        icon: <MdEdit />,
        action: "Update",
        onlyForIsDelete: false
    },
    {
        label: "Restore",
        icon: <MdOutlineRestore />,
        action: "Restore",
        onlyForIsDelete: true
    },
    {
        label: "Delete",
        icon: <MdDelete />,
        action: "Delete",
        onlyForIsDelete: false
    }
];

const TableActions = ({
    data,
    isDeleted,
    handleData,
    handleModalAction,
    onModalOpen
}: TableActionsProps) => {
    const filteredActions = actions.filter(val => !val.onlyForIsDelete || (val.onlyForIsDelete && isDeleted));
    
    return  (
        <div className = "dropdown">
            <span
                tabIndex = { -1 }
                onClick = {() => {}}
                className = "cursor-pointer"
            >
                <SlOptionsVertical />
            </span>
            <div
                tabIndex = { 0 }
                className = "dropdown-content z-[1] menu rounded-lg bg-white dark:bg-[#11151C] border border-[#C3C9D] dark:border-[#30363D] right-5 top-0"
            >
                { filteredActions.map((val, i) => (
                    <TableActionButton 
                        key = { i }
                        label = { val.label }
                        icon = { val.icon }
                        onClick = {() => {
                            handleModalAction(val.action);
                            handleData(data);
                            onModalOpen();
                        }}
                    />
                ))}
            </div>
        </div>
    )
};

export default TableActions;