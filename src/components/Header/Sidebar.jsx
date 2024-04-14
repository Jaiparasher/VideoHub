import React from "react";
import {
    BiHistory,
    BiLike,
    CiSettings,
    HiOutlineVideoCamera,
    IoFolderOutline,
    MdOutlineContactSupport,
    RiHome6Line,
    TbUserCheck,
} from "../icons";
import { Link } from "react-router-dom";

function Sidebar() {
    const sidebarTopItems = [
        {
            icon: <RiHome6Line size={25} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <BiLike size={25} />,
            title: "Liked Videos",
            url: "/liked-videos",
        },
        {
            icon: <BiHistory size={25} />,
            title: "History",
            url: "/history",
        },
        {
            icon: <HiOutlineVideoCamera size={25} />,
            title: "My Content",
            url: "/my-content",
        },
        {
            icon: <IoFolderOutline size={25} />,
            title: "Collections",
            url: "/collections",
        },
        {
            icon: <TbUserCheck size={25} />,
            title: "Subscribers",
            url: "/subscribers",
        },
    ];

    const bottomBarItems = [
        {
            icon: <RiHome6Line size={25} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <BiHistory size={25} />,
            title: "History",
            url: "/history",
        },
        {
            icon: <IoFolderOutline size={25} />,
            title: "Collections",
            url: "/collections",
        },
        {
            icon: <TbUserCheck size={25} />,
            title: "Subscribers",
            url: "/subscribers",
        },
    ];

return (
    <>
        <div className="sm:block hidden">
            <div className="text-white lg:w-56 md:w-44 w-16 sm:p-3 p-2 border-slate-600 border-r h-[93vh] flex flex-col justify-between">
                <div className="space-y-4 mt-5">
                    {sidebarTopItems.map((item) => (
                        <Link
                            to={item.url}
                            key={item.title}
                            className="flex items-center gap-2 justify-center sm:justify-start rounded hover:bg-[#FD7014] cursor-pointer py-1 px-2 border border-slate-600"
                        >
                            {item.icon}
                            <span className="text-base hidden md:block">
                                {item.title}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-2 justify-center sm:justify-start rounded hover:bg-[#FD7014] cursor-pointer py-1 px-2 border border-slate-600">
                        <MdOutlineContactSupport size={25} />
                        <span className="text-base hidden md:block">
                            Support
                        </span>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start rounded hover:bg-[#FD7014] cursor-pointer py-1 px-2 border border-slate-600">
                        <CiSettings size={25} />
                        <span className="text-base hidden md:block">
                            Settings
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* for mobile sidebar is bottom bar*/}
        <div className="border-t-2 text-white h-16 sm:hidden p-1 w-full flex justify-around fixed bottom-0 bg-[#0E0F0F]">
            {bottomBarItems.map((item) => (
                <Link
                    to={item.url}
                    key={item.title}
                    className="flex flex-col items-center gap-1 cursor-pointer p-1"
                >
                    {item.icon}
                    <span className="text-sm">{item.title}</span>
                </Link>
            ))}
        </div>
    </>
);
}

export default Sidebar;