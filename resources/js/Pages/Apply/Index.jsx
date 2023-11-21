import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import moment from "moment/moment";
import parse from "html-react-parser";
import Modal from "@/Components/Modal";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Confirm from "@/Components/Confirm";

export default function Index({ auth, applies }) {
    const [isPublish, setIsPublish] = useState(false);
    const [idSelected, setIdSelected] = useState("");
    const [isConfirm, setIsConfirm] = useState(false);
    const [dataForm, setDataForm] = useState({
        published_at: "",
    });
    const [errorMessage, setErrorMessage] = useState({
        published_at: "",
    });

    const { data, next_page_url, prev_page_url, total } = applies;

    return (
        <AuthenticatedLayout
            auth={auth}
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
                            <div className="grid grid-cols-2 bg-sky-950 p-3 mt-4 mb-4 text-white font-bold border-b-2 border-white rounded-md">
                                <div>List Vacancy</div>
                                <div className="w-full grid place-items-end pr-2">
                                    Total record: {total}
                                </div>
                            </div>
                            <div className="bg-slate-100 p-3 text-black grid grid-cols-2 gap-4 auto-rows-max rounded-md">
                                {/* content */}
                                {data.map((applies) => {
                                    return (
                                        <div
                                            className="mb-2 shadow-blue-100"
                                            key={applies.id}
                                        >
                                            <div className="bg-white pl-4 pr-4 pt-4 pb-4 text-black h-full rounded-md">
                                                test
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
