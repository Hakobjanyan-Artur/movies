import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

function HomeWrapper() {
    
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default HomeWrapper