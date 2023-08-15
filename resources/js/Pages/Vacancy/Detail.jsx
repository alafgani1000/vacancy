import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
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
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end">
                                <button className="bg-sky-950 px-4 py-2 rounded-md text-white font-semibold shadow-md">
                                    <span className="text-lg">+</span> New Data
                                </button>
                            </div>
                            <div className="rounded-md rounded-tr-md bg-sky-950 p-3 mt-4 mb-4 text-white font-bold border-b-2 border-white shadow-md">
                                LOREM IPSUM DATA
                            </div>
                            <div className="rounded-md bg-slate-50 p-3 text-black grid grid-flow-row auto-rows-max">
                                {/* content */}
                                <div className="rounded-md mb-5">
                                    <div className="bg-sky-500 h-full w-fit p-4 rounded-md text-white float-left mr-4">
                                        <span className="text-lg font-bold">
                                            03 Fri
                                        </span>
                                        <br />
                                        <span className="text-md font-bold">
                                            2023 d
                                        </span>
                                    </div>
                                    <div className="bg-white pl-4 pt-2 pb-2 rounded-xl text-black h-full">
                                        <p className="font-bold pb-2">
                                            LOREM IPSUM
                                        </p>
                                        <p>
                                            Lorem Ipsum is simply dummy text of
                                            the printing and typesetting
                                            industry. Lorem Ipsum has been the
                                            industry's standard dummy text ever
                                            since the 1500s, when an unknown
                                            printer took a galley of type and
                                            scrambled it to make a type five
                                            <br />
                                            <p>
                                                <NavLink className="text-sky-500 font-medium">
                                                    Read more....
                                                </NavLink>
                                            </p>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
