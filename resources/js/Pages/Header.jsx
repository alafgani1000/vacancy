import { useState } from "react";
import { Link, Head } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

export default function Header({ user, header }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const auth = user;
    const { access } = user;
    const verified = auth.user ? auth.user.email_verified_at : "";
    return (
        <>
            {verified === null ? (
                <div className="text-center py-1 bg-pink-400 text-white">
                    Please verify .........
                </div>
            ) : (
                ""
            )}
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <>
                                    <NavLink
                                        href={route("home")}
                                        active={route().current("home")}
                                    >
                                        Home
                                    </NavLink>
                                </>
                                {auth.user ? (
                                    <>
                                        {access.name === "Job Seeker" ? (
                                            <>
                                                <NavLink
                                                    href={route("cv.index")}
                                                    active={route().current(
                                                        "cv.index"
                                                    )}
                                                >
                                                    Curiculum Vite
                                                </NavLink>
                                                <NavLink
                                                    href={route(
                                                        "apply.history"
                                                    )}
                                                    active={route().current(
                                                        "apply.history"
                                                    )}
                                                >
                                                    History
                                                </NavLink>
                                            </>
                                        ) : (
                                            ""
                                        )}

                                        {access.name === "Company" ? (
                                            <>
                                                <NavLink
                                                    href={route(
                                                        "vacancy.index"
                                                    )}
                                                    active={route().current(
                                                        "vacancy.index"
                                                    )}
                                                >
                                                    Vacancy
                                                </NavLink>
                                                <NavLink
                                                    href={route(
                                                        "company.index"
                                                    )}
                                                    active={route().current(
                                                        "company.index"
                                                    )}
                                                >
                                                    Company
                                                </NavLink>
                                                <NavLink
                                                    href={route("apply.index")}
                                                    active={route().current(
                                                        "apply.index"
                                                    )}
                                                >
                                                    Apply
                                                </NavLink>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                        {access.name === "Admin" ? (
                                            <>
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <span className="inline-flex rounded-md">
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center px-3 py-2 mt-4 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                            >
                                                                Master Data
                                                                <svg
                                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </span>
                                                    </Dropdown.Trigger>

                                                    <Dropdown.Content>
                                                        <Dropdown.Link
                                                            href={route(
                                                                "stage.index"
                                                            )}
                                                        >
                                                            Stage
                                                        </Dropdown.Link>
                                                        <Dropdown.Link
                                                            href={route(
                                                                "joblevel.index"
                                                            )}
                                                        >
                                                            Job Level
                                                        </Dropdown.Link>
                                                        <Dropdown.Link
                                                            href={route(
                                                                "status.index"
                                                            )}
                                                        >
                                                            Status
                                                        </Dropdown.Link>
                                                        <Dropdown.Link
                                                            href={route(
                                                                "worktype.index"
                                                            )}
                                                        >
                                                            Work Type
                                                        </Dropdown.Link>
                                                        <Dropdown.Link
                                                            href={route(
                                                                "user_category.index"
                                                            )}
                                                        >
                                                            User Category
                                                        </Dropdown.Link>
                                                        <Dropdown.Link
                                                            href={route(
                                                                "category.index"
                                                            )}
                                                        >
                                                            Category
                                                        </Dropdown.Link>
                                                        <Dropdown.Link
                                                            href={route(
                                                                "apply-status.index"
                                                            )}
                                                        >
                                                            Apply Status
                                                        </Dropdown.Link>
                                                        <Dropdown.Link
                                                            href={route(
                                                                "invite-status.index"
                                                            )}
                                                        >
                                                            Invite Status
                                                        </Dropdown.Link>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </>
                                ) : (
                                    <div className="hidden sm:flex sm:items-center sm:ml-6"></div>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                {auth.user ? (
                                    <>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        {auth.user.first_name}

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </>
                                ) : (
                                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                                        <NavLink href={route("login")}>
                                            Log in
                                        </NavLink>

                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        Register
                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("register")}
                                                >
                                                    Registrasi Pencari Kerja
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "register-company"
                                                    )}
                                                >
                                                    Registrasi Perusahaan
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}
        </>
    );
}
