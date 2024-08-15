import './index.css'
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import {CookiesProvider} from "react-cookie";
import {AuthProvider} from "./hooks/useAuth.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import {AxiosProvider} from "./hooks/axiosContext.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Dashboard from "./pages/dashboard.tsx";


export default function App() {
    return (
            <CookiesProvider>
                <AuthProvider>
                    <AxiosProvider>
                        <Routes>
                            <Route path={"/login"} element={<LoginPage/>}/>
                            <Route path={"/register"} element={<RegisterPage/>}/>
                            <Route path={"/"} element={<ProtectedRoute/>}>
                                <Route path={"/"} element={<Dashboard/>}/>
                            </Route>
                        </Routes>
                    </AxiosProvider>
                </AuthProvider>
            </CookiesProvider>
    )
}

