import { TableActionButtonProps } from "../../../interfaces";

const TableActionButton = ({
    label,
    icon,
    onClick
}: TableActionButtonProps) => {
    return (
        <button
            tabIndex = { -1 } 
            className = "w-full hover:bg-[#F2F3F8] dark:hover:bg-[#222937] px-4 py-1 flex flex-row items-center gap-2 text-md"
            onClick = { onClick }
        >
            <span>
                { icon }
            </span>
            <span>
                { label }
            </span>
        </button>
    )
};

export default TableActionButton;