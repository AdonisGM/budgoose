import {useEffect} from "react";
import Dashboard from "./dashboardPage/Dashboard.jsx";

const DashboardPage = () => {
    useEffect(() => {
        document.title = "Dashboard | AdonisGM";
    }, []);

    return <div className={'container mx-auto'}><Dashboard/></div>
}

export default DashboardPage