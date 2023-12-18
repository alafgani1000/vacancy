import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import TextArea from "@/Components/TextArea";
import { useState } from "react";
import Confirm from "@/Components/Confirm";

export default function Education({
    mustVerifyEmail,
    auth,
    className = "",
    educations,
}) {
    const user = { auth };
    const [errorMessage, setErrorMessage] = useState({
        start: "",
        end: "",
        name: "",
        major: "",
        degree: "",
    });
    const [formData, setFormData] = useState({
        start: "",
        end: "",
        name: "",
        major: "",
        degree: "",
    });
    const [dataId, setDataId] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);

    const edit = (data) => {
        setDataId(data.id);
        setFormData(data);
        setIsEdit(true);
    };

    const canceEdit = () => {
        setDataId("");
        setFormData({
            start: "",
            end: "",
            name: "",
            major: "",
            degree: "",
        });
        setIsEdit(false);
    };

    const store = () => {
        router.post("/cv/education", formData, {
            onError: function (errors) {
                if (errors.from) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        from: errors.from,
                    }));
                }
                if (errors.to) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        to: errors.to,
                    }));
                }
                if (errors.institution_name) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        institution_name: errors.institution_name,
                    }));
                }
                if (errors.major) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        major: errors.major,
                    }));
                }
                if (errors.degree) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        degree: errors.degree,
                    }));
                }
            },
        });
    };

    const update = () => {
        router.put(`/cv/education/${dataId}/update`, formData, {
            preserveScroll: true,
            onError: function (errors) {
                if (errors.from) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        from: errors.from,
                    }));
                }
                if (errors.to) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        to: errors.to,
                    }));
                }
                if (errors.institution_name) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        institution_name: errors.institution_name,
                    }));
                }
                if (errors.major) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        major: errors.major,
                    }));
                }
                if (errors.degree) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        degree: errors.degree,
                    }));
                }
            },
        });
    };

    const submit = (event) => {
        event.preventDefault();
        if (isEdit === true) {
            update();
        } else {
            store();
        }
    };

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const deleteConfirm = (data) => {
        setDataId(data.id);
        setIsConfirm(true);
    };

    const deleteEducation = () => {
        router.delete(`/cv/education/${dataId}/delete`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsConfirm(false);
            },
            onError: () => {},
        });
    };

    const cancelDelete = () => {
        setIsConfirm(false);
    };

    return (
        <section className={className}>
            <div className="max-w-xl">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Education Data
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Update your educations data
                    </p>
                </header>

                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="from" value="Fom   " />

                            <TextInput
                                id="from"
                                className="mt-1 block w-full"
                                value={formData.start}
                                onChange={handleChange}
                                name="start"
                                isFocused
                                autoComplete="from"
                                type="date"
                            />

                            <InputError
                                className="mt-2"
                                message={errorMessage.from}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="to" value="To" />

                            <TextInput
                                id="to"
                                className="mt-1 block w-full"
                                value={formData.end}
                                onChange={handleChange}
                                name="end"
                                isFocused
                                autoComplete="to"
                                type="date"
                            />

                            <InputError
                                className="mt-2"
                                message={errorMessage.to}
                            />
                        </div>
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="institution_name"
                            value="Institution Name"
                        />

                        <TextArea
                            id="institution_name"
                            className="mt-1 block w-full"
                            value={formData.name}
                            onChange={handleChange}
                            name="name"
                            isFocused
                            autoComplete="institution_name"
                        />

                        <InputError
                            className="mt-2"
                            message={errorMessage.institution_name}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="major" value="Major" />

                        <TextInput
                            id="major"
                            className="mt-1 block w-full"
                            value={formData.major}
                            onChange={handleChange}
                            name="major"
                            isFocused
                            autoComplete="major"
                        />

                        <InputError
                            className="mt-2"
                            message={errorMessage.major}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="degree" value="Degree" />

                        <TextInput
                            id="degree"
                            className="mt-1 block w-full"
                            value={formData.degree}
                            onChange={handleChange}
                            name="degree"
                            isFocused
                            autoComplete="degree"
                        />

                        <InputError
                            className="mt-2"
                            message={errorMessage.degree}
                        />
                    </div>
                    <div className="flex flex-col-2 gap-2">
                        <div className="flex items-center gap-4">
                            <PrimaryButton className="px-4 py-2">
                                {isEdit === true ? "Update" : "Save"}
                            </PrimaryButton>

                            <Transition
                                show={false}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">
                                    {" "}
                                    {isEdit === true ? "Updated." : "Saved."}
                                </p>
                            </Transition>
                        </div>
                        {isEdit === true ? (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={canceEdit}
                                    type="button"
                                    className="px-4 py-2 bg-red-600 rounded-md text-white text-sm"
                                >
                                    Cancel
                                </button>

                                <Transition
                                    show={false}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600">
                                        Canceled.
                                    </p>
                                </Transition>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </form>
            </div>

            <div className="mt-8">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-gray-700 bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3.5">From</th>
                            <th className="px-6 py-3.5">To</th>
                            <th className="px-6 py-3.5">Institution</th>
                            <th className="px-6 py-3.5">Major</th>
                            <th className="px-6 py-3.5">Degree</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {educations.map((edu) => {
                            return (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={edu.id}
                                >
                                    <td className="px-6 py-4">{edu.start}</td>
                                    <td className="px-6 py-4">{edu.end}</td>
                                    <td className="px-6 py-4">{edu.name}</td>
                                    <td className="px-6 py-4">{edu.major}</td>
                                    <td className="px-6 py-4">{edu.degree}</td>
                                    <td>
                                        <div className="inline-flex">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 bg-sky-700 p-1 m-1 text-white rounded cursor-pointer"
                                                onClick={() => edit(edu)}
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
                                                className="w-6 h-6 bg-red-600 p-1 m-1 text-white rounded cursor-pointer"
                                                onClick={() =>
                                                    deleteConfirm(edu)
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
            </div>

            <Confirm
                show={isConfirm}
                question="Are you sure delete this data ?"
                yes={deleteEducation}
                no={cancelDelete}
            />
        </section>
    );
}
