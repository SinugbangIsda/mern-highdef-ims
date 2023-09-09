import { Fragment, } from "react";
import TableActions from "./actions";
import FormInput from "../form/input";
import { 
    useNavigate, 
    useLocation 
} from "react-router-dom"
import Button from "../form/button";
import { TableProps } from "../../interfaces";

import { formatDate } from "../../utils/formatDate";

const Table = ({
    data,
    headers,
    isViewOnly,
    title,
    isLoading,
    canAdd,
    canDoubleClick,
    hasSearch,
    query,
    isDeleted,
    recentTransactions,
    products,
    customTitleWithButtons,
    onSearch,
    onModalOpen,
    handleModalOperation,
    handleSelectedData
}: TableProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const filterTableHeader = (value: string) => {
        return value.replace(/At/g, " ").replace(/_/g, " ").replace(/name/g, " Name");
    };

    return (
        <div className = "flex flex-col space-y-4 w-full h-full">  
            <div className = "flex flex-col space-y-2">
                { title && (
                    <h3 className = "font-semibold text-[#383A45] dark:text-[#EEEEEF] text-lg">
                        { title }
                    </h3>
                )}
                { customTitleWithButtons && (
                    customTitleWithButtons
                )}
                <div className = "w-full flex flex-col sm:flex-row justify-between items-center gap-2">
                    { (hasSearch) && (
                        <div className = "sm:w-72 w-full">
                            <FormInput 
                                type = "text"
                                placeholder = "Search"
                                name  = "search"
                                value = { query }
                                onChange = {(e) => { 
                                    onSearch!(e.currentTarget.value);
                                }}
                            />
                        </div>
                    )}
                    { !isViewOnly && (
                        <div className = "w-full sm:w-32 flex flex-col justify-end sm:flex-row">
                            { canAdd && (
                                <Button 
                                    onClick = {() => { 
                                        handleModalOperation!("Add");
                                        onModalOpen!();
                                    }}
                                    defaultBG
                                    label = "+ New"
                                    type =  "button"
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className = {`w-full overflow-auto ${isLoading ? "h-20": recentTransactions ? "h-auto" : products ? "h-[22.9rem]" : "h-[37rem]"}`}>
                <table className = "table-auto w-full overflow-y-hidden overflow-x-auto table rounded-none">
                    <thead  className = "text-left text-base text-[#394043] dark:text-[#C8C8C9]">
                        <tr className = "border-b border-b-[#E5E6E6] dark:border-b-[#191E24]">
                            { headers.map((val, i) => (
                                <th
                                    key = { i }
                                    className = "truncate uppercase px-10"
                                >
                                    { filterTableHeader(val) }
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className = "text-[#293133] dark:text-[#8A8E98]">
                        {(data && !isLoading) && (
                            <>
                                { data?.map((value: any, i) => (
                                    <tr 
                                        key = { i }
                                        className = "truncate hover:bg-[#FFFFFF] dark:hover:bg-[#222938] border-b border-b-[#E5E6E6] dark:border-b-[#191E24]"
                                    >
                                        { headers.map((val, j) => (
                                            <Fragment key = { j }>
                                                <td 
                                                    key = { j }
                                                    className  = "px-10"
                                                    onDoubleClick = { () => canDoubleClick ? navigate(`${location.pathname === "/" ? `/transactions/${value._id}` : `${location.pathname}/${value._id}`}`) : null}
                                                >
                                                    { formatDate(value[val], 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX', 'MM/dd/yyyy') }
                                                </td>
                                                { (j === headers.length - 1  && !isViewOnly )  &&  (
                                                    <td className = "pr-6">
                                                        <TableActions
                                                            data = { value }
                                                            isDeleted = { isDeleted! }
                                                            handleData = { handleSelectedData! }
                                                            onModalOpen  = { onModalOpen! }
                                                            handleModalAction = { handleModalOperation! }
                                                        />
                                                    </td>
                                                )}
                                            </Fragment>
                                        ))}
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;