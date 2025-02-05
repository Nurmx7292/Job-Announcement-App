import { useTranslation } from "react-i18next";

export const Footer = () => {
    const { t } = useTranslation();
    return (
        <div className="bg-purple-800 px-4 py-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] text-white">
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">{t("footerRemetJob")}</h1>

            {/* Content Container */}
            <div className="flex flex-col sm:flex-row justify-between items-start mt-6 gap-6 sm:gap-0">
                {/* Left Section */}
                <div className="max-w-lg w-full sm:w-auto">
                    <p className="text-base sm:text-lg mt-2">{t("footerDescription")}</p>
                    <button className="mt-4 px-6 py-2 bg-black bg-opacity-60 text-white font-semibold rounded-lg hover:bg-opacity-80 w-full sm:w-auto">
                        {t("footerSendResume")}
                    </button>
                </div>

                {/* Right Section */}
                <div className="text-sm sm:text-base w-full sm:w-auto text-center sm:text-left">
                    <p>
                        {t("footerEmail")}: <span className="text-blue-500 ml-2 sm:ml-5">hello@gmail.com</span>
                    </p>
                    <p className="mt-2">
                        {t("footerPhone")}: <span className="text-blue-500 ml-2 sm:ml-5">222 333 444</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
