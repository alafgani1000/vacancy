import NavLink from "@/Components/NavLink";
import Header from "./Header";
import Footer from "./Footer";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
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
                                <div className="bg-slate-50 p-3 text-black grid grid-flow-row auto-rows-max rounded-md">
                                    {/* content */}
                                    <div className="mb-4 shadow-md shadow-blue-100">
                                        <div className="bg-white pl-4 pt-2 pb-4 text-black h-full rounded-md">
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
                                                    LOREM IPSUM SIMPLY
                                                </p>
                                                <p>
                                                    <span className="font-bold text-xs bg-red-400 py-1.5 px-1.5 rounded text-white mr-2">
                                                        Junior
                                                    </span>
                                                    <span className="font-bold text-xs bg-sky-500 py-1.5 px-1.5 rounded text-white mr-2">
                                                        Remote / Jakarta,{" "}
                                                    </span>
                                                    <span className="font-bold text-xs bg-sky-500 py-1.5 px-1.5 rounded text-white">
                                                        12 Januari 2023{" "}
                                                    </span>
                                                </p>
                                                <p className="mt-2">
                                                    Lorem Ipsum is simply dummy
                                                    text of the printing and
                                                    typesetting industry. Lorem
                                                    Ipsum has been the
                                                    industry's standard dummy
                                                    text ever since the 1500,
                                                    when an unknown printer took
                                                    a galley of type and
                                                    scrambled it to make a type
                                                    five
                                                    <NavLink
                                                        className="text-sky-500 font-medium"
                                                        href={route("detail", {
                                                            id: "1",
                                                            name: "simply detail",
                                                        })}
                                                    >
                                                        Read more....
                                                    </NavLink>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* content */}
                                    <div className="mb-4 shadow-md shadow-blue-100">
                                        <div className="bg-white pl-4 pt-2 pb-4 text-black h-full rounded-md">
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
                                                    LOREM IPSUM SIMPLY
                                                </p>
                                                <p>
                                                    <span className="font-bold text-xs bg-red-500 py-1.5 px-1.5 rounded text-white mr-2">
                                                        Middle
                                                    </span>
                                                    <span className="font-bold text-xs bg-sky-500 py-1.5 px-1.5 rounded text-white mr-2">
                                                        Remote / Jakarta,{" "}
                                                    </span>
                                                    <span className="font-bold text-xs bg-sky-500 py-1.5 px-1.5 rounded text-white">
                                                        12 Januari 2023{" "}
                                                    </span>
                                                </p>
                                                <p className="mt-2">
                                                    Lorem Ipsum is simply dummy
                                                    text of the printing and
                                                    typesetting industry. Lorem
                                                    Ipsum has been the
                                                    industry's standard dummy
                                                    text ever since the 1500,
                                                    when an unknown printer took
                                                    a galley of type and
                                                    scrambled it to make a type
                                                    five
                                                    <NavLink
                                                        className="text-sky-500 font-medium"
                                                        href={route("detail", {
                                                            id: "1",
                                                            name: "simply detail",
                                                        })}
                                                    >
                                                        Read more....
                                                    </NavLink>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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
