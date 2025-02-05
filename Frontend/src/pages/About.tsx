import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const About = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl bg-white shadow-lg rounded-2xl p-8"
            >
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-purple-700 mb-4 text-center"
                >
                    {t("aboutJobAnnouncements")}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-gray-600 text-lg text-center mb-6"
                >
                    {t("welcomeMessage")}
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="p-4 bg-purple-100 rounded-xl shadow-md"
                    >
                        <h2 className="text-xl font-semibold text-purple-700">{t("forJobSeekers")}</h2>
                        <p className="text-gray-600 mt-2">{t("jobSeekersMessage")}</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="p-4 bg-blue-100 rounded-xl shadow-md"
                    >
                        <h2 className="text-xl font-semibold text-blue-700">{t("forEmployers")}</h2>
                        <p className="text-gray-600 mt-2">{t("employersMessage")}</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
