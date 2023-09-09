import {
    useState,
    useEffect,
    FormEvent
} from "react";
import { 
    ModalProps, 
    User 
} from "../../../interfaces";
import { useUpdateUserMutation } from "../../../redux/services/usersServices";
import { useToast } from "../../../hooks/useToast";
import Button from "../../form/button";
import FormInput from "../../form/input";

const INITIAL_FORM_VALUES: User = {
    _id: "",
    firstname: "",
    lastname: "",
    email_address: "",
    role: "",
    is_activated: null
};

const UsersMutationModal = ({
    data,
    operation,
    onClose,
    refetch
}: ModalProps) => {
    const [ formValues, setFormValues ] = useState<User>(INITIAL_FORM_VALUES);
    const [ update, { isLoading } ] = useUpdateUserMutation();
    
    const {
        showSuccess, 
        showError 
    } = useToast();

    useEffect(() => {
        setFormValues(data);
    }, [ data ]);

    const handleUpdate = async () => {
        try {
            await update(formValues)
            .unwrap()
            .then(() => refetch());
            showSuccess("User Updated.");
            setFormValues(INITIAL_FORM_VALUES);
            onClose();
        } catch (err: any) {
            showError(err?.data.message)
        };
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleUpdate();
    };

    return(
        <form 
            onSubmit = {(e) => handleSubmit(e)}
            className = "space-y-5"
        >
            <FormInput 
                type =  "text"
                name = "firstname"
                placeholder = "John"
                label = "First Name"
                required
                value = { formValues.firstname }
                onChange = {(e) => {
                    setFormValues({
                        ...formValues,
                        firstname: e.target.value
                    });
                }}
                disabled
            />
            <FormInput 
                type =  "text"
                name = "lastname"
                placeholder = "Doe"
                label = "Last Name"
                required
                value = { formValues.lastname }
                onChange = {(e) => {
                    setFormValues({
                        ...formValues,
                        lastname: e.target.value
                    });
                }}
                disabled
            />
            <FormInput 
                type =  "text"
                name = "email_address"
                placeholder = "name@company.com"
                label = "Email Address"
                required
                value = { formValues.email_address }
                onChange = {(e) => {
                    setFormValues({
                        ...formValues,
                        email_address: e.target.value
                    });
                }}
                disabled
            />
            <FormInput 
                type =  "select"
                name = "role"
                placeholder = "Role"
                label = "Role"
                required
                value = { formValues.role }
                options = {["User", "Admin"]}
                onChange = {(e) => {
                    setFormValues({
                        ...formValues,
                        role: e.target.value
                    });
                }}
            />
            {(data?.role === "User" || !formValues.is_activated) && (
                <div className = "flex flex-row justify-between items-center">
                    <span>
                        Activate User
                    </span>
                    <div className ="w-44">
                        <Button 
                            type = "button"
                            label = { formValues.is_activated ? "Deactivate" : "Activate"}
                            onClick = {() => {
                                setFormValues({
                                    ...formValues,
                                    is_activated: formValues.is_activated ? false : true
                                })
                            }}
                            defaultBG = { formValues.is_activated ? false : true }
                            deleteBG = { formValues.is_activated ? true : false }
                        />
                    </div>
                </div>
            )}
            <Button  
                type = "submit"
                label  = { operation! }
                updateBG
                disabled = { isLoading }
                isLoading = { isLoading }
            />
        </form>
    )
};

export default UsersMutationModal;