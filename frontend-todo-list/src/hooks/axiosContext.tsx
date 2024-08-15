// context/AxiosContext.tsx
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import axios, { AxiosInstance } from "axios";
import { useAuth } from "../hooks/useAuth";

interface AxiosContextType {
	axiosInstance: AxiosInstance;
}

const AxiosContext = createContext<AxiosContextType | undefined>(undefined);

export const AxiosProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { token, tokenExpiry, logout } = useAuth();
	const axiosInstance = axios.create({
		baseURL: "http://localhost:3000",
		headers: {
			"Authorization": token ? `Bearer ${token}` : "",
		}
	});

	useEffect(() => {
		const interceptor = axiosInstance.interceptors.request.use(
			(config) => {
				const currentTime = Date.now();

				// see if page is register
				if (window.location.pathname === "/register") {
					return config;
				}

				if (token && tokenExpiry && currentTime >= tokenExpiry) {
					logout();
				} else if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}

				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);

		return () => {
			axiosInstance.interceptors.request.eject(interceptor);
		};
	}, [axiosInstance, token, tokenExpiry, logout]);

	return (
		<AxiosContext.Provider value={{ axiosInstance }}>
			{children}
		</AxiosContext.Provider>
	);
};

export const useAxios = () => {
	const context = useContext(AxiosContext);
	if (!context) {
		throw new Error("useAxios must be used within an AxiosProvider");
	}
	return context.axiosInstance;
};
