import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, stages }) {
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
                                <NavLink
                                    href={route("vacancy.create")}
                                    active={route().current("vacancy.create")}
                                    className="bg-sky-950 px-2 pt-2 pb-2 text-white font-semibold shadow-md hover:text-sky-500 hover:bg-white rounded-md"
                                >
                                    + New Stage
                                </NavLink>
                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">
                                            Description
                                        </th>
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
