import Modal from "@/Components/Modal";
import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Dialog, Transition } from "@headlessui/react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import moment from "moment";
import { Fragment } from "react";
import Confirm from "@/Components/Confirm";
import Toast from "@/Components/Toast";

export default function DetailApply({
    auth,
    applies,
    vacancy,
    stagesdata,
    statusData,
}) {
    const [modalCv, SetModalCv] = useState(false);
    const [dataCv, setDataCv] = useState({});
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const [isData, setIsData] = useState(true);
    const [data, setData] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isRejectCheckAll, SetIsRejectCheckAll] = useState(false);
    const [isPassCheckAll, setIsPassCheckAll] = useState(false);
    const [inviteData, setInviteData] = useState({
        stage: "",
        date_interview: "",
        time_interview: "",
        apply: [],
        with_confirm: "",
    });
    const [cancelData, setCancelData] = useState({
        apply: [],
        status: "",
    });
    const [cancelPassData, setCancelPassData] = useState({
        apply: [],
        status: "",
    });
    const [stages, setStages] = useState([]);
    const [modalInvite, setModalInvite] = useState(false);
    const [modalChange, setModalChange] = useState(false);
    const [modalPassChange, setModalPassChange] = useState(false);
    const [modalReject, setModalReject] = useState(false);
    const [modalPass, setModalPass] = useState(false);
    const [modalHistory, setModalHistory] = useState(false);
    const [tabCssStyle, setTabCssStyle] = useState({
        active: "inline-block px-4 py-3 shadow-md bg-white text-black rounded-md activate",
        inActive:
            "inline-block px-4 py-3 rounded-md hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white",
        prev: "inline-block px-4 py-3 shadow-md bg-sky-950 text-white rounded-md activate",
    });
    const [tabs, setTabs] = useState({
        apply: tabCssStyle.active,
        history: tabCssStyle.inActive,
        reject: tabCssStyle.inActive,
        pass: tabCssStyle.inActive,
        prev: tabCssStyle.prev,
    });
    const [tabStatus, setTabStatus] = useState({
        apply: true,
        history: false,
        reject: false,
        pass: false,
    });
    const [invites, setInvites] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastData, setToastData] = useState({
        message: "",
        color: "",
    });
    const [dataRejects, setDataRejects] = useState([]);
    const [dataPass, setDataPass] = useState([]);
    const [JobList, setJobList] = useState();
    const [filter, setFilter] = useState("");

    // variabel reload data
    var reloadInterval;

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

    const filterData = (stage) => {
        // alert("test");
        let newOffset = offset;
        setFilter(stage);
        axios
            .put(`/apply/${vacancy.id}/load-more`, {
                offset: newOffset,
                limit: limit,
                stage: stage,
            })
            .then((res) => {
                setData([]);
                let dataMap = res.data.map((prev) => ({
                    ...prev,
                    checked: false,
                }));
                setData((prev) => [...prev, ...dataMap]);
                setOffset(newOffset);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadMoreData = () => {
        let newOffset = offset + 20;
        axios
            .put(`/apply/${vacancy.id}/load-more`, {
                offset: newOffset,
                limit: limit,
                statge: filter,
            })
            .then((res) => {
                let dataMap = res.data.map((prev) => ({
                    ...prev,
                    checked: false,
                }));
                setData((prev) => [...prev, ...dataMap]);
                setOffset(newOffset);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDataInvites = () => {
        axios
            .get(`/invites/${vacancy.id}`, {})
            .then((res) => {
                setInvites(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDataReject = () => {
        axios
            .get(`/apply/${vacancy.id}/rejected`)
            .then((res) => {
                let dataMap = res.data.map((prev) => ({
                    ...prev,
                    checked: false,
                }));
                setDataRejects(dataMap);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDataPass = () => {
        axios
            .get(`/apply/${vacancy.id}/passed`)
            .then((res) => {
                let dataMap = res.data.map((prev) => ({
                    ...prev,
                    checked: false,
                }));
                setDataPass(dataMap);
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

    const checkedReject = (id) => {
        let dataSelected = dataRejects.find((d) => {
            return d.id === id;
        });
        if (dataSelected.checked === false) {
            dataSelected.checked = true;
            setDataRejects(
                dataRejects.map((prev) => ({ ...prev, dataSelected }))
            );
        } else if (dataSelected.checked === true) {
            dataSelected.checked = false;
            setDataRejects(
                dataRejects.map((prev) => ({ ...prev, dataSelected }))
            );
        }
    };

    const checkedPass = (id) => {
        let dataSelected = dataPass.find((d) => {
            return d.id === id;
        });
        if (dataSelected.checked === false) {
            dataSelected.checked = true;
            setDataPass(dataPass.map((prev) => ({ ...prev, dataSelected })));
        } else if (dataSelected.checked === true) {
            dataSelected.checked = false;
            setDataPass(dataPass.map((prev) => ({ ...prev, dataSelected })));
        }
    };

    const checkAllPass = (e) => {
        if (isPassCheckAll === false) {
            setIsPassCheckAll(true);
            setDataPass(dataPass.map((prev) => ({ ...prev, checked: true })));
        } else if (isPassCheckAll === true) {
            setIsPassCheckAll(false);
            setDataPass(dataPass.map((prev) => ({ ...prev, checked: false })));
        }
    };

    const checkAllRejects = (e) => {
        if (isPassAll === false) {
            SetIsRejectCheckAll(true);
            setDataRejects(
                dataRejects.map((prev) => ({ ...prev, checked: true }))
            );
        } else if (isRejectCheckAll === true) {
            SetIsRejectCheckAll(false);
            setDataRejects(
                dataRejects.map((prev) => ({ ...prev, checked: false }))
            );
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
        let coundData = getCheckedData();
        if (coundData > 0) {
            setModalInvite(true);
        }
    };

    const showFormReject = () => {
        let coundData = getCheckedData();
        if (coundData > 0) {
            setModalReject(true);
        }
    };

    const showFormChange = () => {
        let coundData = getRejectCheckedData();
        if (coundData > 0) {
            setModalChange(true);
        }
    };

    const getRejectCheckedData = () => {
        let dataSelected = dataRejects.filter((d) => {
            return d.checked === true;
        });
        setCancelData((prev) => ({
            ...prev,
            apply: dataSelected,
        }));
        return dataSelected.length;
    };

    const showFormPassChange = () => {
        let coundData = getPassCheckedData();
        if (coundData > 0) {
            setModalPassChange(true);
        }
    };

    const getPassCheckedData = () => {
        let dataSelected = dataPass.filter((d) => {
            return d.checked === true;
        });
        setCancelPassData((prev) => ({
            ...prev,
            apply: dataSelected,
        }));
        return dataSelected.length;
    };

    const inviteCancel = (e) => {
        setCancelData((prev) => ({
            ...prev,
            status: e.target.value,
        }));
    };

    const invitePassCancel = (e) => {
        setCancelPassData((prev) => ({
            ...prev,
            status: e.target.value,
        }));
    };

    const closeModalChange = () => {
        setModalChange(false);
        setCancelData({ apply: [], status: "" });
    };

    const closeModalPassChange = () => {
        setModalPassChange(false);
        setCancelPassData({ apply: [], status: "" });
    };

    const exitFormReject = () => {
        setModalReject(false);
    };

    const showFormPass = () => {
        let coundData = getCheckedData();
        if (coundData > 0) {
            setModalPass(true);
        }
    };

    const exitFormPass = () => {
        setModalPass(false);
    };

    const getCheckedData = () => {
        let dataSelected = data.filter((d) => {
            return d.checked === true;
        });
        setInviteData((prev) => ({
            ...prev,
            apply: dataSelected,
        }));
        return dataSelected.length;
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
                setToastData({
                    message: "Reject Success",
                    color: "success",
                });
                setShowToast(true);
                setInviteData((prev) => ({
                    ...prev,
                    apply: [],
                }));
            })
            .catch((err) => {});
    };

    const showHistory = (data) => {
        setHistoryData(data);
        setModalHistory(true);
    };

    const reloadData = () => {
        let limit = data.length;
        axios
            .put(`/apply/${vacancy.id}/load-more`, {
                offset: 0,
                limit: limit,
            })
            .then((res) => {
                let dataMap = res.data.map((prev) => ({
                    ...prev,
                    checked: false,
                }));
                setData(dataMap);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const jobListData = (model, action) => {
        axios
            .post("/job-list", {
                model: model,
                action: action,
            })
            .then((res) => {
                setJobList(res.data);
                if (res.data > 0) {
                    clearInterval(reloadInterval);
                    reloadData();
                }
            });
    };

    // reject
    const reject = () => {
        axios
            .put(`/apply/${vacancy.id}/rejected`, inviteData)
            .then((res) => {
                setInviteData((prev) => ({
                    ...prev,
                    apply: [],
                }));
                setToastData({
                    message: "Reject Success",
                    color: "success",
                });
                setShowToast(true);
                reloadInterval = setInterval(
                    jobListData,
                    1000,
                    "VacancyApply",
                    "reject"
                );
            })
            .catch((err) => {
                setModalReject(false);
                setToastData({
                    message: "Reject Failed",
                    color: "error",
                });
                setShowToast(true);
            })
            .finally(() => {
                setModalReject(false);
            });
    };

    // pass
    const pass = () => {
        axios
            .put(`/apply/${vacancy.id}/pass`, inviteData)
            .then((res) => {
                setInviteData((prev) => ({
                    ...prev,
                    apply: [],
                }));
                setToastData({
                    message: "Pass Success",
                    color: "success",
                });
                setShowToast(true);
                reloadInterval = setInterval(
                    jobListData,
                    1000,
                    "VacancyApply",
                    "pass"
                );
            })
            .catch((err) => {
                setModalPass(false);
                setToastData({
                    message: "Pass Failed",
                    color: "error",
                });
                setShowToast(true);
            })
            .finally(() => {
                setModalPass(false);
            });
    };

    // cancel
    const cancel = () => {
        axios
            .put(`/apply/${vacancy.id}/cancel`, cancelData)
            .then((res) => {
                setCancelData({
                    apply: [],
                    status: "",
                });
                setToastData({
                    message: "Pass Success",
                    color: "success",
                });
                setShowToast(true);
                setModalChange(false);
                let dataMap = res.data.map((prev) => ({
                    ...prev,
                    checked: false,
                }));
                setDataRejects(dataMap);
            })
            .catch((err) => {
                setModalChange(false);
                setToastData({
                    message: "Cancel Failed",
                    color: "error",
                });
                setShowToast(true);
            })
            .finally(() => {
                setModalChange(false);
            });
    };

    // pass cancel
    const passCancel = () => {
        axios
            .put(`/apply/${vacancy.id}/pass-cancel`, cancelPassData)
            .then((res) => {
                setCancelPassData({
                    apply: [],
                    status: "",
                });
                setToastData({
                    message: "Pass Success",
                    color: "success",
                });
                setShowToast(true);
                setModalPassChange(false);
                let dataMap = res.data.map((prev) => ({
                    ...prev,
                    checked: false,
                }));
                setDataPass(dataMap);
            })
            .catch((err) => {
                setModalPassChange(false);
                setToastData({
                    message: "Cancel Failed",
                    color: "error",
                });
                setShowToast(true);
            })
            .finally(() => {
                setModalPassChange(false);
            });
    };

    const falseShow = () => {
        setShowToast(false);
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail
                </h2>
            }
        >
            <Head title="Apply" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-8">
                        <li className="me-4">
                            <NavLink
                                href={route("apply.index")}
                                className={tabs.prev}
                                aria-current="page"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-7 pt-2 cursor-pointer black hover:stroke-slate-300"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </NavLink>
                        </li>
                        <li className="me-2">
                            <a
                                href="#"
                                className={tabs.apply}
                                aria-current="page"
                                onClick={() => {
                                    setTabs({
                                        apply: tabCssStyle.active,
                                        history: tabCssStyle.inActive,
                                        prev: tabCssStyle.prev,
                                        reject: tabCssStyle.inActive,
                                        pass: tabCssStyle.inActive,
                                    });
                                    setTabStatus({
                                        apply: true,
                                        history: false,
                                        reject: false,
                                        pass: false,
                                    });
                                }}
                            >
                                Apply Data
                            </a>
                        </li>
                        <li className="me-2">
                            <a
                                href="#"
                                className={tabs.history}
                                onClick={() => {
                                    setTabs({
                                        apply: tabCssStyle.inActive,
                                        history: tabCssStyle.active,
                                        prev: tabCssStyle.prev,
                                        reject: tabCssStyle.inActive,
                                        pass: tabCssStyle.inActive,
                                    });
                                    setTabStatus({
                                        apply: false,
                                        history: true,
                                        reject: false,
                                        pass: false,
                                    });
                                    getDataInvites();
                                }}
                            >
                                Invite History
                            </a>
                        </li>
                        <li className="me-2">
                            <a
                                href="#"
                                className={tabs.reject}
                                onClick={() => {
                                    setTabs({
                                        apply: tabCssStyle.inActive,
                                        history: tabCssStyle.inActive,
                                        prev: tabCssStyle.prev,
                                        reject: tabCssStyle.active,
                                        pass: tabCssStyle.inActive,
                                    });
                                    setTabStatus({
                                        apply: false,
                                        history: false,
                                        reject: true,
                                        pass: false,
                                    });
                                    getDataReject();
                                }}
                            >
                                Reject Data
                            </a>
                        </li>
                        <li className="me-2">
                            <a
                                href="#"
                                className={tabs.pass}
                                onClick={() => {
                                    setTabs({
                                        apply: tabCssStyle.inActive,
                                        history: tabCssStyle.inActive,
                                        prev: tabCssStyle.prev,
                                        reject: tabCssStyle.inActive,
                                        pass: tabCssStyle.active,
                                    });
                                    setTabStatus({
                                        apply: false,
                                        history: false,
                                        reject: false,
                                        pass: true,
                                    });
                                    getDataPass();
                                }}
                            >
                                Pass Data
                            </a>
                        </li>
                    </ul>
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-md">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-start bg-sky-500 p-3 mt-2 mb-5 text-white font-bold border-b-2 border-white rounded-md">
                                {vacancy.job_name}
                            </div>
                            {/* apply data */}
                            {tabStatus.apply === true ? (
                                <>
                                    <div className="grid grid-cols-2 pb-4 mb-4 border-b">
                                        <div className="text-lg flex flex-row">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 cursor-pointer stroke-sky-950 hover:stroke-slate-300"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                                />
                                            </svg>
                                            <span className="ms-2">
                                                List of data
                                            </span>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => reloadData()}
                                                className="bg-slate-200 text-sky-950 py-2 px-3 text-md hover:font-semibold rounded-s-md inline-flex hover:bg-sky-500 hover:border-none hover:border hover:border-sky-500 hover:text-white"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-5 h-6 me-1"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                                    />
                                                </svg>
                                                Reload
                                            </button>
                                            <button
                                                onClick={() => showFormReject()}
                                                className="bg-slate-200 text-sky-950 py-2 px-3 text-md hover:font-semibold inline-flex hover:bg-rose-500 hover:border-none hover:border hover:border-rose-500 hover:text-white"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-6 me-1 hover:font-bold"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                                Reject
                                            </button>
                                            <button
                                                onClick={() => showFormPass()}
                                                className="bg-slate-200 text-sky-950 py-2 px-3 text-md hover:font-semibold inline-flex hover:bg-emerald-500 hover:border-none hover:border hover:border-emerald-500 hover:text-white"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-6 me-1 hover:font-bold"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                                    />
                                                </svg>
                                                Accept
                                            </button>

                                            <button
                                                onClick={() => showFormInvite()}
                                                className="bg-slate-200 text-sky-950 py-2 px-3 text-md hover:font-semibold rounded-e-md inline-flex hover:bg-blue-500 hover:border-none hover:border hover:border-blue-500 hover:text-white"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-6 me-1 hover:font-bold"
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
                                        <div className="flex flex-wrap">
                                            <div>
                                                <select
                                                    className="text-xs rounded-md me-4"
                                                    onChange={(e) =>
                                                        filterData(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        -- Please Select Stage
                                                        --
                                                    </option>
                                                    {stagesdata.map((dt, i) => {
                                                        return (
                                                            <option
                                                                key={i}
                                                                value={dt.id}
                                                            >
                                                                {dt.name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className="text-xs rounded-md w-64 me-4"
                                                    placeholder="Search"
                                                />
                                            </div>
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
                                                            defaultChecked={
                                                                isCheckAll
                                                            }
                                                        />
                                                    </th>
                                                    <th className="pb-3 pt-3">
                                                        Name
                                                    </th>
                                                    <th>Sex</th>
                                                    <th>Age</th>
                                                    <th>Stage</th>
                                                    <th>Status</th>
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
                                                                    name={
                                                                        apply.id
                                                                    }
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
                                                                        apply
                                                                            .user_apply
                                                                            .first_name
                                                                    }{" "}
                                                                    {
                                                                        apply
                                                                            .user_apply
                                                                            .last_name
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {
                                                                    apply
                                                                        .user_apply
                                                                        .sex
                                                                }
                                                            </td>
                                                            <td>
                                                                {apply
                                                                    .user_apply
                                                                    .date_of_birth ===
                                                                null
                                                                    ? ""
                                                                    : age(
                                                                          apply
                                                                              .user_apply
                                                                              .date_of_birth
                                                                      )}
                                                            </td>
                                                            <td>
                                                                {
                                                                    apply.stage
                                                                        .name
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    apply.status
                                                                        .name
                                                                }
                                                            </td>
                                                            <td>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    stroke="currentColor"
                                                                    className="w-6 h-6 cursor-pointer stroke-sky-600 hover:stroke-slate-300"
                                                                    onClick={() =>
                                                                        showHistory(
                                                                            apply.selections
                                                                        )
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
                                </>
                            ) : (
                                <></>
                            )}

                            {tabStatus.history === true ? (
                                <div className="rounded-md overflow-y-auto">
                                    <div className="flex flex-row">
                                        <div className="font-semibold">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 cursor-pointer stroke-sky-950 hover:stroke-slate-300"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                                />
                                            </svg>
                                        </div>
                                        <div className="text-lg ms-2">
                                            History Invites
                                        </div>
                                    </div>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4 border-b border-t">
                                        <thead className="text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="font-bold">
                                                <th className="pb-3 pt-3 ps-3">
                                                    Name
                                                </th>
                                                <th>Email</th>
                                                <th>Stage</th>
                                                <th>Interview Jadual</th>
                                                <th>Confirmation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invites.map((value, i) => {
                                                return (
                                                    <tr
                                                        className="border-b"
                                                        key={i}
                                                    >
                                                        <td className="p-3">
                                                            {
                                                                value
                                                                    .vacancy_apply
                                                                    .user_apply
                                                                    .first_name
                                                            }{" "}
                                                            {
                                                                value
                                                                    .vacancy_apply
                                                                    .user_apply
                                                                    .last_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                value
                                                                    .vacancy_apply
                                                                    .user_apply
                                                                    .email
                                                            }
                                                        </td>
                                                        <td>
                                                            {value.stage.name}
                                                        </td>
                                                        <td>
                                                            <span className="bg-sky-800 text-white py-1 px-2 text-xs rounded-xl font-semibold">
                                                                {moment(
                                                                    value.date_interview
                                                                ).format(
                                                                    "DD-MM-YYYY"
                                                                )}{" "}
                                                                {
                                                                    value.time_interview
                                                                }
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {value.confirmation ===
                                                            1 ? (
                                                                <span className="bg-green-600 py-1 px-3 rounded-xl text-xs text-white font-bold">
                                                                    Yes
                                                                </span>
                                                            ) : (
                                                                <span className="bg-red-600 py-1 px-3 rounded-xl text-xs text-white font-bold">
                                                                    No
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <></>
                            )}

                            {tabStatus.reject === true ? (
                                <div className="rounded-md overflow-y-auto">
                                    <div className="grid grid-cols-2">
                                        <div className="text-lg flex flex-row">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 cursor-pointer stroke-sky-950 hover:stroke-slate-300"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                                />
                                            </svg>
                                            Data apply rejected
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => showFormChange()}
                                                className="bg-slate-200 text-sky-950 py-2 px-3 text-md hover:font-semibold rounded-md inline-flex hover:bg-rose-500 hover:border-none hover:border hover:border-rose-500 hover:text-white"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-6 me-1 hover:font-bold"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-6 border-b border-t">
                                        <thead className="text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="font-bold">
                                                <th className="pb-3 pt-3 text-center w-20">
                                                    <input
                                                        className="rounded-sm"
                                                        type="checkbox"
                                                        onChange={(e) =>
                                                            checkAllRejects(e)
                                                        }
                                                        defaultChecked={
                                                            isRejectCheckAll
                                                        }
                                                    />
                                                </th>
                                                <th className="pb-3 pt-3">
                                                    Name
                                                </th>
                                                <th>Sex</th>
                                                <th>Age</th>
                                                <th>Stage</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataRejects.map((apply) => {
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
                                                                    checkedReject(
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
                                                                    apply
                                                                        .user_apply
                                                                        .first_name
                                                                }{" "}
                                                                {
                                                                    apply
                                                                        .user_apply
                                                                        .last_name
                                                                }
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {
                                                                apply.user_apply
                                                                    .sex
                                                            }
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
                                                        <td>
                                                            {apply.stage.name}
                                                        </td>
                                                        <td>
                                                            {apply.status.name}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <></>
                            )}

                            {tabStatus.pass === true ? (
                                <div className="rounded-md overflow-y-auto">
                                    <div className="grid grid-cols-2">
                                        <div className="flex flex-row">
                                            <div className="font-semibold">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6 cursor-pointer stroke-sky-950 hover:stroke-slate-300"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="text-lg ms-2">
                                                Data apply passed
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() =>
                                                    showFormPassChange()
                                                }
                                                className="bg-slate-200 text-sky-950 py-2 px-3 text-md hover:font-semibold rounded-md inline-flex hover:bg-rose-500 hover:border-none hover:border hover:border-rose-500 hover:text-white"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-6 me-1 hover:font-bold"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-6 border-b border-t">
                                        <thead className="text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="font-bold">
                                                <th className="pb-3 pt-3 text-center w-20">
                                                    <input
                                                        className="rounded-sm"
                                                        type="checkbox"
                                                        onChange={(e) =>
                                                            checkAllPass(e)
                                                        }
                                                        defaultChecked={
                                                            isPassCheckAll
                                                        }
                                                    />
                                                </th>
                                                <th className="pb-3 pt-3">
                                                    Name
                                                </th>
                                                <th>Sex</th>
                                                <th>Age</th>
                                                <th>Stage</th>
                                                <th>Status</th>
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
                                            {dataPass.map((apply) => {
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
                                                                    checkedPass(
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
                                                                    apply
                                                                        .user_apply
                                                                        .first_name
                                                                }{" "}
                                                                {
                                                                    apply
                                                                        .user_apply
                                                                        .last_name
                                                                }
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {
                                                                apply.user_apply
                                                                    .sex
                                                            }
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
                                                        <td>
                                                            {apply.stage.name}
                                                        </td>
                                                        <td>
                                                            {apply.status.name}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="bg-slate-400 p-1 rounded hover:bg-blue-500"
                                                                title="Cancel Reject"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    stroke="currentColor"
                                                                    className="w-5 h-5 stroke-white"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Confirm
                show={modalPass}
                question="Are you sure pass this apply ?"
                yes={pass}
                no={exitFormPass}
            />

            <Confirm
                show={modalReject}
                question="Are you sure reject this apply ?"
                yes={reject}
                no={exitFormReject}
            />

            <Toast
                show={showToast}
                message={toastData.message}
                time={10000}
                falseShow={falseShow}
                color={toastData.color}
            />

            {/* modal history invite */}
            <Modal show={modalHistory}>
                <Dialog.Panel className="transform overflow-hidde bg-gray-100 rounded-2xl p-6 text-left align-middle shadow-xl transition-all h-screen">
                    <div className="grid grid-cols-2 ">
                        <div className="text-2xl font-semibold">
                            History Invites
                        </div>
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
                    <div className="mt-4 pb-10">
                        <ul>
                            {historyData.map((value, i) => {
                                return (
                                    <li
                                        key={i}
                                        className="bg-white p-4 rounded-md"
                                    >
                                        <span className="bg-sky-950 py-1 px-3 text-white rounded-xl text-sm">
                                            {value.stage.name}
                                        </span>
                                        <p className="mt-1">
                                            {value.stage.desc}
                                        </p>
                                        <p>
                                            Jadual Interview:{" "}
                                            {moment(
                                                value.date_interview
                                            ).format("DD-MM-YYYY")}{" "}
                                            {value.time_interview}
                                        </p>
                                        <p>
                                            {value.confirmation === 1 ? (
                                                <span className="bg-green-600 text-white text-xs py-1 px-2 rounded-xl">
                                                    Confirmation
                                                </span>
                                            ) : (
                                                <span className="bg-red-600 text-white text-xs py-1 px-2 rounded-xl">
                                                    No Confirmation
                                                </span>
                                            )}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </Dialog.Panel>
            </Modal>

            {/* modal invite  */}
            <Modal show={modalInvite}>
                <Dialog.Panel className="transform overflow-hidde bg-white rounded-2xl p-6 text-left align-middle shadow-xl transition-all h-screen">
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
                            <div className="w-full shadow-lg bg-white py4 px-6 rounded-md py-6 h-full">
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

            {/* modal change status  */}
            <Modal show={modalChange}>
                <Dialog.Panel className="transform overflow-hidde bg-white rounded-2xl p-6 text-left align-middle shadow-xl transition-all h-screen">
                    <div className="grid grid-cols-2 ">
                        <div className="text-2xl font-bold">
                            Form Change Status
                        </div>
                        <div className="justify-items-end">
                            <button
                                type="button"
                                className="float-right py-1 px-2 justify-center rounded border border-transparent bg-red-600  text-sm font-medium text-white hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => closeModalChange()}
                            >
                                X
                            </button>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-4 justify-items-center mt-4 pb-10 h-full">
                        <div className="w-full ">
                            <div className="w-full shadow-md bg-gradient-to-r from-sky-600 to-sky-500 py4 px-6 rounded-md py-6">
                                <h1 className="text-base font-semibold text-white">
                                    List of candidate to change status
                                </h1>
                                <table className="w-full text-sm text-left text-white dark:text-gray-400 mt-2 border-b border-t overflow-y-scroll">
                                    <thead className="text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="font-bold">
                                            <th className="p-2">Name</th>
                                            <th className="p-2">Age</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cancelData.apply.map((data) => {
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
                            <div className="w-full shadow-lg bg-white py4 px-6 rounded-md py-6 h-full">
                                <form>
                                    <div className="w-full">
                                        <label className="block mb-2">
                                            Status
                                        </label>
                                        <select
                                            className="rounded block w-full"
                                            name="stage"
                                            onChange={inviteCancel}
                                            defaultValue={inviteData.stage}
                                        >
                                            <option value="">
                                                ...Please Select...
                                            </option>
                                            {statusData?.map((status) => {
                                                return (
                                                    <option
                                                        key={status.id}
                                                        value={status.id}
                                                    >
                                                        {status.description}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </form>
                                <div className="flex flex-row mt-5">
                                    <button
                                        onClick={() => {
                                            cancel();
                                        }}
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
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                            />
                                        </svg>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Modal>

            {/* modal pass change status  */}
            <Modal show={modalPassChange}>
                <Dialog.Panel className="transform overflow-hidde bg-white rounded-2xl p-6 text-left align-middle shadow-xl transition-all h-screen">
                    <div className="grid grid-cols-2 ">
                        <div className="text-2xl font-bold">
                            Form Change Status
                        </div>
                        <div className="justify-items-end">
                            <button
                                type="button"
                                className="float-right py-1 px-2 justify-center rounded border border-transparent bg-red-600  text-sm font-medium text-white hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => closeModalPassChange()}
                            >
                                X
                            </button>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-4 justify-items-center mt-4 pb-10 h-full">
                        <div className="w-full ">
                            <div className="w-full shadow-md bg-gradient-to-r from-sky-600 to-sky-500 py4 px-6 rounded-md py-6">
                                <h1 className="text-base font-semibold text-white">
                                    List of candidate to change status
                                </h1>
                                <table className="w-full text-sm text-left text-white dark:text-gray-400 mt-2 border-b border-t overflow-y-scroll">
                                    <thead className="text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="font-bold">
                                            <th className="p-2">Name</th>
                                            <th className="p-2">Age</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cancelPassData.apply.map((data) => {
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
                            <div className="w-full shadow-lg bg-white py4 px-6 rounded-md py-6 h-full">
                                <form>
                                    <div className="w-full">
                                        <label className="block mb-2">
                                            Status
                                        </label>
                                        <select
                                            className="rounded block w-full"
                                            name="stage"
                                            onChange={invitePassCancel}
                                            defaultValue={inviteData.stage}
                                        >
                                            <option value="">
                                                ...Please Select...
                                            </option>
                                            {statusData?.map((status) => {
                                                return (
                                                    <option
                                                        key={status.id}
                                                        value={status.id}
                                                    >
                                                        {status.description}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </form>
                                <div className="flex flex-row mt-5">
                                    <button
                                        onClick={() => {
                                            passCancel();
                                        }}
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
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                            />
                                        </svg>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Modal>

            {/* modal cv  */}
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
                                {dataCv?.skills?.map((skill, i) => {
                                    return <p key={i}>{skill.description}</p>;
                                })}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Modal>
        </AuthenticatedLayout>
    );
}
