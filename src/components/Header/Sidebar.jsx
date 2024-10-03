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
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { userLogout } from "../../store/Slices/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const username = useSelector((state) => state.auth?.userData?.data?.username);
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
      url: `/channel/${username}/videos`,
    },
    {
      icon: <IoFolderOutline size={25} />,
      title: "Collections",
      url: "/collections",
    },
    {
      icon: <TbUserCheck size={25} />,
      title: "Subscriptions",
      url: "/subscriptions",
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
      title: "Subscriptions",
      url: "/subscriptions",
    },
  ];
  const logout = async () => {
    await dispatch(userLogout());
    navigate("/");
};

  return (
    <>
      <div className="sm:block hidden">
  <div className="text-white h-[90vh] fixed bottom-0 left-0 lg:w-56 md:w-44 w-16 sm:p-3 p-2 border-slate-600 border-r flex flex-col justify-between overflow-hidden">
    <div className="flex flex-col gap-4 mt-5">
      {sidebarTopItems.map((item) => (
        <NavLink
          to={item.url}
          key={item.title}
          className={({ isActive }) =>
            isActive ? "bg-[#FD7014] rounded" : ""
          }
        >
          <div className="flex items-center gap-2 justify-center sm:justify-start rounded hover:bg-[#FD7014] cursor-pointer py-1 px-2 border border-slate-600">
            {item.icon}
            <span className="text-base hidden md:block">{item.title}</span>
          </div>
        </NavLink>
      ))}
    </div>

    <div className="space-y-4 mb-5">
      {username && (
        <div
          className="flex items-center mb-3 gap-2 justify-center sm:justify-start hover:bg-[#FD7014] cursor-pointer py-1 px-2 border border-slate-600"
          onClick={() => logout()}
        >
          <IoMdLogOut size={25} />
          <span className="text-base hidden md:block">Logout</span>
        </div>
      )}
      <Link to="/edit/personalInfo">
        <div className="flex items-center gap-2 justify-center sm:justify-start rounded hover:bg-[#FD7014] cursor-pointer py-1 px-2 border border-slate-600">
          <CiSettings size={25} />
          <span className="text-base hidden md:block">Settings</span>
        </div>
      </Link>
    </div>
  </div>
</div>


      {/* for mobile sidebar is bottom bar*/}
      <div className="border-t-2  text-white h-16 sm:hidden z-20 p-1 w-full flex justify-around fixed bottom-0 bg-[#0E0F0F]">
        {bottomBarItems.map((item) => (
          <NavLink
            to={item.url}
            key={item.title}
            className={({ isActive }) => (isActive ? "text-[#FD7014]" : "")}
          >
            <div className="flex flex-col items-center gap-1 cursor-pointer p-1 ">
              {item.icon}
              <span className="text-sm pb-3">{item.title}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
