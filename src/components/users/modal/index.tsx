import { ModalProps } from "../../../interfaces";
import Modal from "../../modal";
import UsersDeleteModal from "./delete";
import UsersMutationModal from "./mutation";

const UsersModal = ({
    data,
    isOpen,
    operation,
    onClose,
    refetch
}: ModalProps) => {
    return (
        <Modal
            open = { isOpen! }
            onClose = { onClose }
            operation = { operation! }
            route = "User"
        >
            { operation === "Delete" ? 
                <UsersDeleteModal 
                    data =  { data }
                    onClose = { onClose }
                    refetch = { refetch }
                    operation = { operation }

                />
            :
                <UsersMutationModal  
                    data =  { data }
                    onClose = { onClose }
                    refetch = { refetch }
                    operation = { operation }
                />
            }
        </Modal>
    )
};

export default UsersModal;