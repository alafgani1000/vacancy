import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import InputError from "@/Components/InputError";
import Toast from "@/Components/Toast";

const modules = {
    toolbar: [
        //[{ 'font': [] }],
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
        ["clean"],
    ],
};

const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
];

export default function Create({ auth, workTypes, jobLevels }) {
    const [dataForm, setDataForm] = useState({
        title: "",
        work_type: "",
        job_level: "",
        description: "",
        qualification: "",
        job_desc: "",
        city: "",
        country: "",
        end_date: "",
    });
    const [errorMessage, setErrorMessage] = useState({
        title: "",
        work_type: "",
        job_level: "",
        description: "",
        qualification: "",
        job_desc: "",
        city: "",
        country: "",
        end_date: "",
    });

    // handle change form
    const handleChange = (event) => {
        setDataForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    //handle submit
    const handleSubmit = (event) => {
        event.preventDefault();
        router.post("/vacancy", dataForm, {
            onError: function (errors) {
                if (errors.title) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        title: errors.title,
                    }));
                }

                if (errors.work_type) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        work_type: errors.work_type,
                    }));
                }

                if (errors.job_level) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        job_level: errors.job_level,
                    }));
                }

                if (errors.city) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        city: errors.city,
                    }));
                }

                if (errors.country) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        country: errors.country,
                    }));
                }

                if (errors.end_date) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        end_date: errors.end_date,
                    }));
                }

                if (errors.description) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        description: errors.description,
                    }));
                }

                if (errors.qualification) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        qualification: errors.qualification,
                    }));
                }

                if (errors.job_desc) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        job_desc: errors.job_desc,
                    }));
                }
            },
            onSuccess: function () {},
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create New Vacancy
                </h2>
            }
        >
            <Head title="Vacancy" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <div className="rounded-md rounded-tr-md bg-sky-950 p-3 mt-4 mb-4 text-white font-bold border-b-2 border-white shadow-md">
                            Create New Vacancy
                        </div>
                        <section>
                            <form
                                onSubmit={handleSubmit}
                                className="mt-6 space-y-6"
                            >
                                <div>
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={dataForm.title}
                                        className="mt-1 block w-full"
                                        onChange={handleChange}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errorMessage.title}
                                    />
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="mr-4">
                                        <InputLabel
                                            htmlFor="work_type"
                                            value="Work Type"
                                        />
                                        <select
                                            id="small"
                                            name="work_type"
                                            defaultValue={dataForm.work_type}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                                        >
                                            <option value="">
                                                -- Please select --
                                            </option>
                                            {workTypes.map((data) => {
                                                return (
                                                    <option
                                                        key={data.id}
                                                        value={data.id}
                                                    >
                                                        {data.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <InputError
                                            className="mt-2"
                                            message={errorMessage.work_type}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="job_level"
                                            value="Job Level"
                                        />
                                        <select
                                            id="small"
                                            name="job_level"
                                            defaultValue={dataForm.job_level}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                                        >
                                            <option value="">
                                                -- Please select --
                                            </option>
                                            {jobLevels.map((data) => {
                                                return (
                                                    <option
                                                        key={data.id}
                                                        value={data.id}
                                                    >
                                                        {data.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <InputError
                                            className="mt-2"
                                            message={errorMessage.job_level}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3">
                                    <div className="mr-4">
                                        <InputLabel
                                            htmlFor="city"
                                            value="City"
                                        />
                                        <TextInput
                                            id="city"
                                            name="city"
                                            value={dataForm.city}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errorMessage.city}
                                        />
                                    </div>
                                    <div className="mr-4">
                                        <InputLabel
                                            htmlFor="country"
                                            value="Country"
                                        />
                                        <TextInput
                                            id="country"
                                            name="country"
                                            value={dataForm.country}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errorMessage.country}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="end_date"
                                            value="End Date"
                                        />
                                        <TextInput
                                            id="end_date"
                                            name="end_date"
                                            value={dataForm.end_date}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                            type="date"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errorMessage.end_date}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 space-y-2">
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />
                                    <ReactQuill
                                        style={{ height: "100%" }}
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        onChange={(
                                            content,
                                            delta,
                                            source,
                                            editor
                                        ) => {
                                            setDataForm((prev) => ({
                                                ...prev,
                                                description: editor.getHTML(),
                                            }));
                                        }}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errorMessage.description}
                                    />
                                </div>
                                <div className="mt-6 space-y-2">
                                    <InputLabel
                                        htmlFor="qualification"
                                        value="Qualification"
                                    />
                                    <ReactQuill
                                        style={{ height: "100%" }}
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        onChange={(
                                            content,
                                            delta,
                                            source,
                                            editor
                                        ) => {
                                            setDataForm((prev) => ({
                                                ...prev,
                                                qualification: editor.getHTML(),
                                            }));
                                        }}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errorMessage.qualification}
                                    />
                                </div>
                                <div className="mt-6 space-y-2">
                                    <InputLabel
                                        htmlFor="job_desc"
                                        value="Job Desc"
                                    />
                                    <ReactQuill
                                        style={{ height: "100%" }}
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        onChange={(
                                            content,
                                            delta,
                                            source,
                                            editor
                                        ) => {
                                            setDataForm((prev) => ({
                                                ...prev,
                                                job_desc: editor.getHTML(),
                                            }));
                                        }}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errorMessage.job_desc}
                                    />
                                </div>
                                <div className="w-full block">
                                    <PrimaryButton className="text-lg text-center py-3 px-5">
                                        <span>
                                            <svg
                                                className="w-3.5 h-3.5 text-white mr-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 16"
                                            >
                                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                            </svg>
                                        </span>
                                        Save
                                    </PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
