import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiDevToLogoFill } from "react-icons/pi";
import { selectRole, selectToken } from "../store/reducers/userSlice";
import { useSelector } from "react-redux";
import { LogoutButton } from "../components/LogoutButton";
import { useTranslation } from "react-i18next";

export const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const token = useSelector(selectToken);
    const role = useSelector(selectRole);

    const { t, i18n } = useTranslation();
    const changeLanguage = (lng:any) => {
        i18n.changeLanguage(lng);
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);
    return (
        <div>
            <div className="flex justify-between items-center bg-purple-800 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-4">
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <PiDevToLogoFill className="size-20" />
                    </Link>
                    <select
                        onChange={(e) => changeLanguage(e.target.value)}
                        className="p-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 sm:text-sm md:text-base"
                    >
                        <option value="en">English</option>
                        <option value="pl">Polish</option>
                    </select>
                </div>

                <button className="lg:hidden text-white text-2xl" onClick={toggleMenu}>
                    &#9776;
                </button>

                <ul className="hidden lg:flex gap-5">
                    {token && (
                        <li>
                            <Link to="/my-posts" className="p-5 text-white hover:underline">
                                {t("myPost")}
                            </Link>
                        </li>
                    )}
                    <li>
                        {role === "admin" ? (
                            <Link to="/dashboard" className="p-5 text-white hover:underline">
                                {t("dashboard")}
                            </Link>
                        ) : (
                            ""
                        )}
                    </li>
                    <li>
                        <Link to="/post" className="p-5 text-white hover:underline">
                            {t("postJob")}
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="p-5 text-white hover:underline">
                            {t("about")}
                        </Link>
                    </li>
                    <li>
                        {token ? (
                            ""
                        ) : (
                            <Link
                                to="/sign-in"
                                className="p-5 bg-black bg-opacity-60 text-white rounded-lg hover:bg-opacity-80"
                            >
                                {t("signIn")}
                            </Link>
                        )}
                    </li>
                    <li>
                        {token ? (
                            <LogoutButton />
                        ) : (
                            <Link
                                to="/login"
                                className="p-5 bg-black bg-opacity-60 text-white rounded-lg hover:bg-opacity-80"
                            >
                                {t("logIn")}
                            </Link>
                        )}
                    </li>
                </ul>
            </div>

            <div
                className={`lg:hidden fixed inset-0 bg-black bg-opacity-70 z-50 transition-all ${
                    menuOpen ? "block" : "hidden"
                }`}
                onClick={() => setMenuOpen(false)}
            >
                <ul className="flex flex-col items-center justify-center h-full text-white space-y-4">
                    {token && (
                        <li>
                            <Link to="/my-posts" className="p-5 text-white hover:underline">
                                {t("myPost")}
                            </Link>
                        </li>
                    )}
                    <li>
                        {role === "admin" ? (
                            <Link to="/dashboard" className="p-5 text-white hover:underline">
                                {t("dashboard")}
                            </Link>
                        ) : (
                            ""
                        )}
                    </li>
                    <li>
                        <Link to="/post" className="p-5 text-white hover:underline">
                            {t("postJob")}
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="p-5 text-white hover:underline">
                            {t("about")}
                        </Link>
                    </li>
                    <li>
                        {token ? (
                            ""
                        ) : (
                            <Link
                                to="/sign-in"
                                className="p-5 bg-black bg-opacity-60 text-white rounded-lg hover:bg-opacity-80"
                            >
                                {t("signIn")}
                            </Link>
                        )}
                    </li>
                    <li>
                        {token ? (
                            <LogoutButton />
                        ) : (
                            <Link
                                to="/login"
                                className="p-5 bg-black bg-opacity-60 text-white rounded-lg hover:bg-opacity-80"
                            >
                                {t("logIn")}
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};
