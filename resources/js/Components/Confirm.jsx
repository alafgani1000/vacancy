export default function Confirm({
    show = false,
    className,
    question = "",
    yes,
    no,
}) {
    if (show) {
        return (
            <div
                id="popup-modal"
                tabIndex="-1"
                className="fixed flex flex-row justify-center top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative flex flex-col justify-center w-full max-w-md max-h-full">
                    <div className="relative bg-sky-950 rounded-lg shadow-lg dark:bg-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-white-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="popup-modal"
                        >
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                                {question}
                            </h3>
                            <button
                                onClick={() => yes()}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                onClick={() => no()}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
