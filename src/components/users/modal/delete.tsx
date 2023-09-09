import { useToast } from "../../../hooks/useToast";
import { ModalProps, User } from "../../../interfaces";
import { useDeleteUserMutation } from "../../../redux/services/usersServices";
import Button from "../../form/button";

const UsersDeleteModal = ({
    data,
    onClose,
    refetch
}: ModalProps) => {
    const { _id } = data as User;
    const [ deleteUser, { isLoading } ] = useDeleteUserMutation();
    const { 
        showSuccess, 
        showError 
    } = useToast();

    const handleDelete = async () => {
        try  {
            await deleteUser({ _id: _id })
            .unwrap()
            .then(() => refetch());
            onClose();
            showSuccess("Transaction Deleted.")
        } catch (err: any) {
            showError(err?.data.message);
        };
    };

    const handleSubmit = () => {
        handleDelete();
    };
    
    return (
        <div className = "h-full w-full flex flex-col justify-between space-y-10">
            <div className = "">
                <span>
                    Are you fucking sure?
                </span>
            </div>
            <div className = "flex flex-row justify-end items-center gap-2">
                <div className = "w-36">
                    <Button 
                        type = "button"
                        label = "Delete"
                        disabled = { isLoading }
                        onClick = { handleSubmit }
                        deleteBG
                        className = "w-36"
                    />
                </div>
                <div className = "w-36">
                    <Button 
                        type = "button"
                        label = "Cancel"
                        onClick = { onClose }
                        className = "w-36"
                    />
                </div>
            </div>
        </div>
    )
};

export default UsersDeleteModal;