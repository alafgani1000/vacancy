import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
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
                                        <p className="font-bold pb-2">
                                            LOREM IPSUM TITLE
                                        </p>
                                    </div>
                                    <div className="bg-white pl-4 pt-2 pb-2 text-black h-ful">
                                        <p>
                                            Lorem Ipsum is simply description
                                            dummy text of the printing and
                                            typesetting industry. Lorem Ipsum
                                            has been the industry's standard
                                            dummy text ever since the 1500s,
                                            when an unknown printer took a
                                            galley of type and scrambled it to
                                            make a type five
                                        </p>

                                        <table
                                            className="table-auto mt-2"
                                            cellPadding={3}
                                        >
                                            <tbody>
                                                <tr>
                                                    <td>Location</td>
                                                    <td>:</td>
                                                    <td>Jakarta, Indonesia</td>
                                                </tr>
                                                <tr>
                                                    <td>Work Type</td>
                                                    <td>:</td>
                                                    <td>Remote</td>
                                                </tr>
                                                <tr>
                                                    <td>Job Level</td>
                                                    <td>:</td>
                                                    <td>Junior</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <div className="bg-white pl-4 pt-2 pb-2 text-black h-full">
                                        <p className="font-bold pb-2">
                                            LOREM IPSUM QUALIFICATION
                                        </p>
                                        <ul className="list-disc list-inside">
                                            <li>
                                                Sed nec justo elementum,
                                                vestibulum augue sit amet,
                                                lacinia enim.
                                            </li>
                                            <li>
                                                Donec tempus augue sed eros
                                                tristique, ut euismod justo
                                                blandit.
                                            </li>
                                            <li>
                                                Cras ultricies ligula sit amet
                                                sem blandit, at facilisis magna
                                                blandit.
                                            </li>
                                            <li>
                                                Maecenas vel nisi in eros
                                                sollicitudin ultricies eu sit
                                                amet nisl.
                                            </li>
                                            <li>
                                                In et lacus ut lorem rhoncus
                                                molestie pretium sed enim.
                                            </li>
                                            <li>
                                                Curabitur vestibulum felis ac
                                                dictum molestie.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <div className="bg-white pl-4 pt-2 pb-2 text-black h-ful">
                                        <p className="font-bold pb-2">
                                            LOREM IPSUM JOB DESC
                                        </p>
                                        <ul className="list-disc list-inside">
                                            <li>
                                                Sed nec justo elementum,
                                                vestibulum augue sit amet,
                                                lacinia enim.
                                            </li>
                                            <li>
                                                Donec tempus augue sed eros
                                                tristique, ut euismod justo
                                                blandit.
                                            </li>
                                            <li>
                                                Cras ultricies ligula sit amet
                                                sem blandit, at facilisis magna
                                                blandit.
                                            </li>
                                            <li>
                                                Maecenas vel nisi in eros
                                                sollicitudin ultricies eu sit
                                                amet nisl.
                                            </li>
                                            <li>
                                                In et lacus ut lorem rhoncus
                                                molestie pretium sed enim.
                                            </li>
                                            <li>
                                                Curabitur vestibulum felis ac
                                                dictum molestie.
                                            </li>
                                        </ul>
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
