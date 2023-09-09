import { ModalProps, Transaction } from "../../../interfaces";
import { 
    useDeleteTransactionMutation,
    useUpdateTransactionMutation
} from "../../../redux/services/transactionsServices";
import { useToast } from "../../../hooks/useToast";
import Button from "../../form/button";

const TransactionsDeleteModal = ({
    data,
    isSoftDelete,
    onClose,
    refetch
}: ModalProps) => {
    const { _id } = data as Transaction;
    const [ softDelete, { isLoading: softDeleteIsLoading } ] = useUpdateTransactionMutation();
    const  [ hardDelete, { isLoading: hardDeleteIsLoading } ]  = useDeleteTransactionMutation();
    const { 
        showSuccess, 
        showError 
    } = useToast();

    const handleSoftDelete = async () => {
        try  {
            await softDelete({
                _id: _id,
                is_deleted: true
            })
            .unwrap()
            .then(() => refetch());
            onClose();
            showSuccess("Transaction Deleted.");
        } catch (err: any) {
            showError(err?.data.message);
        };
    };

    const handleHardDelete = async () => {
        try  {
            await hardDelete({ _id: _id })
            .unwrap()
            .then(() => refetch());
            onClose();
            showSuccess("Transaction Deleted.");
        } catch (err: any) {
            showError(err?.data.message);
        };
    };

    const handleSubmit = async () => {
       switch (isSoftDelete) {
            case true:
                await handleSoftDelete();
                break;
            case false:
                await handleHardDelete();
                break;
            default:
                break;
        };
    };

    return (
        <div className = "h-full w-full flex flex-col justify-between space-y-10">
            <div className = "">
                <span>
                    Are you sure you want to delete this transaction? { isSoftDelete ? "If you accidentally delete this transaction and need to reverse it, please contact an administrator.": "Action cannot be undone."}
                </span>
            </div>
            <div className = "flex flex-row justify-end items-center gap-2">
                <div className = "w-36">
                    <Button 
                        type = "button"
                        label = "Delete"
                        disabled = { softDeleteIsLoading || hardDeleteIsLoading }
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

export default TransactionsDeleteModal;