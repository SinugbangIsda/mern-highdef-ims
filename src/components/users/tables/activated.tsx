import { 
    useEffect, 
    useState 
} from 'react';
import { users_table_headers } from '../../../constants';
import UsersModal from '../modal';
import { User } from '../../../interfaces';
import Table from '../../table';
import { useGetUsersQuery } from '../../../redux/services/usersServices';

const INITIAL_MODAL_FORM_VALUES: User = {
    _id: "",
    firstname: "",
    lastname: "",
    email_address: "",
    role: "",
    is_activated: null
};

const ActivatedUsers = () => {
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    const [ modalOperation, setModalOperation ] = useState<string>("");
    const [ users, setUsers ] = useState<User[]>([]);
    const [ selectedData, setSelectedData ] = useState<User>();
    const [ modalFormValues, setModalFormValues ] = useState<User>(INITIAL_MODAL_FORM_VALUES);
    const [ query, setQuery ] = useState<string>("");
    const { 
        data,
        refetch,
        isFetching,
        isLoading
    } = useGetUsersQuery({ is_activated: true });

    const filteredData = users.filter((value: User) => {
        return value.email_address?.toLowerCase().includes(query.toLowerCase()) || 
            value.firstname?.toLowerCase().includes(query.toLowerCase()) ||  
            value.lastname?.toLowerCase().includes(query.toLowerCase());
    });

    useEffect(() => {
        if (data) {
            setUsers(data);
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
    
    return (
        <>
            <Table 
                data = { filteredData }
                headers = { users_table_headers }
                isFetching = { isFetching }
                isLoading = { isLoading }
                hasSearch
                query = { query }
                onSearch = { setQuery }
                onModalOpen = {() => setModalOpen(true)}
                handleModalOperation = { setModalOperation }
                handleSelectedData = { setSelectedData }
            />
            <UsersModal 
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

export default ActivatedUsers;