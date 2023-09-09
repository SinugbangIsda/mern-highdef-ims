import { toast } from "react-hot-toast";

export const useToast = () => {
    const showSuccess = (value: string) => {
        toast(value, {
            duration: 4000,
            style: {
                backgroundColor: "#3AB35B",
                color: "white"
            }
        });
    };
    
    const showError = (value: string) => {
        toast(value, {
            duration: 4000,
            style: {
                backgroundColor: "#F44544",
                color: "white"
            }
        });
    };

    const showInfo = (value: string) => {
        toast(value, {
            duration: 4000,
            style: {
                backgroundColor: "#3887FE",
                color: "white"
            }
        });
    };
    
    const showWarning = (value: string) => {
        toast(value, {
            duration: 4000,
            style: {
                backgroundColor: "#FFAC2F",
                color: "white"
            }
        });
    };

    return {
        showSuccess,
        showError,
        showInfo,
        showWarning
    };
};