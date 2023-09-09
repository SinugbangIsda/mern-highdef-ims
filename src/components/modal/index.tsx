import { ReactNode, useEffect } from "react";

interface ModalProps {
    children: ReactNode;
    open: boolean;
    operation: string;
    route: string;
    onClose: () => void;
};

const Modal = ({ 
    children,
    open,
    operation,
    route,
    onClose
}: ModalProps) => {
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        };
    };
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [ handleKeyPress ]);

    return (
        <div className = {`modal ${open ? "modal-open" : ""}  transition-none -top-6 backdrop-blur-0`}>
            <div className = {`modal-box bg-white dark:bg-[#1D232A] p-10 transition-none  ${(operation === "Add" || operation === "Update") ? "h-[30.5rem]": "h-auto"} space-y-4`}>
                <button 
                    onClick = { onClose }
                    className = "btn btn-sm btn-circle btn-ghost absolute right-6 top-4"
                >
                    ✕
                </button>
                <h3 className =  "text-center font-bold uppercase text-xl text-[#383A45] dark:text-white">
                    { operation } { route } 
                </h3>
                <div className = "overflow-y-10">
                { children }
                </div>
            </div>
        </div>
    )
};

export default Modal;