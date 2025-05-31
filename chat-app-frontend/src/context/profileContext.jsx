import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import axios from "axios";
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const {isAuthenticated} = useAuth();
    const [userDetails ,setUserDetails] = useState(null);

    useEffect(() =>{
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get("/api/user/profile");
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (isAuthenticated) {
            fetchUserDetails();
        }
    },[isAuthenticated])

    return(
        <ProfileContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => {
    return useContext(ProfileContext);
}