import Modal from "@/Components/Modal";
import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Dialog } from "@headlessui/react";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import moment from "moment";
import { useState } from "react";

export default function Index({ auth, applies }) {
    const [modalHistory, setModalHistory] = useState(false);
    const [selections, setSelections] = useState([]);

    const { data, next_page_url, prev_page_url, total } = applies;

    const histories = (id) => {
        axios.get(`/apply/${id}/selections`, {}).then(({ data }) => {
            setSelections(data);
        });
        setModalHistory(true);
    };

    const ButtonConfirm = (withc, conf) => {
        console.log(conf);
        if (withc == "yes") {
            return (
                <button className="px-3 py-2 text-xs bg-sky-500 text-white rounded mt-2">
                    Confirm
                </button>
            );
        } else {
            return "";
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Apply
                </h2>
            }
        >
            <Head title="Apply" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-md">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end"></div>
                            <div className="grid grid-cols-2 bg-sky-950 p-3 mt-4 mb-4 text-white font-bold border-b-2 border-white rounded-md">
                                <div>Apply Data</div>
                                <div className="w-full grid place-items-end pr-2">
                                    Total record: {total}
                                </div>
                            </div>
                            <div className="bg-slate-100 p-3 text-black grid grid-flow-rows auto-rows-max rounded-md">
                                {/* content */}
                                {data.map((apply) => {
                                    return (
                                        <div
                                            onClick={() => histories(apply.id)}
                                            className="mb-2 shadow-blue-100"
                                            key={apply.id}
                                        >
                                            <div className="bg-white pl-4 pr-4 pt-4 pb-4 text-black h-full rounded-md hover:bg-sky-500 hover:text-white">
                                                <p className="text-xl">
                                                    {
                                                        apply.vacancy.user
                                                            .company.name
                                                    }
                                                    <span className="bg-sky-600 text-white px-2 py-1 ms-2 text-sm rounded-full animate-bounce">
                                                        1
                                                    </span>
                                                </p>
                                                <p>{apply.vacancy.job_name}</p>
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

            <Modal show={modalHistory}>
                <Dialog.Panel className="transform overflow-hidde bg-gray-100 rounded-2xl p-6 text-left align-middle shadow-xl transition-all h-screen">
                    <div className="grid grid-cols-2 ">
                        <div className="text-2xl font-bold">History</div>
                        <div className="justify-items-end">
                            <button
                                type="button"
                                className="float-right py-1 px-2 justify-center rounded border border-transparent bg-red-600  text-sm font-medium text-white hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => setModalHistory(false)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                    <div className="justify-items-center mt-4 pb-10 h-full">
                        {selections.map((selection) => {
                            return (
                                <div
                                    key={selection.id}
                                    className="bg-gradient-to-r from-white to-white py-2 px-3.5 shadow-sm rounded mb-4"
                                >
                                    <p>{selection.stage.desc}</p>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Date</td>
                                                <td>:</td>
                                                <td>
                                                    {moment(
                                                        selection.date_interview
                                                    ).format("DD MMMM YYYY")}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Time</td>
                                                <td>:</td>
                                                <td>
                                                    {selection.time_interview}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p>
                                        Please confirm if you can attend, click
                                        confirm button bellow
                                    </p>
                                    <ButtonConfirm
                                        withc={selection.with_confirmation}
                                        conf={selection.confirmation}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </Dialog.Panel>
            </Modal>
        </AuthenticatedLayout>
    );
}
