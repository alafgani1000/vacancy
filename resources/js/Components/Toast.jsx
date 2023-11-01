export default function Toast({
    time = 0,
    show = false,
    className,
    message = "",
    falseShow,
}) {
    setTimeout(() => {
        falseShow();
    }, time);
    if (show) {
        return (
            <div
                className={`fixed inline-flex top-0 right-0 m-4 py-3 px-4 rounded-md ${className}`}
            >
                <span className="mr-3 p-1 bg-white rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>
                </span>

                <span className="text-lg">{message}</span>
                <span
                    className="ml-4 cursor-pointer"
                    onClick={() => falseShow()}
                >
                    X
                </span>
            </div>
        );
    }
}
