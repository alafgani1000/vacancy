import LinkNumber from "@/Components/LinkNumber";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Fragment, useState, useEffect, useRef } from "react";
import { Head, router } from "@inertiajs/react";
import { Dialog, Transition } from "@headlessui/react";
import Toast from "@/Components/Toast";
import axios from "axios";
import pickBy from "loadsh/pickBy";
import Modal from "@/Components/Modal";
import Confirm from "@/Components/Confirm";

export default function Index({ auth, status, page }) {
    const [showForm, setShowForm] = useState(false);
    const [current, setCurrent] = useState(page);
    const [isLoad, setIsLoad] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [errorMessage, setErrorMessage] = useState({
        name: "",
        description: "",
    });
    const [dataStatus, setDataStatus] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [toastData, setToastData] = useState({
        message: "",
        color: "",
    });

    let startPage = useRef();
    let endPage = useRef();

    const { data, last_page, total } = status;
    console.log(status);

    useEffect(() => {
        if (wasSearch) {
            const query = Object.keys(pickBy(search)).length
                ? pickBy(search)
                : { remember: "forget" };
            router.get(
                route(route().current()),
                { search: search },
                {
                    onSuccess: setCurrent(1),
                    replace: true,
                    preserveState: true,
                }
            );
        }
        setIsLoad(true);
    }, [search]);

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };

    const pagination = (currentPage, totalPage, jumlahPerpage) => {
        if (currentPage === null) {
            currentPage = 1;
        }
        let start = 0;
        let end = 0;
        if (currentPage <= totalPage) {
            let countBreak = Math.floor(currentPage / (jumlahPerpage - 2.5));
            if (currentPage >= 1 && currentPage < jumlahPerpage) {
                if (totalPage <= 5) {
                    start = jumlahPerpage - (jumlahPerpage - 1);
                    end = totalPage;
                } else {
                    start = jumlahPerpage - (jumlahPerpage - 1);
                    end = jumlahPerpage;
                }
            } else {
                start = (countBreak - 1) * (jumlahPerpage - 2) + 1;
                end = start + (jumlahPerpage - 1);
            }
            if (end > totalPage) {
                end = totalPage;
            }
            startPage.current = start;
            endPage.current = end;
        }
    };

    const wasSearch = usePrevious(search);
    pagination(current, last_page, 5);

    const reset = () => {
        setErrorMessage({
            name: "",
            description: "",
        });
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const showFormStatus = (status) => {
        if (status === true) {
            setFormData({
                name: "",
                description: "",
            });
            reset();
            setShowForm(status);
        } else {
            setShowForm(status);
            setEditId("");
        }
    };

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleStore = () => {
        router.post("/status", formData, {
            onError: (errors) => {
                if (errors.name) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        name: errors.name,
                    }));
                }

                if (errors.description) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        description: errors.description,
                    }));
                }
            },
        });
    };

    const handleUpdate = (id) => {
        router.put(`/status/${id}/update`, formData, {
            onSuccess: () => {
                setToastData({
                    message: "Update Success",
                    color: "success",
                });
                setShowToast(true);
            },
            onError: () => {
                setToastData({
                    message: "Update Error",
                    color: "error",
                });
                setShowToast(true);
            },
        });
    };

    const handleEdit = (id) => {
        axios
            .get(`/status/${id}/edit`, {})
            .then(({ data }) => {
                setEditId(data.id);
                setFormData({
                    name: data.name,
                    description: data.desc,
                });
                setShowForm(true);
            })
            .catch((error) => {
                openModal();
            });
    };

    const falseShow = () => {
        setShowToast(false);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
    };

    const deleteStatus = () => {
        router.delete(`/status/${dataStatus.id}/delete`, {
            preserveScroll: true,
            onSuccess: () => {
                setToastData({
                    message: "Delete Success",
                    color: "success",
                });
                setShowToast(true);
                setShowConfirm(false);
            },
            onError: () => {
                setToastData({
                    message: "Delete Error",
                    color: "error",
                });
                setShowToast(true);
            },
        });
    };

    const confirmDelete = (status) => {
        setDataStatus(status);
        setShowConfirm(true);
    };

    const Pagenumber = () => {
        let rows = [];
        for (let i = startPage.current; i <= endPage.current; i++) {
            rows.push(i);
        }
        if (total > 0) {
            return (
                <div className="w-full ms-2 me-2 mt-4">
                    <LinkNumber
                        href={route("status.index", { page: 1 })}
                        active={route().current("status.index", {
                            page: 1,
                        })}
                        className="bg-sky-500 pt-2 pb-1 px-3 mx-1 text-white rounded-md"
                    >
                        First
                    </LinkNumber>
                    {rows.map((value) => {
                        return (
                            <LinkNumber
                                key={value}
                                href={route("status.index", {
                                    search: search,
                                    page: value,
                                })}
                                active={route().current("status.index", {
                                    page: value,
                                })}
                                className="bg-sky-500 pt-2 pb-1 px-3 mx-1 text-white rounded-md"
                                onClick={() => setCurrent(value)}
                            >
                                {value}
                            </LinkNumber>
                        );
                    })}
                    <LinkNumber
                        href={route("status.index", { page: last_page })}
                        active={route().current("status.index", {
                            page: last_page,
                        })}
                        className="bg-sky-500 pt-2 pb-1 px-3 mx-1 text-white rounded-md"
                    >
                        Last
                    </LinkNumber>
                    <span className="ml-4 py-2 px-4 bg-sky-600 text-white rounded-sm">
                        Total Page: {last_page}
                    </span>
                </div>
            );
        } else {
            return <></>;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Status
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="py-4 px-6 text-gray-900">
                            <div className="flex justify-end mb-4">
                                {showForm === false ? (
                                    <button
                                        onClick={() => showFormStatus(true)}
                                        className="bg-sky-950 px-2 pt-2 pb-2 text-white font-medium shadow-md rounded-md"
                                    >
                                        New Status
                                    </button>
                                ) : (
                                    <div className="w-full p-3 rounded-md shadow-md">
                                        <div className="w-full grid grid-cols-3">
                                            <div className="mx-2">
                                                <InputLabel
                                                    htmlFor="name"
                                                    value="Name"
                                                />
                                                <TextInput
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full"
                                                />
                                                <InputLabel
                                                    className="mt-2 text-red-600"
                                                    htmlFor="name"
                                                    value={errorMessage.name}
                                                />
                                            </div>
                                            <div className="mx-2">
                                                <InputLabel
                                                    htmlFor="description"
                                                    value="Description"
                                                />
                                                <TextInput
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full"
                                                />
                                                <InputLabel
                                                    className="mt-2 text-red-600"
                                                    htmlFor="name"
                                                    value={
                                                        errorMessage.description
                                                    }
                                                />
                                            </div>
                                            <div className="mx-2">
                                                <div className="mt-4">
                                                    {editId === "" ? (
                                                        <button
                                                            onClick={
                                                                handleStore
                                                            }
                                                            className="bg-sky-700 px-2 pt-2 pb-2 text-white font-medium shadow-md rounded-l-md mt-2 mr-0"
                                                        >
                                                            Save
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() =>
                                                                handleUpdate(
                                                                    editId
                                                                )
                                                            }
                                                            className="bg-sky-700 px-2 pt-2 pb-2 text-white font-medium shadow-md rounded-l-md mt-2 mr-0"
                                                        >
                                                            Update
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() =>
                                                            showFormStatus(
                                                                false
                                                            )
                                                        }
                                                        className="bg-red-700 px-2 pt-2 pb-2 mt-2 text-white font-medium shadow-md rounded-r-md ml-0"
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="rounded-2xl border-gray-300"
                                        placeholder="Search..."
                                        onChange={(event) => {
                                            setSearch(event.target.value);
                                        }}
                                        value={search}
                                    />
                                </div>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3">Name</th>
                                            <th className="px-6 py-3">
                                                Description
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((stage) => {
                                            return (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={stage.id}
                                                >
                                                    <td className="px-6 py-3">
                                                        {stage.name}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        {stage.desc}
                                                    </td>
                                                    <td>
                                                        <div className="inline-flex">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="w-6 h-6 bg-sky-700 p-1 m-1 text-white rounded-sm"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        stage.id
                                                                    )
                                                                }
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                                />
                                                            </svg>

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="w-6 h-6 bg-red-600 p-1 m-1 text-white rounded-sm"
                                                                onClick={() =>
                                                                    confirmDelete(
                                                                        stage
                                                                    )
                                                                }
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                {isLoad === true ? <Pagenumber /> : ""}
                            </div>
                        </div>
                    </div>
                </div>
                <Toast
                    show={showToast}
                    message={toastData.message}
                    time={10000}
                    falseShow={falseShow}
                    color={toastData.color}
                />
                <Confirm
                    show={showConfirm}
                    question="Are you sure delete this data ?"
                    yes={deleteStatus}
                    no={cancelDelete}
                />
            </div>
            <Modal show={isOpen}>
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        Input Error
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Proses data error
                        </p>
                    </div>

                    <div className="mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                        >
                            Close!
                        </button>
                    </div>
                </Dialog.Panel>
            </Modal>
        </AuthenticatedLayout>
    );
}
