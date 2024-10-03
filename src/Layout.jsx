import React from "react";
import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Header/Sidebar";

function Layout() {
    return (
        <>
            <Navbar />
            <div className="sm:flex flex-none">
                <div className="">
                <Sidebar />
                </div>
                <div className="sm:flex-1 sm:ml-16 md:ml-44 lg:ml-56">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;