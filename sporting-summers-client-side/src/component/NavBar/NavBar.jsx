import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuhtProvider";
import logo from "../../../public/logo.png";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };
  return (
    <div className="navbar bg-[#9B59B6] glass sticky top-0 z-10 text-black ">
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-700 rounded-box w-52"
          >
            <li className="hover:text-orange-500 font-serif">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="hover:text-orange-500 font-serif">
              <NavLink to="/instructors">Instructors</NavLink>
            </li>

            <li className="hover:text-orange-500 font-serif">
              <NavLink to="/classes">Classes</NavLink>
            </li>
            {user && (
              <li className="hover:text-orange-500 font-serif">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className=" normal-case text-xl font-serif">
          <img className="md:w-12 w-12 mx-6" src={logo} alt="" />
        </Link>
        <span className=" font-extrabold font-serif md:text-2xl">
          Sporting <span className=" text-rose-800">Summers</span>
        </span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className=" hover:text-orange-500 font-serif">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="hover:text-orange-500 font-serif">
            <NavLink to="/instructors">Instructors</NavLink>
          </li>

          <li className="hover:text-orange-500 font-serif">
            <NavLink to="/classes">Classes</NavLink>
          </li>

          {user && (
            <li className="hover:text-orange-500 font-serif">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        <div
          className="tooltip tooltip-bottom mr-2"
          data-tip={user?.displayName}
        >
          {user && (
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} />
                {/* <img src={user && user.photoURL ? user.photoURL : avatarImg} /> */}
              </div>
            </label>
          )}
        </div>

        <div>
          {user ? (
            <button
              className=" px-3 py-2 bg-yellow-500 rounded font-bold text-white font-serif hover:bg-yellow-600"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          ) : (
            <Link to="/login">
              <button className=" px-3 py-2 bg-yellow-500 rounded font-bold text-white font-serif hover:bg-yellow-600">
                LogIn
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
