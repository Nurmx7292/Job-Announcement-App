import React, { useState } from "react";
import { useRegisterUserMutation } from "../services/UserApi";
import { useDispatch } from "react-redux";
import { setError } from "../store/reducers/userSlice";
import { useTranslation } from "react-i18next";

export const SignUpPage = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await registerUser({ username, email, password }).unwrap();
            console.log(user)
            alert("Регистрация успешна!");
        } catch (error) {
            dispatch(setError("Ошибка регистрации"));
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">{t("registration")}</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder={t("namePlaceholder")}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-blue-500"
                    />
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
                        name="registerButton"
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-md bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {isLoading ? t("loading") : t("registerButton")}
                    </button>
                </form>
            </div>
        </div>
    );
};
