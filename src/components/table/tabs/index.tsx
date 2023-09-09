interface TableTabsProps {
    tabs: string[];
    currentTab: number;
    onClick: (value: number) => void;
};

const TableTabs = ({
    tabs,
    currentTab,
    onClick
}: TableTabsProps) => {
    return (
        <div className = "flex flex-row justify-start items-center">
            <div className = "bg-[#E3E4EA] dark:bg-[#0E121E] p-1.5 rounded-lg  w-full sm:w-auto space-x-1 ">
                { tabs.map((val, i) => (
                    ( val  !== "" && (
                        <button
                            key  = { i }
                            type = "button" 
                            onClick = {() => onClick(i)}
                            className = {`${currentTab === i ? "bg-white text-[#2D3039] dark:bg-[#222938] dark:text-[#CBD4E6]" : "bg-transparent dark:bg-transparent"} p-4 rounded-lg uppercase text-[#6C7A91] dark:text-[#D1DAEE] btn border-0 hover:bg-white dark:bg-[#222938] w-full sm:w-auto`}
                        >
                            <span className = "font-bold text-md">
                                { val }
                            </span>
                        </button>
                    ))
                ))}
            </div>
        </div>
    )
}

export default TableTabs;