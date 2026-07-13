import {
    FaHome,
    FaFolderOpen,
    FaUser,
    FaSignOutAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">

            <div className="text-2xl font-bold p-6 border-b border-gray-700">

                AI Code Review Assistant

            </div>

            <nav className="flex-1 mt-6">

                <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
                >

                    <FaHome />

                    Dashboard

                </Link>

                <Link
                    to="/projects"
                    className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
                >

                    <FaFolderOpen />

                    Projects

                </Link>

                <Link
                    to="/profile"
                    className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
                >

                    <FaUser />

                    Profile

                </Link>

            </nav>

            <button

                className="flex items-center gap-3 px-6 py-5 border-t border-gray-700 hover:bg-gray-800"

            >

                <FaSignOutAlt />

                Logout

            </button>

        </div>

    );

}

export default Sidebar;