import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Select from "@/Components/Select";
import TextArea from "@/Components/TextArea";
import { useState } from "react";

export default function UploadFoto({ auth, className = "" }) {
    const [file, setFile] = useState("");

    const { user } = auth;

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        router.post(
            `/cv/upload-photo`,
            {
                _method: "put",
                file: file,
            },
            {
                forceFormData: true,
                onError: () => {},
                onSuccess: () => {},
            }
        );
    };

    return (
        <section className={className}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <div className="shrink-0">
                        <img
                            src={
                                user.foto !== null
                                    ? `cv/${user.foto}`
                                    : `cv/profiles/default.jpg`
                            }
                            className="mb-2 w-20 p-2 rounded-md object-contain"
                        />
                    </div>
                    <div className="mt-5">
                        <div className="grid grid-cols-2">
                            <div>
                                <input
                                    className="block w-full text-sm round-s-md file: mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-300"
                                    id="file_input"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="px-4 text-xs ms-4 py-2 rounded-3xl bg-sky-950 text-white">
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
                    </div>
                </div>
            </form>
        </section>
    );
}
