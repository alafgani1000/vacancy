import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Select from "@/Components/Select";
import TextArea from "@/Components/TextArea";
import { useState } from "react";

export default function UploadFoto({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const [file, setFile] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // router.post(
        //     `/vacancy/${vacancy.id}/apply`,
        //     {
        //         _method: "put",
        //         file: file,
        //         description: description,
        //     },
        //     {
        //         forceFormData: true,
        //         onError: () => {},
        //         onSuccess: () => {},
        //     }
        // );
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Skill Data
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your skill data
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        html="file_input"
                    >
                        Upload CV
                    </label>
                    <input
                        className="block w-full text-sm border rounded-md file:text-sm file:bg-sky-950 file:text-white file:py-2 file:rounded-bl-md file:rounded-tl-md"
                        id="file_input"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton className="px-4 py-2">Save</PrimaryButton>

                    <Transition
                        show={false}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
