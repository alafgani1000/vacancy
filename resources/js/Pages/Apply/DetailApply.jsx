import Modal from "@/Components/Modal";
import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Dialog } from "@headlessui/react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import parse from "html-react-parser";
import { useState } from "react";

export default function DetailApply({ auth, applies, vacancy }) {
    const [modalCv, SetModalCv] = useState(false);
    const [dataCv, setDataCv] = useState({});

    const { data, next_page_url, prev_page_url, total } = applies;

    const closeModal = () => {
        SetModalCv(false);
    };

    const getCv = (id) => {
        axios.get(`/cv/${id}/show`, {}).then((res) => {
            setDataCv(res.data);
            SetModalCv(true);
        });
    };

    const capitalize = (data) => {
        // split data to array
        const dataArray = data.split(" ");
        // loop change first character to uppercase
        for (let i = 0; i < dataArray.length; i++) {
            dataArray[i] =
                dataArray[i].charAt(0).toUpperCase() + dataArray[i].slice(1);
        }
        // join array to string
        const dataText = dataArray.join(" ");
        return dataText;
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Data Apply
                </h2>
            }
        >
            <Head title="Apply" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-md">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-start bg-sky-950 p-3 mt-4 mb-4 text-white font-bold border-b-2 border-white rounded-md">
                                {vacancy.job_name}
                            </div>
                            <div className="grid grid-cols-2 pb-2 font-bold mb-4 border-b">
                                <div>List of data</div>
                                <div className="w-full grid place-items-end pr-2">
                                    Total record: {total}
                                </div>
                            </div>
                            <div className="bg-slate-100 p-3 text-black grid grid-flow-rows auto-rows-max rounded-md">
                                {/* content */}
                                {data.map((apply) => {
                                    return (
                                        <div
                                            onClick={() =>
                                                getCv(apply.user_apply.id)
                                            }
                                            className="mb-4 shadow-blue-100"
                                            key={apply.id}
                                        >
                                            <div className="bg-white pl-4 pr-4 pt-3 pb-3 text-black h-full rounded-md hover:bg-sky-500 hover:text-white hover:cursor-pointer">
                                                <p className="">
                                                    {
                                                        apply.user_apply
                                                            .first_name
                                                    }{" "}
                                                    {apply.user_apply.last_name}
                                                </p>
                                                {parse(apply.message)}
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

            <Modal show={modalCv}>
                <Dialog.Panel className="transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all h-screen">
                    <div className="grid grid-flow-row justify-items-end">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-lg border border-transparent bg-red-600 px-2 py-1 text-sm font-medium text-white hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                        >
                            X
                        </button>
                    </div>
                    <div className="w-full grid justify-items-center">
                        <div className="max-w-4xl w-full shadow-lg bg-white py-4 px-6 rounded-md">
                            <div className="flex flex-row ">
                                <div className="w-24 h-24 bg-sky-50 p-2 rounded-md">
                                    <img
                                        src={
                                            dataCv.foto !== null
                                                ? `/cv/${dataCv.foto}`
                                                : `/cv/profiles/default.jpg`
                                        }
                                        className="mb-2"
                                    />
                                </div>
                                <div className="ms-4">
                                    <div className="grid grid-flow-col auto-cols-max mt-2">
                                        <div className="w-20">Name</div>
                                        <div className="me-2">:</div>
                                        <div>
                                            {dataCv.first_name}{" "}
                                            {dataCv.last_name}
                                        </div>
                                    </div>
                                    <div className="grid grid-flow-col auto-cols-max">
                                        <div className="w-20">Gender</div>
                                        <div className="me-2">:</div>
                                        <div>{dataCv.sex}</div>
                                    </div>
                                    <div className="grid grid-flow-col auto-cols-max">
                                        <div className="w-20">Address</div>
                                        <div className="me-2">:</div>
                                        <div>{dataCv.address}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="border-b-2 border-dashed mb-4 py-1">
                                    Education
                                </div>
                                {dataCv?.educations?.map((edu) => {
                                    return (
                                        <div
                                            key={edu.id}
                                            className="grid grid-flow-col auto-cols-max"
                                        >
                                            <div className="w-52">
                                                {edu.start} ~ {edu.end}
                                            </div>
                                            <div className="me-2">
                                                {capitalize(edu.name)}
                                            </div>
                                            <div>
                                                {capitalize(edu.major)} (
                                                {edu.degree})
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8">
                                <div className="border-b-2 border-dashed mb-4 py-1">
                                    Work Histories
                                </div>
                                {dataCv?.work_hisories?.map((his) => {
                                    return (
                                        <div
                                            key={his.id}
                                            className="grid grid-flow-col auto-cols-max"
                                        >
                                            <div className="w-36">
                                                {his.start} ~ {his.end}
                                            </div>
                                            <div className="me-2 w-52">
                                                {capitalize(his.company)}
                                            </div>
                                            <div className="me-2">
                                                {capitalize(his.job_desc)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8">
                                <div className="border-b-2 border-dashed mb-4 py-1">
                                    Skill
                                </div>
                                {dataCv?.skills?.map((skill) => {
                                    return <p>{skill.description}</p>;
                                })}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Modal>
        </AuthenticatedLayout>
    );
}
