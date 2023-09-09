const SidebarFooter = () => {
    const date = new Date();
    const currentYear = date.getFullYear();
    return (
        <div>
            <span className = "text-[#A2A7B4] dark:text-[#55565A] text-xs">
                @ { currentYear } HighDef Hauling IMS.
            </span>
        </div>
    )
}

export default SidebarFooter;