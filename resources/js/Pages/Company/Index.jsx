import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, router } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import TextArea from "@/Components/TextArea";
import { useState } from "react";
import Confirm from "@/Components/Confirm";
import Toast from "@/Components/Toast";

export default function Education({
    mustVerifyEmail,
    auth,
    className = "",
    company,
}) {
    const [file, setFile] = useState("");
    const [errorMessage, setErrorMessage] = useState({
        name: "",
        phone_number: "",
        description: "",
    });
    const [formData, setFormData] = useState({
        name: company.name,
        phone_number: company.hp_number,
        description: company.desc,
    });
    const [showToast, setShowToast] = useState(false);
    const [toastData, setToastData] = useState({
        message: "",
        color: "",
    });

    const user = { auth };

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = (event) => {
        event.preventDefault();
        router.post(
            `/company/${company.id}/upload-logo`,
            {
                _method: "put",
                file: file,
            },
            {
                preserveScroll: true,
                forceFormData: true,
                onError: () => {
                    setToastData({
                        message: "Upload Error",
                        color: "error",
                    });
                    setShowToast(true);
                },
                onSuccess: () => {
                    setToastData({
                        message: "Upload Success",
                        color: "success",
                    });
                    setShowToast(true);
                },
            }
        );
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        router.put(`/company/${company.id}/update`, formData, {
            preserveScroll: true,
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

    const falseShow = () => {
        setShowToast(false);
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Company Data
                </h2>
            }
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className={className}>
                            <div className="max-w-xl">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Company Profile
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Update company profile data
                                    </p>
                                </header>

                                <img
                                    src={
                                        company.logo !== null
                                            ? `${company.logo}`
                                            : `company/default.jpg`
                                    }
                                    width="80px"
                                    className="mt-4"
                                />
                                <form onSubmit={handleUpload}>
                                    <div className="flex flex-col-2 mt-6">
                                        <div className="w-full">
                                            <input
                                                className="block w-full text-sm border round-s-md file:text-sm file:bg-sky-950 file:text-white file:py-2 file:rounded-bl-md file:rounded-tl-md"
                                                id="file_input"
                                                type="file"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button className="px-4 ms-4 py-2 rounded-md bg-sky-950 text-white">
                                                Upload
                                            </button>

                                            <Transition
                                                show={false}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">
                                                    Upload.
                                                </p>
                                            </Transition>
                                        </div>
                                    </div>
                                </form>

                                <form
                                    onSubmit={handleUpdate}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="company_name"
                                            value="Company Name"
                                        />

                                        <TextInput
                                            className="w-full"
                                            value={formData.name}
                                            onChange={handleChange}
                                            name="name"
                                        ></TextInput>

                                        <InputError
                                            className="mt-2"
                                            message=""
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="phone_number"
                                            value="Phone Number"
                                        />

                                        <TextInput
                                            type="number"
                                            className="w-full"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            name="phone_number"
                                        ></TextInput>

                                        <InputError
                                            className="mt-2"
                                            message=""
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="Description"
                                            value="Description"
                                        />

                                        <TextArea
                                            id="description"
                                            className="mt-1 block w-full"
                                            name="description"
                                            defaultValue={formData.description}
                                            isFocused
                                            autoComplete="description"
                                            onChange={handleChange}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message=""
                                        />
                                    </div>

                                    <div className="flex flex-col-2 gap-2">
                                        <div className="flex items-center gap-4">
                                            <PrimaryButton className="px-4 py-2">
                                                Update
                                            </PrimaryButton>

                                            <Transition
                                                show={false}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">
                                                    Updated.
                                                </p>
                                            </Transition>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
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
        </AuthenticatedLayout>
    );
}
