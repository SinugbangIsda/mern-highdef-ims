import { 
    ChangeEvent, 
    LegacyRef,
    ReactNode
} from 'react';

export interface Product {
    name: string;
    price: number;
    quantity: number;
    date: Date;
};

export interface Transaction {
    _id?: string;
    transaction_name: string;
    is_completed: boolean;
    payment_date: Date | null;
    products: Product[];
    total_price: number
    createdAt?: Date;
    updatedAt?: Date;
};

export interface ModalProps {
    data: any;
    isOpen?: boolean;
    operation?: string;
    isSoftDelete?: boolean;
    isLoading?: boolean;
    onClose: () => void;
    refetch: () => void;
};


export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email_address: string;
    role: string;
    is_activated: boolean | null;
};

export interface AuthState  {
    token: string | null;
    user: User | null;
};

export interface TableProps {
    data: Transaction[] | User[] | Statistics[] | Product[];
    headers: string[];
    isViewOnly?: boolean;
    title?: string;
    customTitleWithButtons?: ReactNode; 
    isFetching: boolean;
    isLoading: boolean;
    canAdd?: boolean;
    hasSearch?: boolean;
    query?: string;
    canDoubleClick?: boolean;
    isDeleted?: boolean;
    recentTransactions?: boolean;
    products?: boolean;
    onSearch?: (value: string) => void;
    onModalOpen?: () => void;
    handleModalOperation?: (value: string) => void;
    handleSelectedData?: (value: any) => void;
};

export interface FormInputProps {
    type: string;
    placeholder?: string;
    label?: string;
    value?: any;
    required?: boolean;
    name: string;
    ref?: LegacyRef<HTMLInputElement>;
    options?: string[];
    disabled?: boolean;
    labelInputFlexRow?: boolean;
    checked?: boolean;
    min?: number;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export interface Tab {
    name: string;
    table: JSX.Element;
    isAdminOnly: boolean;
};

export interface Tabs {
    tabs: Tab[];
    role: string;
};

export interface ButtonProps {
    label: string;
    type: "button" | "submit" | "reset";
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    defaultBG?: boolean;
    deleteBG?: boolean;
    updateBG?: boolean;
    onClick?: () => void;
};

export interface TableActionsProps {
    data: Transaction;
    isDeleted: boolean;
    onModalOpen: () => void;
    handleModalAction: (value: string) => void;
    handleData: (value: Transaction) => void;
};

export interface TableActionButtonProps {
    label: string;
    icon: ReactNode;
    onClick: () => void;
};

export interface Statistics {
    total: number;
    highest: number;
    average: number;
    pending: number;
    daily: DailySales[];
};

export interface DashboardStasticCardProps {
    value: number | string;
    label: string;
    icon: JSX.Element;
    className: string;
};

export interface DailySales {
    date: Date;
    total_sales: number;
}

export interface DashboardDailySalesChartProps {
    data: DailySales[];
    isLoading: boolean;
};

export interface CalendarInputProps {
    value?: Date;
    onChange: (value: any) => void;
};

export interface MenuItems {
    label: string;
    description: string;
    onClick: () => void;
};

export interface AvatarMenuItemsProps {
    firstname: string;
    lastname: string;
    email_address: string;
    menu_items: MenuItems[];
    logout: ()  => void;
};

export interface HeaderProps {
    heading: string;
};

export interface InvoiceDocumentProps {
    name: string;
    products: Product[];
    total_price: number;
};
  