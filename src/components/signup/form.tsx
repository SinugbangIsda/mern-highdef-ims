import { useState, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from '../../redux/services/authServices';
import Button from '../form/button';
import { useToast } from '../../hooks/useToast';
import FormInput from '../form/input';

interface FormProps {
    email_address: string;
    firstname: string;
    lastname: string;
    password: string;
    confirm_password: string;
};

const INTIAL_FORM_DATA: FormProps = {
    email_address: "",
    firstname: "",
    lastname: "",
    password: "",
    confirm_password: ""
};
const SignupForm = () => {
    const [ formData, setFormData ] = useState<FormProps>(INTIAL_FORM_DATA);
    const [ signup, { isLoading }] = useSignupMutation();
    const { showError, showSuccess } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            showError("Passwords do not match!");
        } else {
            try {
                await signup(formData).unwrap();
                showSuccess("Account created!")
                setFormData(INTIAL_FORM_DATA);
                navigate("/signin");
            } catch(error: any) {
                showError(error?.data.message);
            };
        };
    };

    return (
        <form 
            onSubmit = {(e) => handleSubmit(e) }
            className = "space-y-4"
        >
            <h2 className = "font-semibold text-2xl text-center text-[#2C2E39] dark:text-white">
                Create an account
            </h2>
            <div className = "flex flex-col sm:flex-row gap-4 w-full">
                <FormInput 
                    placeholder = "John"
                    label = "First Name"
                    type = "text"
                    value = { formData.firstname }
                    onChange = {(e) => {
                        setFormData({ 
                            ...formData, 
                            firstname: e.target.value 
                        });
                    }}
                    name = "firstname"
                    required
                />
                <FormInput 
                    placeholder = "Doe"
                    label = "Last Name"
                    type = "text"
                    value = { formData.lastname }
                    onChange = {(e) => {
                        setFormData({ 
                            ...formData, 
                            lastname: e.target.value 
                        });
                    }}
                    name = "lastname"
                    required
                />
            </div>
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
            <FormInput 
                placeholder = "********"
                label = "Password"
                type = "password"
                value = { formData.password }
                onChange = {(e) => {
                    setFormData({ 
                        ...formData, 
                        password: e.target.value 
                    });
                }}
                name = "password"
                required
            />
            <FormInput 
                placeholder = "********"
                label = "Confirm Password"
                type = "password"
                value = { formData.confirm_password }
                onChange = {(e) => {
                    setFormData({ 
                        ...formData, 
                        confirm_password: e.target.value 
                    });
                }}
                name = "password"
                required
            />
            <Button 
                type =  "submit"
                label = "Sign up"
                defaultBG
                isLoading  = { isLoading }
                disabled = { isLoading }
            />
            <div className = "text-center">
                <span className = "text-[#A2ABAE] dark:text-[#8792A6]">
                    Already have an account? <span className = "hover:text-[#3E78BC] cursor-pointer" onClick = {() => navigate("/signin")}>Sign in</span>
                </span>
            </div>
        </form>
    )
}

export default SignupForm;