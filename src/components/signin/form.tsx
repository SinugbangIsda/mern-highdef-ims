import { useState, FormEvent } from 'react';
import FormInput from '../form/input';
import { useSigninMutation } from '../../redux/services/authServices';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../redux/hooks';
import { setAuth } from '../../redux/slices/authSlice';
import Button from '../form/button';
import { useToast } from '../../hooks/useToast';

interface FormProps {
    email_address: string;
    password: string;
};

const INTIAL_FORM_DATA: FormProps = {
    email_address: "",
    password: "",
};
const SigninForm = () => {
    const [ formData, setFormData ] = useState<FormProps>(INTIAL_FORM_DATA);
    const [ signIn, { isLoading } ] = useSigninMutation();
    const { showError, showSuccess } = useToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const userData = await signIn(formData).unwrap();
            const token = userData.token;
            const user = userData.user;
            if (token && user) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                showSuccess("Sign in successful!");
                dispatch(setAuth(userData));
                setFormData(INTIAL_FORM_DATA);
                navigate("/");
            };
        } catch(error: any) {
            showError(error?.data.message);
        };
    };

    return (
        <form 
            onSubmit = {(e) => handleSubmit(e) }
            className = "space-y-4"
        >
            <h2 className = "font-semibold text-2xl text-center">
                Signin to your account
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
            <div className = "flex flex-row justify-between items-center gap-10">
                <div className = "flex flex-row items-center gap-2">
                    <input 
                        type = "checkbox" 
                        className = "checkbox" 
                    />
                    <span>
                        Remember me
                    </span>
                </div>
                <span
                    className = "text-right cursor-pointer hover:text-[#3E78BC]"
                    onClick = {() => navigate("/forgotpassword")}
                >
                    Forgot Password?
                </span>
            </div>
            <Button 
                type =  "submit"
                label = "Sign in"
                defaultBG
                isLoading  = { isLoading }
                disabled = { isLoading }
            />
            <div className = "text-center">
                <span>
                    Don't have an account yet? <span className = "hover:text-[#3E78BC] cursor-pointer" onClick = {() => navigate("/signup")}>Sign up</span>
                </span>
            </div>
        </form>
    )
}

export default SigninForm;