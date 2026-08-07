import { createContext, useState } from "react";
import { getUser, isLoggedIn } from "../utils/auth";


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    const [user, setUser] = useState(getUser());
    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                setLoggedIn,
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};