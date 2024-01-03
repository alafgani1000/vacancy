import Modal from "@/Components/Modal";
import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Dialog } from "@headlessui/react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

export default function DetailApply({ auth, applies, vacancy, stagesdata }) {
    const [modalCv, SetModalCv] = useState(false);
    const [dataCv, setDataCv] = useState({});
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(3);
    const [isData, setIsData] = useState(true);
    const [data, setData] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [inviteData, setInviteData] = useState({
        stage: "",
        date_interview: "",
        time_interview: "",
        apply: [],
        with_confirm: "",
    });
    const [stages, setStages] = useState([]);
    const [modalInvite, setModalInvite] = useState(false);
    const [modalHistory, setModalHistory] = useState(false);

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
        getStages();
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

    const getStages = () => {
        axios
            .get(`/stage/data`)
            .then((res) => {
                setStages(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const showFormInvite = () => {
        setModalInvite(true);
        getCheckedData();
    };

    const getCheckedData = () => {
        let dataSelected = data.filter((d) => {
            return d.checked === true;
        });
        setInviteData((prev) => ({
            ...prev,
            apply: dataSelected,
        }));
    };

    const inviteChange = (e) => {
        setInviteData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const invite = () => {
        axios
            .put(`/apply/${vacancy.id}/invite`, inviteData)
            .then((res) => {
                setModalInvite(false);
            })
            .catch((err) => {});
    };

    const showHistory = () => {
        setModalHistory(true);
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
                            <div className="grid grid-cols-2 pb-4 mb-4 border-b">
                                <div className="font-bold">List of data</div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => showFormInvite()}
                                        className="bg-sky-950 text-white py-2 px-2 text-xs font-semibold rounded-md inline-flex hover:bg-sky-500 hover:border-none hover:border hover:border-sky-500 hover:text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-3 h-4 me-1 font-bold"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                            />
                                        </svg>
                                        Invite
                                    </button>
                                </div>
                            </div>
                            <div className="rounded-md overflow-y-auto">
                                {/* content */}
                                <div clas>
                                    <select className="text-xs rounded-md me-4">
                                        <option value="">
                                            -- Please Select Stage --
                                        </option>
                                        {stagesdata.map((dt) => {
                                            return (
                                                <option value={dt.id}>
                                                    {dt.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-6 border-b border-t">
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
                                            <th>Stage</th>
                                            <th>
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
                                                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((apply) => {
                                            return (
                                                <tr
                                                    key={apply.id}
                                                    className="border-b"
                                                >
                                                    <td className="px-2 py-2.5 text-center">
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
                                                    <td>{apply.stage.name}</td>
                                                    <td>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6 cursor-pointer hover:stroke-sky-600"
                                                            onClick={() =>
                                                                showHistory()
                                                            }
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                                                            />
                                                        </svg>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="py-4 flex flex-row justify-center from-sky-950 to-sky-900">
                                <button
                                    onClick={() => loadMoreData()}
                                    type="button"
                                    className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full text-sm font-semibold py-2 px-4 hover:bg-sky-500 hover:text-white hover:border hover:border-sky-500"
                                >
                                    Load More....
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={modalHistory}>
                <Dialog.Panel className="transform overflow-hidde bg-gray-100 rounded-2xl p-6 text-left align-middle shadow-xl transition-all h-screen">
                    <div className="grid grid-cols-2 ">
                        <div className="text-3xl font-bold">History</div>
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
                    <div className="w-full grid grid-cols-2 gap-4 justify-items-center mt-4 pb-10 h-full"></div>
                </Dialog.Panel>
            </Modal>

            <Modal show={modalInvite}>
                <Dialog.Panel className="transform overflow-hidde bg-gray-100 rounded-2xl p-6 text-left align-middle shadow-xl transition-all h-screen">
                    <div className="grid grid-cols-2 ">
                        <div className="text-3xl font-bold">Form invite</div>
                        <div className="justify-items-end">
                            <button
                                type="button"
                                className="float-right py-1 px-2 justify-center rounded border border-transparent bg-red-600  text-sm font-medium text-white hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => setModalInvite(false)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-4 justify-items-center mt-4 pb-10 h-full">
                        <div className="w-full ">
                            <div className="w-full shadow-md bg-gradient-to-r from-sky-950 to-sky-900 py4 px-6 rounded-md py-6">
                                <h1 className="text-base font-semibold text-white">
                                    List of candidate to invite
                                </h1>
                                <table className="w-full text-sm text-left text-white dark:text-gray-400 mt-2 border-b border-t overflow-y-scroll">
                                    <thead className="text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="font-bold">
                                            <th className="p-2">Name</th>
                                            <th className="p-2">Age</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inviteData.apply.map((data) => {
                                            return (
                                                <tr key={data.id}>
                                                    <td className="pe-2 ps-2 pb-1 pt-2">
                                                        <span
                                                            className="hover:text-sky-400 hover:cursor-pointer"
                                                            onClick={() =>
                                                                getCv(
                                                                    data
                                                                        .user_apply
                                                                        .id
                                                                )
                                                            }
                                                        >
                                                            {
                                                                data.user_apply
                                                                    .first_name
                                                            }{" "}
                                                            {
                                                                data.user_apply
                                                                    .last_name
                                                            }
                                                        </span>
                                                    </td>
                                                    <td className="pe-2 ps-2 pb-1 pt-2">
                                                        {data.user_apply
                                                            .date_of_birth ===
                                                        null
                                                            ? ""
                                                            : age(
                                                                  data
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
                        </div>
                        <div className="w-full">
                            <div className="w-full shadow-md bg-white py4 px-6 rounded-md py-6 h-full">
                                <form>
                                    <div className="w-full">
                                        <label
                                            htmlFor="stage"
                                            className="block mb-2"
                                        >
                                            Stage
                                        </label>
                                        <select
                                            className="rounded block w-full"
                                            name="stage"
                                            onChange={inviteChange}
                                            defaultValue={inviteData.stage}
                                        >
                                            <option value="">
                                                ...Please Select...
                                            </option>
                                            {stages?.map((stage) => {
                                                return (
                                                    <option
                                                        key={stage.id}
                                                        value={stage.id}
                                                    >
                                                        {stage.desc}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <div className="w-2/4">
                                            <label
                                                htmlFor="stage"
                                                className="block mb-2 w-full"
                                            >
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                name="date_interview"
                                                className="rounded w-full"
                                                defaultValue={
                                                    inviteData.date_interview
                                                }
                                                onChange={inviteChange}
                                            />
                                        </div>
                                        <div className="w-2/4">
                                            <label
                                                htmlFor="stage"
                                                className="block mb-2 w-full"
                                            >
                                                Time
                                            </label>
                                            <input
                                                type="time"
                                                name="time_interview"
                                                className="rounded w-full"
                                                defaultValue={
                                                    inviteData.date_interview
                                                }
                                                onChange={inviteChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full mt-4">
                                        <label
                                            htmlFor="with_confirmation"
                                            className="block mb-2"
                                        >
                                            With Confirmation
                                        </label>
                                        <select
                                            className="rounded block w-full"
                                            name="with_confirm"
                                            onChange={inviteChange}
                                            defaultValue={
                                                inviteData.with_onfirm
                                            }
                                        >
                                            <option value="">
                                                ...Please Select...
                                            </option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                </form>
                                <div className="flex flex-row mt-5">
                                    <button
                                        onClick={() => invite()}
                                        className="py-3 px-4 text-sm font-semibold rounded-md inline-flex hover:bg-sky-500 border-none border border-sky-500 text-white bg-sky-950"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-5 me-1.5 font-bold"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                            />
                                        </svg>
                                        Send Invite
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Modal>

            <Modal show={modalCv}>
                <Dialog.Panel className="transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all h-screen">
                    <div className="grid grid-flow-row justify-items-end">
                        <button
                            type="button"
                            className=" justify-center rounded-lg border border-transparent bg-red-600 px-2 py-1 text-sm font-medium text-white hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
