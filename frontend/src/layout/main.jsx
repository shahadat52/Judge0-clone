import { Outlet } from "react-router-dom";
import Navbar from "../pages/navbar";

const Main = () => {
    return (
        <div className="relative">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Main;