import { 
    useEffect, 
    useState 
} from "react";
import { transactions_table_headers } from "../../../constants";
import { Transaction } from "../../../interfaces";
import Table from "../../table";
import TransactionsModal from "../modal";
import { useGetTransactionsQuery } from "../../../redux/services/transactionsServices";

const INITIAL_MODAL_FORM_VALUES: Transaction = {
    _id: "",
    transaction_name: "",
    is_completed: false,
    payment_date: null,
    products: [],
    total_price: 0
};

const CompletedTransactions = () => {
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    const [ modalOperation, setModalOperation ] = useState<string>("");
    const [ transactions, setTransactions ] = useState<Transaction[]>([]);
    const [ selectedData, setSelectedData ] = useState<Transaction>();
    const [ modalFormValues, setModalFormValues ] = useState<Transaction>(INITIAL_MODAL_FORM_VALUES);
    const [ query, setQuery ] = useState<string>("");
    const { 
        data, 
        isFetching, 
        isLoading,
        refetch, 
    } = useGetTransactionsQuery({ is_deleted: "false", is_completed: "true" });

    const filteredData = transactions.filter((value: Transaction) => {
        return value.transaction_name?.toLowerCase().includes(query.toLowerCase());
    });


    useEffect(() => {
        if (data) {
            setTransactions(data);
        };
    }, [ data ])

    useEffect(() => {
        if (selectedData && modalOperation !== "Add") {
            setModalFormValues(selectedData);
        };
    });

    useEffect(() => {
        if (modalOperation === "Add" || modalOperation === "") {
            setModalFormValues(INITIAL_MODAL_FORM_VALUES);
        };
    });

    useEffect(() => {
        refetch();
    }, [ refetch ]);

    return  (
        <>
            <Table 
                data = { filteredData }
                headers = { transactions_table_headers }
                isFetching = { isFetching }
                isLoading = { isLoading }
                canAdd
                canDoubleClick
                hasSearch
                query = { query }
                onSearch = { setQuery }
                onModalOpen = {() => setModalOpen(true)}
                handleModalOperation = { setModalOperation }
                handleSelectedData = { setSelectedData }
            />
            <TransactionsModal 
                isOpen = { modalOpen }
                onClose = {() => {
                    setModalOpen(false);
                    setModalOperation("");
                    setModalFormValues(INITIAL_MODAL_FORM_VALUES);
                }}
                data = { modalFormValues }
                operation = { modalOperation }
                refetch  = {  refetch }
                isSoftDelete
            />
        </>
    )
};

export default CompletedTransactions;