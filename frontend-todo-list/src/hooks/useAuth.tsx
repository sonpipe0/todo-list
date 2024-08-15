import React, { ReactNode, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";

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
    login: (loginInfo: LoginType) => Promise<{code: number, message: string}>;
    logout: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
                                                                    children,
                                                                }) => {
    const [cookies, setCookie, removeCookie] = useCookies([
        "token",
        "userDto",
        "tokenExpiry",
    ]);
    const [token, setToken] = useState<string | null>(cookies.token || null);
    const [userDto, setUserDto] = useState<UserDto | null>(() => {
        try {
            return cookies.userDto ? JSON.parse(decodeURIComponent(cookies.userDto)) : null;
        } catch (error) {
            console.error("Error parsing userDto cookie:", error);
            return null;
        }
    });
    const [tokenExpiry, setTokenExpiry] = useState<number | null>(
        cookies.tokenExpiry ? parseInt(cookies.tokenExpiry, 10) : null,
    );


    const login = async (loginInfo: LoginType): Promise<{code: number, message: string}> => {
        try {
            const response = await axios.post("http://localhost:3000/auth/login", loginInfo);
            const { access_token, userDto } = response.data;
            const decodedToken: JwtPayload = jwtDecode(access_token);
            const expiry = decodedToken.exp! * 1000; // Convert to milliseconds

            setToken(access_token);
            setUserDto(userDto);
            setTokenExpiry(expiry);
            setCookie("token", access_token);
            setCookie("userDto", encodeURIComponent(JSON.stringify(userDto)));
            setCookie("tokenExpiry", expiry.toString());

            return {code: 200, message: "Login successful"};
        } catch (error) {
            if (error.response.data.statusCode === 401) {
                return {code: 401, message: "Wrong Password"};
            }
            if (error.response.data.statusCode === 404) {
                return {code: 404, message: "User not found"};
            }
            return {code: 500, message: "Internal server error"};
        }
    };

    const logout = () => {
        setToken(null);
        setUserDto(null);
        setTokenExpiry(null);
        removeCookie("token");
        removeCookie("userDto");
        removeCookie("tokenExpiry");
    };

    return (
        <AuthContext.Provider
            value={{ login, logout, userDto, token, tokenExpiry }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}