import { ModalProps } from "../../../interfaces";
import Modal from "../../modal";
import TransactionsDeleteModal from "./delete";
import TransactionsMutationModal from "./mutation";
import TransaactionsRestoreModal from "./restore";

const TransactionsModal = ({
    data,
    isOpen,
    operation,
    isLoading,
    isSoftDelete,
    onClose,
    refetch
}:  ModalProps) => {
    return (
        <Modal
            open = { isOpen! }
            onClose = { onClose }
            operation = { operation! }
            route = "Transaction"
        >
            {(operation === "Add" || operation  === "Update") && (
                <TransactionsMutationModal  
                    data = { data }
                    isLoading = { isLoading }
                    operation = { operation }
                    refetch  = {  refetch }
                    onClose = { onClose }
                />
            )}
            { operation === "Restore" && (
                <TransaactionsRestoreModal 
                    data = { data }
                    isLoading = { isLoading }
                    onClose = { onClose }
                    refetch = { refetch }
                />
            )}
            
            { operation === "Delete" && (
                <TransactionsDeleteModal 
                    data = { data }
                    isLoading = { isLoading }
                    isSoftDelete = { isSoftDelete }
                    onClose = { onClose }
                    refetch = { refetch }
                />
            )}
        </Modal>
    )
};

export default TransactionsModal;