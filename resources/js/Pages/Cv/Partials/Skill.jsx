import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Select from "@/Components/Select";
import TextArea from "@/Components/TextArea";
import { useState } from "react";
import Confirm from "@/Components/Confirm";
import Toast from "@/Components/Toast";

export default function Skill({ mustVerifyEmail, skills, className = "" }) {
    const user = usePage().props.auth.user;
    const [errorMessage, setErrorMessage] = useState({
        skill: "",
    });
    const [formData, setFormData] = useState({
        skill: "",
    });
    const [isEdit, setIsEdit] = useState(false);
    const [idData, setIdData] = useState("");
    const [isConfirm, setIsConfirm] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastData, setToastData] = useState({
        message: "",
        color: "",
    });

    const submit = (event) => {
        event.preventDefault();
        if (isEdit) {
            update();
        } else {
            insert();
        }
    };

    const insert = () => {
        router.post("/cv/skill", formData, {
            preserveScroll: true,
            onError: function (errors) {
                if (errors.skill) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        skill: errors.skill,
                    }));
                }
            },
        });
    };

    const update = () => {
        router.put(`/cv/skill/${idData}/update`, formData, {
            preserveScroll: true,
            onError: function (errors) {
                if (errors.skill) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        skill: errors.skill,
                    }));
                }
            },
        });
    };

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleEdit = (data) => {
        setFormData({
            skill: data.description,
        });
        setIdData(data.id);
        setIsEdit(true);
    };

    const cancelEdit = () => {
        setFormData({
            skill: "",
        });
        setIdData("");
        setIsEdit(false);
    };

    const deleteConfirm = (data) => {
        setIsConfirm(true);
        setIdData(data.id);
    };

    const cancelDelete = () => {
        setIsConfirm(false);
        setIdData("");
    };

    const handleDelete = () => {
        router.delete(`/cv/skill/${idData}/delete`, {
            preserveScroll: true,
            onError: () => {
                setToastData({
                    message: "Delete Error",
                    color: "error",
                });
                setShowToast(true);
            },
            onSuccess: () => {
                setToastData({
                    message: "Delete Success",
                    color: "success",
                });
                setShowToast(true);
                reset();
            },
        });
    };

    const falseShow = () => {
        setShowToast(false);
    };

    const reset = () => {
        setFormData({ skill: "" });
        setIdData("");
        setIsConfirm(false);
    };

    return (
        <section className={className}>
            <div className="max-w-xl">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Skill Data
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Update your skill data
                    </p>
                </header>

                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="skill" value="Skill" />

                        <TextArea
                            id="skill"
                            className="mt-1 block w-full"
                            value={formData.skill}
                            onChange={handleChange}
                            name="skill"
                            required
                            isFocused
                            autoComplete="skill"
                        />

                        <InputError className="mt-2" message="" />
                    </div>

                    <div className="flex flex-col-2 gap-2">
                        <div className="flex items-center gap-4">
                            <PrimaryButton className="px-4 py-2">
                                {isEdit ? "Update" : "Save"}
                            </PrimaryButton>

                            <Transition
                                show={false}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </div>
                        {isEdit ? (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={cancelEdit}
                                    type="button"
                                    className="px-4 py-2 bg-red-600 rounded-md text-white text-sm"
                                >
                                    Cancel Edit
                                </button>

                                <Transition
                                    show={false}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600">
                                        Saved.
                                    </p>
                                </Transition>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </form>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-8">
                <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Skill</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((sk) => {
                        return (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={sk.id}
                            >
                                <td className="px-6 py-3">{sk.description}</td>
                                <td>
                                    <div className="inline-flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 bg-sky-700 p-1 m-1 text-white rounded-sm"
                                            onClick={() => handleEdit(sk)}
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
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 bg-red-600 p-1 m-1 text-white rounded-sm cursor-pointer"
                                            onClick={() => deleteConfirm(sk)}
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

            <Confirm
                show={isConfirm}
                question="Are you sure delete this data ?"
                yes={handleDelete}
                no={cancelDelete}
            />

            <Toast
                show={showToast}
                message={toastData.message}
                time={10000}
                falseShow={falseShow}
                color={toastData.color}
            />
        </section>
    );
}
