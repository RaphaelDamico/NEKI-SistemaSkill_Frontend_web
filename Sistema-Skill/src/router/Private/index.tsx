import { Navigate } from "react-router-dom";
import { useAuthUser } from "../../contexts/AuthUserContext";

interface PrivateProps {
    children: JSX.Element;
};


export default function Private({ children }: PrivateProps ) {
    const token = localStorage.getItem("userToken")

    if(!token)
        return <Navigate to= "/login" />
    return children;
}