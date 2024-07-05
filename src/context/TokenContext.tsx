"use client"
import { createContext, useContext, useEffect, useState } from "react";

interface User {
    username: string;
}

interface TokenContextProps {
    isLoggedIn: boolean;
    user: User | null;
    storeTokenInLocalStorage: (token: string, user: User) => void;
    removeTokenFromLocalStorage: () => void;
}

const TokenContext = createContext<TokenContextProps | null>(null);

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");
            setIsLoggedIn(!!token);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, []);

    const storeTokenInLocalStorage = (token: string, user: User) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setIsLoggedIn(true);
            setUser(user);
        }
    };

    const removeTokenFromLocalStorage = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    return (
        <TokenContext.Provider value={{ isLoggedIn, user, storeTokenInLocalStorage, removeTokenFromLocalStorage }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error("useFetch must be used within a provider");
    }
    return context;
};
