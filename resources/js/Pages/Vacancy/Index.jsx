import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import moment from "moment/moment";
import parse from "html-react-parser";

export default function Index({ auth, vacancies }) {
    const { data, next_page_url, prev_page_url, total } = vacancies;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Vacancy
                </h2>
            }
        >
            <Head title="Vacancy" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-md">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end">
                                <NavLink
                                    href={route("vacancy.create")}
                                    active={route().current("vacancy.create")}
                                    className="bg-sky-950 px-4 pt-2 pb-2 text-white font-semibold shadow-md hover:text-sky-500 hover:bg-white rounded-md"
                                >
                                    + New Vacancy
                                </NavLink>
                            </div>
                            <div className="grid grid-cols-2 bg-sky-950 p-3 mt-4 mb-4 text-white font-bold border-b-2 border-white shadow-md rounded-md">
                                <div>List Vacancy</div>
                                <div className="w-full grid place-items-end pr-2">
                                    Total record: {total}
                                </div>
                            </div>
                            <div className="bg-slate-50 p-3 text-black grid grid-cols-2 gap-4 auto-rows-max rounded-md">
                                {/* content */}
                                {data.map((vacancy) => {
                                    return (
                                        <div
                                            className="mb-4 shadow-md shadow-blue-100"
                                            key={vacancy.id}
                                        >
                                            <div className="bg-white pl-4 pr-4 pt-2 pb-4 text-black h-full rounded-md">
                                                <div className="grid place-items-start">
                                                    <div className="w-full grid place-items-end px-2">
                                                        <div
                                                            className="inline-flex rounded-md shadow-sm"
                                                            role="group"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-slate-50 border border-slate-100 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    className="w-3 h-3 mr-2"
                                                                >
                                                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                                                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                                                </svg>
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-slate-50 border border-slate-100 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    className="w-3 h-3 mr-2"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M3.22 3.22a.75.75 0 011.06 0l3.97 3.97V4.5a.75.75 0 011.5 0V9a.75.75 0 01-.75.75H4.5a.75.75 0 010-1.5h2.69L3.22 4.28a.75.75 0 010-1.06zm17.56 0a.75.75 0 010 1.06l-3.97 3.97h2.69a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75V4.5a.75.75 0 011.5 0v2.69l3.97-3.97a.75.75 0 011.06 0zM3.75 15a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-2.69l-3.97 3.97a.75.75 0 01-1.06-1.06l3.97-3.97H4.5a.75.75 0 01-.75-.75zm10.5 0a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-2.69l3.97 3.97a.75.75 0 11-1.06 1.06l-3.97-3.97v2.69a.75.75 0 01-1.5 0V15z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                Publish
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="px-2">
                                                    <p className="font-bold pb-2">
                                                        {vacancy.job_name}
                                                    </p>
                                                    <p>
                                                        <span className="font-bold text-xs bg-red-400 py-1.5 px-1.5 rounded text-white mr-2">
                                                            {vacancy.level.name}
                                                        </span>
                                                        <span className="font-bold text-xs bg-sky-500 py-1.5 px-1.5 rounded text-white mr-2">
                                                            {vacancy.type.name}{" "}
                                                            / {vacancy.city},{" "}
                                                            {vacancy.country}
                                                        </span>
                                                        <span className="font-bold text-xs bg-sky-500 py-1.5 px-1.5 rounded text-white">
                                                            {moment(
                                                                vacancy.created_at
                                                            ).format(
                                                                "DD MMMM YYYY"
                                                            )}
                                                        </span>
                                                    </p>
                                                    <div className="mt-4">
                                                        {parse(
                                                            vacancy.description
                                                        )}
                                                        <NavLink
                                                            className="text-white font-medium inline bg-sky-500 pt-2 pb-1 px-4 rounded-lg mt-2"
                                                            href={route(
                                                                "vacancy.detail",
                                                                vacancy.id
                                                            )}
                                                        >
                                                            Know more....
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* page */}
                            <div className="grid grid-cols-2 mt-4 py-2 px-8">
                                <div className="flex justify-end py-4 pe-4">
                                    {prev_page_url !== null ? (
                                        <NavLink
                                            href={prev_page_url}
                                            className="bg-sky-500 pt-3 pb-2 px-6 rounded-full text-white font-medium"
                                        >
                                            Prev
                                        </NavLink>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="flex justify-start py-4 px-4">
                                    {next_page_url !== null ? (
                                        <NavLink
                                            href={next_page_url}
                                            className="bg-sky-500 pt-3 pb-2 px-6 rounded-full text-white font-medium"
                                        >
                                            Next
                                        </NavLink>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
