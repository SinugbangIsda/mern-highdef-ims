import { 
    useEffect, 
    useState 
} from "react";
import { transactions_table_headers } from "../../../constants";
import TransactionsModal from "../modal";
import { Transaction } from "../../../interfaces";
import Table from "../../table";
import { useGetTransactionsQuery } from "../../../redux/services/transactionsServices";

const INITIAL_MODAL_FORM_VALUES: Transaction = {
    _id: "",
    transaction_name: "",
    is_completed: false,
    payment_date: null,
    products: [],
    total_price: 0
};
const TrashedTransactions = () => {
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    const [ modalOperation, setModalOperation ] = useState<string>("");
    const [ trashedTransactionns, setTrashedTransactions ] = useState<Transaction[]>([]);
    const [ selectedData, setSelectedData ] = useState<Transaction>();
    const [ query, setQuery ] = useState<string>("");
    const [ modalFormValues, setModalFormValues ] = useState<Transaction>(INITIAL_MODAL_FORM_VALUES);
    const { 
        data, 
        refetch, 
        isFetching, 
        isLoading 
    } = useGetTransactionsQuery({ is_deleted: "true" });

    const filteredData = trashedTransactionns.filter((value: Transaction) => {
        return value.transaction_name?.toLowerCase().includes(query.toLowerCase());
    });


    useEffect(() => {
        if (data) {
            setTrashedTransactions(data);
        };
    }, [ data ])

    useEffect(() => {
        if (selectedData) {
            setModalFormValues(selectedData);
        };
    });

    useEffect(() => {
        refetch();
    }, [ refetch ]);

    return  (
        <>
            <Table 
                hasSearch
                canDoubleClick
                isDeleted
                data = { filteredData }
                headers = { transactions_table_headers }
                isFetching = { isFetching }
                isLoading = { isLoading }
                query = { query }
                onSearch = { setQuery }
                onModalOpen = {() => setModalOpen(true)}
                handleModalOperation = { setModalOperation }
                handleSelectedData = { setSelectedData }
            />
            <TransactionsModal 
                isSoftDelete = { false }
                isOpen = { modalOpen }
                onClose = {() => {
                    setModalOpen(false) 
                    setModalFormValues(INITIAL_MODAL_FORM_VALUES);
                    setModalOperation("");
                }}
                data = { modalFormValues }
                operation = { modalOperation }
                refetch  = {  refetch }
            />
        </>
    )
};

export default TrashedTransactions;