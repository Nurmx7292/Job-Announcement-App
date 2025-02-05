import React, { useState } from "react";
import { useLoginUserMutation } from "../services/UserApi";
import { useDispatch } from "react-redux";
import { setUser, setError, setId } from "../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password }).unwrap();
            dispatch(
                setUser({
                    username: response.username,
                    email: response.email,
                    token: response.accessToken,
                    role: response.role,
                })
            );
            dispatch(setId(response.userId));
            console.log(response);
            localStorage.setItem("role", response.role);
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("userId", response.userId);
            navigate("/");
            console.log(response.role);
        } catch (error) {
            dispatch(setError("Ошибка входа"));
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">{t("login")}</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-blue-500"
                    />
                    <input
                        type="password"
                        placeholder={t("passwordPlaceholder")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-blue-500"
                    />
                    <button
                        name = "loginButton"
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-md bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {isLoading ? t("loading") : t("loginButton")}
                    </button>
                </form>
            </div>
        </div>
    );
};
