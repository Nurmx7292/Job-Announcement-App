import React from "react";

export const Footer = () => {
    return (
        <div className="bg-purple-800 px-4 py-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] text-white">
            <h1 className="text-3xl font-bold">Remote jobs Anywhere in the World</h1>
            <div className="flex justify-between items-start mt-6">
                <div className="max-w-lg">
                    <p className="text-lg mt-2 w-full">
                        Find the best opportunities tailored for remote work. Work from anywhere and enjoy a better
                        work-life balance.
                    </p>
                    <button className="mt-4 px-6 py-2 bg-black bg-opacity-60 text-white font-semibold rounded-lg hover:bg-opacity-80 ">
                        Send us your resume
                    </button>
                </div>
                <div className="text-sm sm:text-base mt-4 sm:mt-0">
                    <p>
                        Email: <span className="text-blue-500 ml-5">hello@gmail.com</span>
                    </p>
                    <p>
                        Phone: <span className="text-blue-500 ml-5">222 333 444</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
