import { useState, FormEvent } from 'react';
import FormInput from '../form/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import Button from '../form/button';

interface FormProps {
    email_address: string;
};

const INTIAL_FORM_DATA: FormProps = {
    email_address: "",
};
const ForgotPasswordForm = () => {
    const [ formData, setFormData ] = useState<FormProps>(INTIAL_FORM_DATA);
    const navigate = useNavigate();
    const { showInfo } = useToast();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        showInfo("Feature under development.")
        setFormData(INTIAL_FORM_DATA);
    };

    return (
        <form 
            onSubmit = {(e) => handleSubmit(e) }
            className = "space-y-4" 
        >
            <h2 className = "font-bold text-2xl text-center">
                Forgot your password
            </h2>
            <FormInput 
                placeholder = "name@email.com"
                label = "Email Address"
                type = "email"
                value = { formData.email_address }
                onChange = {(e) => {
                setFormData({ 
                    ...formData, 
                    email_address: e.target.value 
                });
                }}
                name = "email_address"
                required
            />
            <Button 
                type = "submit"
                className = "bg-[#3E78BC] text-white disabled:bg-[#838d97] hover:bg-[#2a517c]"
                label = "submit"
            />
            <div className = "text-center">
                <span
                    className = "cursor-pointer hover:text-[#3E78BC]"
                    onClick = {() => navigate(-1)}
                >
                    Go back
                </span>
            </div>
        </form>
    )
}

export default ForgotPasswordForm;