import { toast } from "react-toast";

export const useToast = () => {
    const showSuccess = (value: string) => toast.success(value); 
    const showError = (value: string ) => toast.error(value); 
    const showInfo = (value: string) => toast.info(value); 
    const showWarning = (value: string) => toast.warn(value);

    return { 
        showSuccess,
        showError,
        showInfo,
        showWarning
    } as const;
};