import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";
import toast from "react-hot-toast";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const handleLogOut = async () => {
        try {
            await logOut();
            toast.success('Successfully logged out!');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-blue-500 font-bold" : ""
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/campaigns"
                    className={({ isActive }) =>
                        isActive ? "text-blue-500 font-bold" : ""
                    }
                >
                    All Campaigns
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to="/add-campaign"
                            className={({ isActive }) =>
                                isActive ? "text-blue-500 font-bold" : ""
                            }
                        >
                            Add Campaign
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/my-campaigns"
                            className={({ isActive }) =>
                                isActive ? "text-blue-500 font-bold" : ""
                            }
                        >
                            My Campaigns
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/my-donations"
                            className={({ isActive }) =>
                                isActive ? "text-blue-500 font-bold" : ""
                            }
                        >
                            My Donations
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className={`navbar ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} shadow-md`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${
                            theme === 'dark' ? 'bg-gray-800' : 'bg-base-100'
                        }`}
                    >
                        {navLinks}
                    </ul>
                </div>
                <Link
                    to="/"
                    className="text-xl md:text-2xl font-bold flex items-center gap-2"
                >
                    <span className="text-blue-500">Crowd</span>
                    <span>Cube</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
            </div>

            <div className="navbar-end gap-2">
                <button
                    onClick={toggleTheme}
                    className={`btn btn-circle btn-ghost`}
                    data-tooltip-id="theme-tooltip"
                    data-tooltip-content={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? (
                        <FaMoon className="text-xl" />
                    ) : (
                        <FaSun className="text-xl text-yellow-400" />
                    )}
                </button>

                {user ? (
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                            data-tooltip-id="profile-tooltip"
                            data-tooltip-content={user.displayName}
                        >
                            <div className="w-10 rounded-full">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="w-full h-full" />
                                )}
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className={`mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 ${
                                theme === 'dark' ? 'bg-gray-800' : 'bg-base-100'
                            }`}
                        >
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <button onClick={handleLogOut}>Logout</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary">
                        Login
                    </Link>
                )}
            </div>

            <Tooltip id="theme-tooltip" />
            <Tooltip id="profile-tooltip" />
        </div>
    );
};

export default Navbar;