import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Select from "@/Components/Select";
import TextArea from "@/Components/TextArea";
import { useState } from "react";

export default function Skill({ mustVerifyEmail, status, className = "" }) {
    const user = usePage().props.auth.user;
    const [errorMessage, setErrorMessage] = useState({
        description: "",
    });
    const [formData, setFormData] = useState({
        description: "",
    });

    function submit(event) {
        event.preventDefault();
        router.patch("/personal-data", formData, {
            onError: function (errors) {
                if (errors.phone_number) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        [event.target.name]: event.target.value,
                    }));
                }
            },
        });
    }

    function handleChange(event) {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

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

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="description"
                        value="Institution Name"
                    />

                    <TextArea
                        id="Description"
                        className="mt-1 block w-full"
                        value={formData.description}
                        onChange={handleChange}
                        name="description"
                        required
                        isFocused
                        autoComplete="description"
                    />

                    <InputError className="mt-2" message="" />
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
