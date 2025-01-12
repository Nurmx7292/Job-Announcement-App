import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />

            <main className="px-4 sm:px-[5vm] md:px-[7vm] lg:px-[9vw] flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};
