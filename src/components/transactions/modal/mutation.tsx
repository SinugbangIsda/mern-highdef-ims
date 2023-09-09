import { 
    useState, 
    useEffect,
    FormEvent 
} from  "react";
import { useToast } from "../../../hooks/useToast";
import { 
    ModalProps,
    Product,
    Transaction
} from "../../../interfaces";
import { 
    useCreateTransactionMutation, 
    useUpdateTransactionMutation 
} from "../../../redux/services/transactionsServices";
import FormInput from "../../form/input";
import Button from "../../form/button";
import CalendarInput from "../../form/calendar";

const INITIAL_FORM_VALUES: Transaction = {
    _id: "",
    transaction_name: "",
    is_completed: false,
    payment_date: null,
    products: [],
    total_price: 0
};

const TransactionsMutationModal = ({
    data,
    operation,
    onClose,
    refetch
}: ModalProps) => {
    const [ formValues, setFormValues ] = useState<Transaction>(INITIAL_FORM_VALUES);
    const [ add, { isLoading: addIsLoading }] = useCreateTransactionMutation();
    const [ update, { isLoading: updateIsLoading } ] = useUpdateTransactionMutation();
    const { showSuccess, showError } = useToast();

    const handleAddProduct = () => {
        const newProduct: Product = { name: "", price: 0, quantity: 0, date: new Date()};
        setFormValues({
          ...formValues,
          products: [...(formValues.products || []), newProduct]
        });
    };

    const handleProductChange = (index: number, updatedProduct: Product) => {
        const updatedProducts = [...(formValues.products || [])];
        updatedProducts[index] = updatedProduct;
        setFormValues({ ...formValues, products: updatedProducts });
    };

    const removeProduct = (index: number) => {
        const updatedProducts = [...(formValues.products || [])];
        updatedProducts.splice(index, 1);
        setFormValues({ ...formValues, products: updatedProducts });
    };

    const handleAddTransaction = async () => {
        try {
            await add({
                transaction_name: formValues.transaction_name,
                is_completed: formValues.is_completed,
                products: formValues.products,
                total_price: formValues.total_price,
                payment_date: formValues.is_completed ? formValues.payment_date : null
            })
            .unwrap()
            .then(() => refetch());
            showSuccess("Transaction Added.")
            setFormValues(INITIAL_FORM_VALUES);
            onClose();
        } catch (err: any) {
            showError(err?.data.message);
        };
    };
    
    const handleUpdateTransaction = async () => {
        try  {
            await update({
                ...formValues,
                payment_date: formValues.is_completed ? formValues.payment_date : null
            })
            .unwrap()
            .then(() => refetch());
            showSuccess("Transaction Updated.")
            setFormValues(INITIAL_FORM_VALUES);
            onClose();
        } catch (err: any) {
            showError(err?.data.message);
        };
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (formValues.products.length === 0) {
            showError("Please add a product.")
        } else  {
            switch (operation) {
                case "Add":
                    await handleAddTransaction();
                    break;
                case "Update":
                    await handleUpdateTransaction();
                    break;
                default:
                    break;
            };
        };
    };

    useEffect(() => {
        const products = formValues.products || [];
        const totalPrice = products.reduce((total: number, product: Product) => total + (product.price || 0) * product.quantity, 0);
        setFormValues({ ...formValues, total_price: totalPrice });
    }, [ formValues.products, formValues.total_price ]);
    
    useEffect(() => {
        setFormValues(data);
    }, [ data ]);

    return (
        <form 
            onSubmit = {(e) => handleSubmit(e)}
            className = "space-y-5"
        >
            <FormInput 
                type =  "text"
                name = "transaction_name"
                placeholder = "Name"
                label = "Transaction Name"
                required
                value = { formValues.transaction_name }
                onChange = {(e) => {
                    setFormValues({
                        ...formValues,
                        transaction_name: e.target.value
                    });
                }}
            />
            <div className = "flex flex-col space-y-4">
                <div className = "flex flex-row justify-between items-center gap-4">
                    <span className = "text-[#485467] dark:text-inherit font-semibold">
                        Payment Status
                    </span>
                    <div className = "w-42">
                        <Button 
                            type = "button"
                            label = { formValues.is_completed ? "Mark as pending" :  "Mark as completed"}
                            defaultBG = { formValues.is_completed ? false : true}
                            deleteBG = { formValues.is_completed ? true : false }
                            onClick = {() => {
                                setFormValues({
                                    ...formValues,
                                    is_completed: formValues.is_completed ? false : true,
                                    payment_date: formValues.is_completed ? null : new Date()
                                });
                            }}
                        />
                    </div>
                </div>
                { formValues.is_completed && (
                    <CalendarInput
                        value = { formValues.payment_date! }
                        onChange = {(date: Date) => {
                            const currentDate = new Date();
                            const newDate = new Date(date);

                            newDate.setHours(currentDate.getHours());
                            newDate.setMinutes(currentDate.getMinutes());
                            newDate.setSeconds(currentDate.getSeconds());
                        
                            setFormValues({
                              ...formValues,
                              payment_date: newDate,
                            });
                          }}
                    />
                )}
            </div>
            <div className  = "space-y-5">
                <span className = "text-lg text-[#485467] dark:text-inherit font-semibold mb-2">
                    Products:
                </span>
                { formValues.products &&
                    formValues.products.map((product: Product, index: number) => (
                        <div 
                            key = { index } 
                            className = "space-y-4"
                        >
                            <FormInput 
                                type = "select"
                                name = { `products[${index}].name` }
                                label = "Product Name"
                                placeholder = "product"
                                options = {[ "EARTHFILL", "COARSE SAND", "ITEM 201", "BOULDERS"]}
                                value = { product.name }
                                required
                                onChange = {(e) => {
                                    const updatedProduct = { ...product, name: e.target.value };
                                    handleProductChange(index, updatedProduct);
                                }}
                            />
                            <FormInput 
                                type = "text"
                                name = { `products[${index}].price` }
                                label = "Product Price"
                                placeholder = "0"
                                min = { 0 }
                                value = { isNaN(product.price) ? 0 : product.price }
                                required
                                onChange = {(e) => {
                                    const updatedProduct = { ...product, price: parseFloat(e.target.value) };
                                    handleProductChange(index, updatedProduct);
                                }}
                            />
                            <FormInput 
                                type = "text"
                                name = { `products[${index}].quantity` }
                                label = "Product Quantity"
                                placeholder = "1"
                                min = { 1 }
                                value = { isNaN(product.quantity) ? 0 : product.quantity }
                                required
                                onChange = {(e) => {
                                    const updatedProduct = { ...product, quantity: parseFloat(e.target.value) };
                                    handleProductChange(index, updatedProduct);
                                }}
                            />
                            <div>
                                <div className = "flex flex-row items-center gap-1.5">
                                    <span className = "text-[#485467] dark:text-inherit font-semibold">
                                        Date Issued
                                    </span>
                                    <span className = "text-[#E53E3F]">
                                        *
                                    </span>
                                </div>
                                <CalendarInput
                                    value = { product.date }
                                    onChange = {(date: Date) => {
                                        const updatedProduct = { ...product, date: date }
                                        handleProductChange(index, updatedProduct);
                                    }}
                                />
                            </div>
                            <div className = "flex flex-row justify-start">
                                <div  className = "w-44">
                                <Button 
                                    type = "button"
                                    label = "Remove"
                                    deleteBG
                                    onClick =  {() => removeProduct(index) }
                                />
                                </div>
                            </div>
                        </div>
                    )
                )}
                <div>
                    <span
                        className  = "text-[#3E78BC] hover:text-[#23476f] cursor-pointer"
                        onClick = { handleAddProduct }
                    >
                        + Add Product
                    </span>
                </div>
            </div>
            <Button  
                type = "submit"
                label  = { operation! }
                defaultBG = { operation === "Add" ? true :  false }
                updateBG = { operation === "Update" ? true : false }
                disabled = { addIsLoading || updateIsLoading }
                isLoading = { addIsLoading || updateIsLoading }
            />
        </form>
    )
};

export default TransactionsMutationModal;