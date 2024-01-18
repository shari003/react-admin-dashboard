/* eslint-disable no-unused-vars */
import { useState } from "react"
import {Box, useMediaQuery} from "@mui/material";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import { useGetUserQuery } from "../../state/api.js";
 
const Layout = () => {

    const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector(store => store.global.userId);
    const { data} = useGetUserQuery(userId);

    return (
        <Box display={isNonMobileScreens ? "flex" : "block"} width={"100%"} height={"100%"}>
            <Sidebar user={data || {}} isNonMobileScreens={isNonMobileScreens} drawerWidth={"250px"} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Box flexGrow={1}>
                <Navbar user={data || {}} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout