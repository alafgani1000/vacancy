import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Select from "@/Components/Select";
import TextArea from "@/Components/TextArea";
import { useState } from "react";

export default function UpdatePersonalData({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const [formData, setFormData] = useState({});

    function submit(event) {
        event.preventDefault();
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
                    Personal Data
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's personal data
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Sex" />

                    <Select
                        name="sex"
                        defaultValue={user.sex}
                        onChange={handleChange}
                    >
                        <option value="">-- Please Select --</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Select>

                    <InputError className="mt-2" message="" />
                </div>

                <div>
                    <InputLabel htmlFor="phone_number" value="Phone Number" />

                    <TextInput
                        id="phone_number"
                        className="mt-1 block w-full"
                        value={user.phone_number}
                        onChange={handleChange}
                        name="phone_number"
                        required
                        isFocused
                        autoComplete="phone_number"
                    />

                    <InputError className="mt-2" message="" />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextArea
                        id="address"
                        className="mt-1 block w-full"
                        value={user.address}
                        onChange={handleChange}
                        name="address"
                        required
                        isFocused
                        autoComplete="address"
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
