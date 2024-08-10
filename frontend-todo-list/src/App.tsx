import NoUserTutorial from "./pages/noUserTutorial.tsx";
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import {CookiesProvider} from "react-cookie";
import {AuthProvider} from "./hooks/useAuth.tsx";

export default function App() {
    return (
        <CookiesProvider>
            <AuthProvider>
                <BrowserRouter basename={"/"}>
                    <Routes>
                        <Route path={"/tutorial"} element={<NoUserTutorial/>}/>
                        <Route path={"/login"} element={<NoUserTutorial/>}/>
                        <Route path={"/register"} element={<NoUserTutorial/>}/>
                        <Route path={"/"} element={<ProtectedRoute/>}>
                            <Route path={"/"} element={<NoUserTutorial/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </CookiesProvider>
    )
}

