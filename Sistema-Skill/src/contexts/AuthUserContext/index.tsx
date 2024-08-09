import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


interface AuthUserContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const AuthUserContext = createContext<AuthUserContextProps | undefined>(undefined);

export const AuthUserProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    return(
        <AuthUserContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            username,
            setUsername,
            password,
            setPassword,
            loading,
            setLoading
        }}>
            { children }
        </AuthUserContext.Provider>
    );
};

export const useAuthUser =(): AuthUserContextProps => {
    const context = useContext(AuthUserContext);
    if(!context)
        throw new Error("useAuthUser deve ser usado com um AuthUserProvider");
    return context;
};