import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar/NavBar";
import Footer from "../component/Footer/Footer";

const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;