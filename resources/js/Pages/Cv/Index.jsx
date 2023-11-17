import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Education from "./Partials/Education";
import WorkHistory from "./Partials/WorkHistory";
import Skill from "./Partials/Skill";
import UploadFoto from "./Partials/UploadFoto";

export default function Edit({ auth, mustVerifyEmail, educations, histories }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Curiculum Vite
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UploadFoto auth={auth} className="max-w-xl" />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <Education auth={auth} educations={educations} />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <WorkHistory histories={histories} />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <Skill className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
