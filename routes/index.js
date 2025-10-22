import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import AppRoutes from "./app.routes";
import Splash from "../pages/Splash";
import Pin from "../pages/Pin";

export default function Routes() {
    const { loading, isAuthenticated } = useContext(AppContext);

    if (loading) return <Splash />;
    if (!isAuthenticated) return <Pin />;

    return <AppRoutes />;
}
