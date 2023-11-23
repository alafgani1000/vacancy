import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import parse from "html-react-parser";

export default function DetailApply({ auth, applies, vacancy }) {
    const { data, next_page_url, prev_page_url, total } = applies;
    console.log(data);
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Data Apply
                </h2>
            }
        >
            <Head title="Apply" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-md">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-start bg-sky-950 p-3 mt-4 mb-4 text-white font-bold border-b-2 border-white rounded-md">
                                {vacancy.job_name}
                            </div>
                            <div className="grid grid-cols-2 pb-2 px-1 mb-4 border-b border-b-sky-950">
                                <div>List of data</div>
                                <div className="w-full grid place-items-end pr-2">
                                    Total record: {total}
                                </div>
                            </div>
                            <div className="bg-slate-100 p-3 text-black grid grid-flow-rows auto-rows-max rounded-md">
                                {/* content */}
                                {data.map((apply) => {
                                    return (
                                        <div
                                            className="mb-4 shadow-blue-100"
                                            key={apply.id}
                                        >
                                            <div className="bg-white pl-4 pr-4 pt-3 pb-3 text-black h-full rounded-md hover:bg-sky-500 hover:text-white hover:cursor-pointer">
                                                <p className="">
                                                    {
                                                        apply.user_apply
                                                            .first_name
                                                    }{" "}
                                                    {apply.user_apply.last_name}
                                                </p>
                                                {parse(apply.message)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* page */}
                            <div className="grid grid-cols-2 mt-4 py-2 px-8">
                                <div className="flex justify-end py-4 pe-4">
                                    {prev_page_url !== null ? (
                                        <NavLink
                                            href={prev_page_url}
                                            className="bg-sky-500 pt-3 pb-2 px-6 rounded-full text-white font-medium"
                                        >
                                            Prev
                                        </NavLink>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="flex justify-start py-4 px-4">
                                    {next_page_url !== null ? (
                                        <NavLink
                                            href={next_page_url}
                                            className="bg-sky-500 pt-3 pb-2 px-6 rounded-full text-white font-medium"
                                        >
                                            Next
                                        </NavLink>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
