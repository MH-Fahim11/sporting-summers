import { NavLink, Outlet } from "react-router-dom";
import {FaAddressBook, FaHome, FaMoneyCheck} from 'react-icons/fa';
import { MdOutlineClass } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsBookHalf, BsFillJournalBookmarkFill } from "react-icons/bs";
import { FcHome, FcKindle, FcManager } from "react-icons/fc";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    return (
        <div className="drawer drawer-mobile lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side bg-[#9B59B6] text-white">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-52">

                    {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/adminHome"><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/manageClass"><MdOutlineClass></MdOutlineClass> Manage Classes</NavLink></li>
                            <li><NavLink to="/dashboard/manageUsers"> <FaAddressBook></FaAddressBook> Manage Users</NavLink></li>
                        </>:isInstructor?<>
                        <li><NavLink to="/dashboard/instructorHome"><FaHome></FaHome> Instructor Home</NavLink></li>
                        <li><NavLink to="/dashboard/addClass"><AiOutlineFileAdd></AiOutlineFileAdd>Add a Class</NavLink></li>
                        <li><NavLink to="/dashboard/myClass"><BsBookHalf></BsBookHalf> My Class</NavLink></li>
                        
                        
                        </>: <>
                            <li><NavLink to="/dashboard/userHome"><FaHome></FaHome> User Home</NavLink></li>
                            <li><NavLink to="/dashboard/mySelectedClass"><BsBookHalf></BsBookHalf>  My Selected Class</NavLink></li>
                            <li><NavLink to="/dashboard/myEnrolledClasses"><BsFillJournalBookmarkFill></BsFillJournalBookmarkFill> My Enrolled Classes</NavLink></li>
                            <li><NavLink to="/dashboard/paymentHistory"><FaMoneyCheck></FaMoneyCheck> Payment History</NavLink></li>
                        </>
                    }




                    <div className="divider"></div>
                    <li><NavLink to="/"><FcHome></FcHome> Home</NavLink> </li>
                    <li><NavLink to="/classes"><FcKindle></FcKindle> Classes</NavLink></li>
                    <li><NavLink to="/instructors"><FcManager></FcManager>Instructor</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;