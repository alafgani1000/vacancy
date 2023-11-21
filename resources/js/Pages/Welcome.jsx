import NavLink from "@/Components/NavLink";
import Header from "./Header";
import Footer from "./Footer";
import moment from "moment";
import parse from "html-react-parser";

export default function Welcome({ auth, vacancies }) {
    const { data, next_page_url, prev_page_url, total } = vacancies;

    console.log(data);

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                {/* header */}
                <Header
                    user={auth}
                    header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Home
                        </h2>
                    }
                />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-md sm:rounded-md">
                            <div className="p-6 text-gray-900">
                                <div className="bg-sky-950 p-3 mt-4 mb-4 text-white font-bold border-b-2 border-white shadow-md rounded-md">
                                    List of Vacancy
                                </div>
                                <div className="bg-slate-100 p-3 text-black grid grid-cols-2 gap-4 auto-rows-max rounded-md">
                                    {/* content */}
                                    {data.map((item) => {
                                        return (
                                            <div
                                                key={item.id}
                                                className="mb-4 shadow-blue-100 hover:shadow-md hover:shadow-sky-300"
                                            >
                                                <div className="bg-white pl-4 pr-4 pt-2 pb-4 text-black h-full rounded-md">
                                                    <div className="flex flex-col-2">
                                                        <div>
                                                            <img
                                                                className="my-2 p-2 bg-slate-50 rounded-md"
                                                                width="75px"
                                                                src={
                                                                    item.user
                                                                        .company
                                                                        .logo !==
                                                                    null
                                                                        ? `${item.user.company.logo}`
                                                                        : `company/default.jpg`
                                                                }
                                                            />
                                                        </div>
                                                        <div className="text-xl font-bold mt-2 ms-2">
                                                            <span>
                                                                {
                                                                    item.user
                                                                        .company
                                                                        .name
                                                                }
                                                            </span>
                                                            <br />
                                                            <span className="font-bold text-xs bg-slate-50 py-1.5 px-1.5 rounded mr-2">
                                                                {item.type.name}{" "}
                                                                / {item.city},{" "}
                                                                {item.country}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs bg-sky-500 py-1.5 px-1.5 rounded mr-2 text-white">
                                                            {item.level.name}
                                                        </span>
                                                        <span className="text-xs bg-sky-500 py-1.5 px-1.5 rounded text-white">
                                                            {moment(
                                                                item.published_at
                                                            ).format(
                                                                "DD MMMM YYYY"
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2">
                                                        <p className="font-bold text-lg pb-2">
                                                            {item.job_name}
                                                        </p>
                                                        <div>
                                                            {parse(
                                                                item.description
                                                            )}
                                                        </div>
                                                        <p className="mt-2">
                                                            <NavLink
                                                                className="text-white font-medium bg-sky-950 px-2 py-2 pb-1 mt-2 rounded hover:text-black hover:bg-white"
                                                                href={route(
                                                                    "detail",
                                                                    {
                                                                        id: item.id,
                                                                        name: item.job_name,
                                                                    }
                                                                )}
                                                            >
                                                                Know more...
                                                            </NavLink>
                                                        </p>
                                                    </div>
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
                <Footer />
            </div>
        </>
    );
}
