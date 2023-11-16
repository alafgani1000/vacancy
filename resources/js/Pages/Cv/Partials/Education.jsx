import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Select from "@/Components/Select";
import TextArea from "@/Components/TextArea";
import { useState } from "react";

export default function Education({ mustVerifyEmail, status, className = "" }) {
    const user = usePage().props.auth.user;
    const [errorMessage, setErrorMessage] = useState({
        start: "",
        end: "",
        name: "",
        major: "",
        degree: "",
    });
    const [formData, setFormData] = useState({
        start: "",
        end: "",
        name: "",
        major: "",
        degree: "",
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
                    Education Data
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your educations data
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="start" value="Start" />

                    <TextInput
                        id="start"
                        className="mt-1 block w-full"
                        value={formData.start}
                        onChange={handleChange}
                        name="start"
                        required
                        isFocused
                        autoComplete="start"
                        type="date"
                    />

                    <InputError className="mt-2" message="" />
                </div>

                <div>
                    <InputLabel htmlFor="end" value="End" />

                    <TextInput
                        id="end"
                        className="mt-1 block w-full"
                        value={formData.end}
                        onChange={handleChange}
                        name="end"
                        required
                        isFocused
                        autoComplete="end"
                        type="date"
                    />

                    <InputError className="mt-2" message="" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="instition_name"
                        value="Institution Name"
                    />

                    <TextArea
                        id="instition_name"
                        className="mt-1 block w-full"
                        value={formData.instition_name}
                        onChange={handleChange}
                        name="instition_name"
                        required
                        isFocused
                        autoComplete="instition_name"
                    />

                    <InputError className="mt-2" message="" />
                </div>

                <div>
                    <InputLabel htmlFor="major" value="Major" />

                    <TextInput
                        id="major"
                        className="mt-1 block w-full"
                        value={formData.major}
                        onChange={handleChange}
                        name="major"
                        required
                        isFocused
                        autoComplete="major"
                    />

                    <InputError className="mt-2" message="" />
                </div>

                <div>
                    <InputLabel htmlFor="degree" value="Degree" />

                    <TextInput
                        id="degree"
                        className="mt-1 block w-full"
                        value={formData.degree}
                        onChange={handleChange}
                        name="degree"
                        required
                        isFocused
                        autoComplete="degree"
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
