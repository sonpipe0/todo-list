import React, { ReactNode, useState } from "react";
import { useCookies } from "react-cookie";
import {jwtDecode, JwtPayload} from 'jwt-decode';
import axiosInstance from '../axiosInstance.ts'; // Adjust the path if necessary

export type LoginType = {
    username: string;
    password: string;
};

export type UserDto = {
    userId: string;
    username: string;
    name: string;
    lastname: string;
};

export type AuthContextType = {
    tokenExpiry: number | null;
    userDto: UserDto | null;
    token: string | null;
    login: (loginInfo: LoginType) => void;
    logout: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'userDto', 'tokenExpiry']);
    const [token, setToken] = useState<string | null>(cookies.token || null);
    const [userDto, setUserDto] = useState<UserDto | null>(cookies.userDto ? JSON.parse(cookies.userDto) : null);
    const [tokenExpiry, setTokenExpiry] = useState<number | null>(cookies.tokenExpiry ? parseInt(cookies.tokenExpiry, 10) : null);

    const login = (loginInfo: LoginType) => {
        axiosInstance.post('/login', loginInfo)
            .then((response: { data: { token: string; userDto: UserDto; }; }) => {
                const { token, userDto } = response.data;
                const decodedToken: JwtPayload = jwtDecode(token);
                const expiry = decodedToken.exp! * 1000; // Convert to milliseconds

                setToken(token);
                setUserDto(userDto);
                setTokenExpiry(expiry);
                setCookie('token', token);
                setCookie('userDto', JSON.stringify(userDto));
                setCookie('tokenExpiry', expiry.toString());
            })
            .catch(error => {
                console.error("Login failed:", error);
            });
    };

    const logout = () => {
        setToken(null);
        setUserDto(null);
        setTokenExpiry(null);
        removeCookie('token');
        removeCookie('userDto');
        removeCookie('tokenExpiry');
    };

    return (
        <AuthContext.Provider value={{ login, logout, userDto, token, tokenExpiry }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
