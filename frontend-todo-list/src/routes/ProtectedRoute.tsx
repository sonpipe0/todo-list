import {ReactNode, useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Adjust the path if necessary

export default function ProtectedRoute(): ReactNode {
    const navigate = useNavigate();
    const { token, tokenExpiry, logout } = useAuth(); // Destructure token, tokenExpiry, and logout

    useEffect(() => {
        const currentTime = Date.now();
        if (tokenExpiry && currentTime >= tokenExpiry) {
            logout();
            navigate('/login');
        } else if (!token) {
            navigate('/login');
        }
    }, [token, tokenExpiry, navigate, logout]);

    return (
        <>
            <Outlet />
        </>
    );
}
