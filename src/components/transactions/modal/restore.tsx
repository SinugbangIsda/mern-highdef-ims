import { useToast } from "../../../hooks/useToast";
import { ModalProps, Transaction } from "../../../interfaces";
import { useUpdateTransactionMutation } from "../../../redux/services/transactionsServices";
import Button from "../../form/button";

const TransaactionsRestoreModal = ({
    data,
    onClose,
    refetch
}: ModalProps) => {
    const [ restore, { isLoading } ] = useUpdateTransactionMutation({});
    const { _id } = data as Transaction;
    const { 
        showSuccess, 
        showError 
    } = useToast();
    const handleRestore = async () => {
        try  {
            await restore({
                _id: _id,
                is_deleted: false
            })
            .unwrap()
            .then(() => refetch());
            onClose();
            showSuccess("Transaction restored.");
        } catch (err: any) {
            showError(err?.data.message);
        };
    };

    const handleSubmit = async () => {
        await handleRestore();
    };

    return  (
        <div className = "h-full w-full flex flex-col justify-between space-y-10">
            <div className = "mt-5">
                <span>
                    Are you sure you want to restore this transaction? 
                </span>
            </div>
            <div className = "flex flex-row justify-end items-center gap-2">
                <div className = "w-32">
                    <Button 
                        type = "button"
                        label = "Restore"
                        disabled = { isLoading }
                        onClick = { handleSubmit }
                        defaultBG
                    />
                </div>
                <div className = "w-32">
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

export default TransaactionsRestoreModal;