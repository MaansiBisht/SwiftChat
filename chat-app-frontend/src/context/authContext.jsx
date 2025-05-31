import Cookies from "js-cookie";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setAuthenticated = (value) => {
        setIsAuthenticated(value);
    };
    const checkAuth = () => {
        const token = Cookies.get("authToken");
        console.log("Checking authentication...");
        if (token) {
            console.log("User is authenticated");
            setIsAuthenticated(true);
        } else {
            console.log("User is not authenticated");
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        Cookies.remove("authToken");
        setIsAuthenticated(false);
    };
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setAuthenticated, checkAuth, logout }}
        >
            {children}
        </AuthContext.Provider >
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};