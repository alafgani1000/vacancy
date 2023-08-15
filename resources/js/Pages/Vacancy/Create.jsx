import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

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

export default function Create({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add New Data
                </h2>
            }
        >
            <Head title="Vacancy" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <div className="rounded-md rounded-tr-md bg-sky-950 p-3 mt-4 mb-4 text-white font-bold border-b-2 border-white shadow-md">
                            LOREM IPSUM DATA
                        </div>
                        <section>
                            <form className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                    />
                                </div>
                                <div className="grid grid-cols-2">
                                    <div>
                                        <InputLabel
                                            htmlFor="title"
                                            value="Title"
                                        />
                                        <TextInput
                                            id="first_name"
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 space-y-6">
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
                                            setInvoice({
                                                ...invoice,
                                                remark: editor.getHTML(),
                                            });
                                        }}
                                    />
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
