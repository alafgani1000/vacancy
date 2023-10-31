import { useState } from "react";

export default function Toast({
    time = 0,
    show = false,
    className,
    message = "",
}) {
    setTimeout(() => {
        show = false;
    }, time);
    if (show) {
        return (
            <div
                className={`fixed top-0 right-0 m-4 py-3 px-4 rounded-md animate-bounce ${className}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                    />
                </svg>

                {message}
                <span className="ml-4 cursor-pointer">X</span>
            </div>
        );
    }
}
