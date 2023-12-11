import Modal from "@/Components/Modal";
import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Dialog } from "@headlessui/react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

export default function DetailApply({ auth, applies, vacancy }) {
    const [modalCv, SetModalCv] = useState(false);
    const [dataCv, setDataCv] = useState({});
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(3);
    const [isData, setIsData] = useState(true);
    const [data, setData] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);

    const closeModal = () => {
        SetModalCv(false);
    };

    const getCv = (id) => {
        axios.get(`/cv/${id}/show`, {}).then((res) => {
            setDataCv(res.data);
            SetModalCv(true);
        });
    };

    useEffect(() => {
        setData(applies.map((prev) => ({ ...prev, checked: false })));
    }, []);

    const loadMoreData = () => {
        let newOffset = offset + 100;
        axios
            .put(`/apply/${vacancy.id}/load-more`, {
                offset: newOffset,
                limit: limit,
            })
            .then((res) => {
                setData((prev) => [...prev, ...res.data]);
                setOffset(newOffset);
            })
            .catch((error) => {
                console.log(error);
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

    const age = (date) => {
        var tgl1 = new Date(date);
        var tgl2 = new Date();
        var timeDiff = Math.abs(tgl2.getTime() - tgl1.getTime());
        var age = Math.ceil(timeDiff / (1000 * 3600 * 24)) / 365;
        return Math.floor(age);
    };

    const checkAll = (e) => {
        if (isCheckAll === false) {
            setIsCheckAll(true);
            setData(data.map((prev) => ({ ...prev, checked: true })));
        } else if (isCheckAll === true) {
            setIsCheckAll(false);
            setData(data.map((prev) => ({ ...prev, checked: false })));
        }
    };

    const checked = (id) => {
        let dataSelected = data.find((d) => {
            return d.id === id;
        });
        if (dataSelected.checked === false) {
            dataSelected.checked = true;
            setData(data.map((prev) => ({ ...prev, dataSelected })));
        } else if (dataSelected.checked === true) {
            dataSelected.checked = false;
            setData(data.map((prev) => ({ ...prev, dataSelected })));
        }
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
                            <div className="grid grid-cols-2 pb-2 mb-4 border-b">
                                <div className="font-bold">List of data</div>
                                <div className="flex justify-end">
                                    <button className="bg-sky-600 py-2 px-4 text-sm font-semibold rounded-md text-white ">
                                        Action
                                    </button>
                                </div>
                            </div>
                            <div className="rounded-md overflow-y-auto">
                                {/* content */}
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2 border-b border-t">
                                    <thead className="text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="font-bold">
                                            <th className="pb-3 pt-3 text-center w-20">
                                                <input
                                                    className="rounded-sm"
                                                    type="checkbox"
                                                    onChange={(e) =>
                                                        checkAll(e)
                                                    }
                                                    defaultChecked={isCheckAll}
                                                />
                                            </th>
                                            <th className="pb-3 pt-3">Name</th>
                                            <th>Age</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((apply) => {
                                            return (
                                                <tr
                                                    key={apply.id}
                                                    className="border-b"
                                                >
                                                    <td className="p-2 text-center">
                                                        <input
                                                            className="rounded-sm"
                                                            type="checkbox"
                                                            name={apply.id}
                                                            checked={
                                                                apply.checked
                                                            }
                                                            onChange={() =>
                                                                checked(
                                                                    apply.id
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <span
                                                            className="hover:text-sky-950 hover:cursor-pointer"
                                                            onClick={() =>
                                                                getCv(
                                                                    apply
                                                                        .user_apply
                                                                        .id
                                                                )
                                                            }
                                                        >
                                                            {
                                                                apply.user_apply
                                                                    .first_name
                                                            }{" "}
                                                            {
                                                                apply.user_apply
                                                                    .last_name
                                                            }
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {apply.user_apply
                                                            .date_of_birth ===
                                                        null
                                                            ? ""
                                                            : age(
                                                                  apply
                                                                      .user_apply
                                                                      .date_of_birth
                                                              )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="py-4 flex flex-row justify-center">
                                <button
                                    onClick={() => loadMoreData()}
                                    type="button"
                                    className="border rounded-3xl text-sm font-semibold py-2 px-4 bg-sky-500 text-white hover:bg-sky-900"
                                >
                                    Load More....
                                </button>
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
