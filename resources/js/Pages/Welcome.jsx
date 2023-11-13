import NavLink from "@/Components/NavLink";
import Header from "./Header";
import Footer from "./Footer";
import moment from "moment";
import parse from "html-react-parser";

export default function Welcome({ auth, vacancies }) {
    const { data } = vacancies;

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
                                    LOREM IPSUM DATA
                                </div>
                                <div className="bg-slate-100 p-3 text-black grid grid-flow-row auto-rows-max rounded-md">
                                    {/* content */}
                                    {data.map((item) => {
                                        return (
                                            <div
                                                key={item.id}
                                                className="mb-4 shadow-blue-100"
                                            >
                                                <div className="bg-white pl-4 pr-4 pt-2 pb-4 text-black h-full rounded-md">
                                                    <div className="grid grid-cols-2 gap4 place-items-start">
                                                        <div>
                                                            <img
                                                                src="/storage/tailwin.png"
                                                                width="80px"
                                                                className="mb-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <p className="font-bold pb-2">
                                                            {item.job_name}
                                                        </p>
                                                        <p>
                                                            <span className="font-bold text-xs bg-red-500 py-1.5 px-1.5 rounded text-white mr-2">
                                                                {
                                                                    item.level
                                                                        .name
                                                                }
                                                            </span>
                                                            <span className="font-bold text-xs bg-sky-500 py-1.5 px-1.5 rounded text-white mr-2">
                                                                {item.type.name}{" "}
                                                                / {item.city},{" "}
                                                                {item.country}
                                                            </span>
                                                            <span className="font-bold text-xs bg-sky-500 py-1.5 px-1.5 rounded text-white">
                                                                {moment(
                                                                    item.published_at
                                                                ).format(
                                                                    "DD MMMM YYYY"
                                                                )}
                                                            </span>
                                                        </p>
                                                        <div className="mt-4">
                                                            {parse(
                                                                item.description
                                                            )}
                                                        </div>
                                                        <p className="mt-2">
                                                            <NavLink
                                                                className="text-white font-medium bg-sky-950 px-2 py-2 pb-1 mt-2 rounded-sm hover:text-black hover:bg-white"
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
                                        <button className="bg-sky-500 py-2 px-6 rounded-full text-white font-medium">
                                            Prev
                                        </button>
                                    </div>
                                    <div className="flex justify-start py-4 px-4">
                                        <button className="bg-sky-500 py-2 px-6 rounded-full text-white font-medium">
                                            Next
                                        </button>
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
