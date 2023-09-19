import NavLink from "@/Components/NavLink";
import Header from "./Header";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ({ auth, laravelVersion, phpVersion, hasVeried }) {
    return (
        <>
            {hasVeried === false ? (
                <div className="text-center">Please verify....</div>
            ) : (
                ""
            )}
            <div className="min-h-screen bg-gray-100">
                {/* header */}
                <Header
                    user={auth}
                    header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Detail Vacancy
                        </h2>
                    }
                />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-md sm:rounded-md">
                            <div className="p-6 text-gray-900">
                                <div className="bg-slate-50 p-3 text-black grid grid-flow-row auto-rows-max rounded-md">
                                    {/* content */}
                                    <div className="mb-5">
                                        <div className="bg-white pl-4 pt-2 pb-2 text-black h-ful">
                                            <img
                                                src="/storage/tailwin.png"
                                                width="80px"
                                                className="mb-2"
                                            />
                                            <p className="font-bold pb-2">
                                                LOREM IPSUM TITLE
                                            </p>
                                        </div>
                                        <div className="bg-white pl-4 pt-2 pb-2 text-black h-ful">
                                            <p>
                                                Lorem Ipsum is simply
                                                description dummy text of the
                                                printing and typesetting
                                                industry. Lorem Ipsum has been
                                                the industry's standard dummy
                                                text ever since the 1500s, when
                                                an unknown printer took a galley
                                                of type and scrambled it to make
                                                a type five
                                            </p>

                                            <table
                                                className="table-auto mt-2"
                                                cellPadding={3}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td>Location</td>
                                                        <td>:</td>
                                                        <td>
                                                            Jakarta, Indonesia
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Work Type</td>
                                                        <td>:</td>
                                                        <td>Remote</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Job Level</td>
                                                        <td>:</td>
                                                        <td>Junior</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div className="bg-white pl-4 pt-2 pb-2 text-black h-full">
                                            <p className="font-bold pb-2">
                                                LOREM IPSUM QUALIFICATION
                                            </p>
                                            <ul className="list-disc list-inside">
                                                <li>
                                                    Sed nec justo elementum,
                                                    vestibulum augue sit amet,
                                                    lacinia enim.
                                                </li>
                                                <li>
                                                    Donec tempus augue sed eros
                                                    tristique, ut euismod justo
                                                    blandit.
                                                </li>
                                                <li>
                                                    Cras ultricies ligula sit
                                                    amet sem blandit, at
                                                    facilisis magna blandit.
                                                </li>
                                                <li>
                                                    Maecenas vel nisi in eros
                                                    sollicitudin ultricies eu
                                                    sit amet nisl.
                                                </li>
                                                <li>
                                                    In et lacus ut lorem rhoncus
                                                    molestie pretium sed enim.
                                                </li>
                                                <li>
                                                    Curabitur vestibulum felis
                                                    ac dictum molestie.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div className="bg-white pl-4 pt-2 pb-2 text-black h-ful">
                                            <p className="font-bold pb-2">
                                                LOREM IPSUM JOB DESC
                                            </p>
                                            <ul className="list-disc list-inside">
                                                <li>
                                                    Sed nec justo elementum,
                                                    vestibulum augue sit amet,
                                                    lacinia enim.
                                                </li>
                                                <li>
                                                    Donec tempus augue sed eros
                                                    tristique, ut euismod justo
                                                    blandit.
                                                </li>
                                                <li>
                                                    Cras ultricies ligula sit
                                                    amet sem blandit, at
                                                    facilisis magna blandit.
                                                </li>
                                                <li>
                                                    Maecenas vel nisi in eros
                                                    sollicitudin ultricies eu
                                                    sit amet nisl.
                                                </li>
                                                <li>
                                                    In et lacus ut lorem rhoncus
                                                    molestie pretium sed enim.
                                                </li>
                                                <li>
                                                    Curabitur vestibulum felis
                                                    ac dictum molestie.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="pl-2 pr-2 pb-4 grid place-content-end">
                                        <NavLink
                                            className="font-medium text-white inline-flex items-center bg-sky-950 hover:text-white hover:bg-sky-900 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md dark:bg-sky-600 dark:hover:bg-sky-950 dark:focus:ring-blue-950 focus:text-white text-lg text-center pb-4 pt-4 px-10"
                                            href={route("vacancy.apply", 1)}
                                        >
                                            <span>
                                                <svg
                                                    className="w-3.5 h-3.5 text-white mr-2"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                                </svg>
                                            </span>
                                            Apply
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
