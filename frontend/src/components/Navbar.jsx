import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { IoMdHome } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";
import { BiVideoPlus } from "react-icons/bi";
import { FaBell } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
import { IoAddCircleOutline } from "react-icons/io5";

function Navbar() {
  const [user, setUser] = useState(null);

  // ✅ Fetch Current User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8007/api/v1/users/currentUser",
          { withCredentials: true },
        );
        setUser(res.data.data);
      } catch (error) {
        console.log("Failed to load user", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="sticky top-0 w-full bg-slate-700 flex items-center justify-between px-6 h-16 shadow-md z-50">
      {/* 🔹 Left Side → Welcome + User Info */}
      <div className="flex items-center gap-6">
        <Link
          to="/home"
          className="text-2xl font-semibold italic text-slate-300 hover:bg-slate-900 px-3 py-1 rounded-md"
        >
          Welcome
        </Link>

        {user && (
          <div className="flex items-center gap-3 bg-slate-600 px-4 py-2 rounded-xl border border-slate-600">
            <RiAccountCircleFill className="text-2xl text-white" />

            <div className="flex flex-col text-sm text-gray-200 leading-tight">
              <span className="font-semibold">{user.fullName}</span>
              <span className="text-xs text-gray-400">{user.email}</span>
            </div>

            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full capitalize">
              {user.role}
            </span>
          </div>
        )}
      </div>

      {/* 🔹 Center → Icons */}
      <div className="hidden md:flex items-center gap-10 text-3xl text-slate-300">
        <Link to="/home" className="hover:text-white transition">
          <IoMdHome />
        </Link>

        <Link to="/videos" className="hover:text-white transition">
          <IoAddCircleOutline />
        </Link>
      </div>

      {/* 🔹 Right → Mobile Menu */}
      <div className="md:hidden text-3xl text-slate-300 cursor-pointer">
        <TiThMenu />
      </div>
    </nav>
  );
}

export default Navbar;
