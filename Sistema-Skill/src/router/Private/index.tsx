import { Navigate } from "react-router-dom";
import { useAuthUser } from "../../contexts/AuthUserContext";

interface PrivateProps {
    children: JSX.Element;
};


export default function Private({ children }: PrivateProps ) {
    const { isAuthenticated, loading } =useAuthUser();

    if(loading) {
        return(
            <div></div>
        );
    }
    if(!isAuthenticated) {
        return <Navigate to= "/login" />
    }
    return children;
}