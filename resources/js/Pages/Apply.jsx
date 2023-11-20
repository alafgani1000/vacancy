import InputLabel from "@/Components/InputLabel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import axios from "axios";
import Modal from "@/Components/Modal";
import { Dialog } from "@headlessui/react";

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

export default function Apply({ auth, vacancy }) {
    const [description, setDescription] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState({});

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`/vacancy/${vacancy.id}/apply`, {
                description: description,
            })
            .then((res) => {
                if (res.data.process === "error") {
                    setMessage(res.data);
                    setIsOpen(true);
                } else {
                    console.log(res);
                }
            })
            .catch((error) => {});
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Apply
                </h2>
            }
        >
            <Head title="Vacancy" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <div className="rounded-md rounded-tr-md bg-sky-950 p-3 mt-4 mb-4 text-white font-bold border-b-2 border-white shadow-md">
                            Apply Form
                        </div>
                        <section>
                            <form
                                onSubmit={handleSubmit}
                                className="mt-6 space-y-6"
                            >
                                {" "}
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
                                            setDescription(editor.getHTML());
                                        }}
                                    />
                                </div>
                                <div className="w-ful flex justify-end">
                                    <PrimaryButton className="text-lg text-center py-3 px-7">
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
                                        Send
                                    </PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
            <Modal show={isOpen}>
                <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-2xl font-medium leading-6 text-gray-900"
                    >
                        Apply not allowed
                    </Dialog.Title>
                    <div className="mt-4 text-lg">
                        <div>{message?.edu}</div>
                        <div>{message?.skill}</div>
                        <div>{message?.work}</div>
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
