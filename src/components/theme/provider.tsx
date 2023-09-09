import { ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setTheme } from '../../redux/slices/themeSlice';

interface ProviderProps {
    children: ReactNode;
};

const ThemeProvider = ({ children }: ProviderProps) => {
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();
    const root = window.document.documentElement;
    
    const fetchTheme = () => {
        if (!theme) {
            dispatch(setTheme("dark"));
        }
    };

    const toggleTheme = () => {
        if (theme === "dark") {
            root.classList.toggle("dark", true);
        } else {
            root.classList.remove("dark");
        }
    };


    useEffect(() => {
        fetchTheme();
        toggleTheme();
    }, [  fetchTheme, toggleTheme ]);

    return (
        <>
            { children }
        </>
    )
}

export default ThemeProvider;