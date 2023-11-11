import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import parse from "html-react-parser";
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

export default function Dashboard({ auth, vacancy }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Vacancy
                </h2>
            }
        >
            <Head title="Detail" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-md">
                        <div className="p-6 text-gray-900">
                            <div className="bg-slate-50 p-3 text-black grid grid-flow-row auto-rows-max rounded-md">
                                {/* content */}
                                <div className="mb-5">
                                    <div className="bg-white pl-4 pt-2 pb-2 text-black h-ful">
                                        <img
                                            src="/storage/tailwin.png"
                                            width="80px"
                                            className="mb-2"
                                        />
                                        <p className="font-bold pb-2 text-2xl">
                                            {vacancy.job_name}
                                        </p>
                                    </div>
                                    <div className="bg-white pl-4 pt-2 pb-2 text-black h-ful">
                                        {parse(vacancy.description)}

                                        <table
                                            className="table-auto mt-2"
                                            cellPadding={3}
                                        >
                                            <tbody>
                                                <tr>
                                                    <td>Location</td>
                                                    <td>:</td>
                                                    <td>
                                                        {vacancy.city},{" "}
                                                        {vacancy.country}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Work Type</td>
                                                    <td>:</td>
                                                    <td>{vacancy.type.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Job Level</td>
                                                    <td>:</td>
                                                    <td>
                                                        {vacancy.level.name}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <div className="bg-white pl-4 pt-2 pb-2 text-black h-full">
                                        <p className="font-bold pb-2">
                                            QUALIFICATION
                                        </p>
                                        <div className="qual">
                                            {parse(vacancy.qualification)}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <div className="bg-white pl-4 pt-2 pb-2 text-black h-ful">
                                        <p className="font-bold pb-2">
                                            JOB DESC
                                        </p>
                                        <div className="qual">
                                            {parse(vacancy.job_desc)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
