import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Index({ auth, stages }) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });

    const showFormStage = (status) => {
        if (status === true) {
            setFormData({
                name: "",
                description: "",
            });
        }
        setShowForm(status);
    };

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleStore = () => {
        router.post("/stage", formData);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Stages
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
                                        onClick={() => showFormStage(true)}
                                        className="bg-sky-950 px-2 pt-2 pb-2 text-white font-medium shadow-md rounded-md"
                                    >
                                        New Stage
                                    </button>
                                ) : (
                                    <div className="w-full border-2 p-4 rounded-md shadow-sm">
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
                                            </div>
                                            <div className="mx-2">
                                                <div className="mt-4">
                                                    <button
                                                        onClick={handleStore}
                                                        className="bg-sky-700 px-2 pt-2 pb-2 text-white font-medium shadow-md rounded-l-md mt-2 mr-0"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            showFormStage(false)
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
                                    {stages.map((stage) => {
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
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
