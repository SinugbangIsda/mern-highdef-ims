import React, { ReactNode, useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleTheme } from '../../redux/slices/themeSlice';

interface ProviderProps {
    children: ReactNode;
};

const ThemeProvider = ({ children }: ProviderProps) => {
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

    const fetchTheme = useCallback(() => {
        dispatch(toggleTheme());
        const root = window.document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
      }, [ dispatch, theme ]);

    useEffect(()=> {
        fetchTheme();
    }, [ fetchTheme ]);

    return (
        <>
            { children }
        </>
    )
}

export default ThemeProvider;