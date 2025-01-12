import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiDevToLogoFill } from "react-icons/pi";

export const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    return (
        <div>
            <div className="flex justify-between items-center bg-purple-800 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-4">
                <PiDevToLogoFill className="size-20" />

                <button className="sm:hidden text-white text-2xl" onClick={toggleMenu}>
                    &#9776;
                </button>

                <ul className="hidden sm:flex gap-5">
                    <li>
                        <Link to="/post" className="p-5 text-white hover:underline">
                            Post a job
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="p-5 text-white hover:underline">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/sign-in"
                            className="p-5 bg-black bg-opacity-60 text-white rounded-lg hover:bg-opacity-80"
                        >
                            Sign in
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="p-5 bg-black bg-opacity-60 text-white rounded-lg hover:bg-opacity-80"
                        >
                            Log in
                        </Link>
                    </li>
                </ul>
            </div>

            <div
                className={`sm:hidden fixed inset-0 bg-black bg-opacity-70 z-50 transition-all ${
                    menuOpen ? "block" : "hidden"
                }`}
                onClick={() => setMenuOpen(false)}
            >
                <ul className="flex flex-col items-center justify-center h-full text-white space-y-4">
                    <li>
                        <Link to="/post" className="p-5 text-white hover:underline" onClick={() => setMenuOpen(false)}>
                            Post a job
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="p-5 text-white hover:underline" onClick={() => setMenuOpen(false)}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/sign-in"
                            className="p-5 text-white hover:underline"
                            onClick={() => setMenuOpen(false)}
                        >
                            Sign in
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="p-5 text-white hover:underline" onClick={() => setMenuOpen(false)}>
                            Log in
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
