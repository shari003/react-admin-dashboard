/* eslint-disable no-unused-vars */
import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDashboardQuery } from "../../state/api.js";
import Header from "../../components/Header.jsx";
import BreakdownChart from "../../components/BreakdownChart.jsx";
import OverviewChart from "../../components/OverviewChart.jsx";
import StatBox from "../../components/StatBox.jsx";

const Dashboard = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1200px)");
    const {data, isLoading} = useGetDashboardQuery();
   
    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
            renderCell: (params) => {
                const inputDate = new Date(params.value);
                const options = {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: "Asia/Kolkata",
                };
                const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(inputDate);
                return formattedDate
            }
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },
    ]

    return (
        <Box m={"1.5rem 2.5rem"}>
            <FlexBetween>
                <Header title={'DASHBOARD'} subtitle={'Welcome to your Dashboard...'} />

                <Box>
                    <Button sx={{
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.background.alt,
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '10px 20px'
                    }}>
                        <DownloadOutlined sx={{mr: '10px'}} />
                        Download Reports
                    </Button>
                </Box>
            </FlexBetween>

            <Box mt={'20px'} display={'grid'} gridTemplateColumns={'repeat(12,1fr)'} gridAutoRows={'160px'} gap={'20px'} sx={{
                "& > div": { gridColumn: isNonMobileScreens ? undefined : 'span 12' }
            }}>
                {/* ROW 1 */}
                <StatBox title={'Total Customers'} value={data && data.totalCustomers} increase={'+14%'} description={'Since last month'} icon={
                    <Email sx={{color: theme.palette.secondary[300], fontSize: '26px'}} />
                } />

                <StatBox title={'Sales Today'} value={data && data.todayStats.totalSales} increase={'+21%'} description={'Since last month'} icon={
                    <PointOfSale sx={{color: theme.palette.secondary[300], fontSize: '26px'}} />
                } />

                <Box gridColumn={'span 8'} gridRow={'span 2'} bgcolor={theme.palette.background.alt} p={'1rem'} borderRadius={'0.55rem'}>
                    <OverviewChart view={'sales'} isDashboard={true} />
                </Box>

                <StatBox title={'Monthly Sales'} value={data && data.thisMonthStats.totalSales} increase={'+5%'} description={'Since last month'} icon={
                    <PersonAdd sx={{color: theme.palette.secondary[300], fontSize: '26px'}} />
                } />

                <StatBox title={'Yearlt Sales'} value={data && data.yearlySalesTotal} increase={'+43%'} description={'Since last month'} icon={
                    <Traffic sx={{color: theme.palette.secondary[300], fontSize: '26px'}} />
                } />

                {/* 2nd ROW */}
                <Box gridColumn={'span 8'} gridRow={'span 3'} sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                        borderRadius: '5rem'
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.background.alt,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}>
                    <DataGrid 
                        loading={isLoading || !data} 
                        getRowId={(row) => row._id} 
                        rows={(data && data.transactions) || []} 
                        columns={columns} 
                    />
                </Box>

                <Box gridColumn={'span 4'} gridRow={'span 3'} bgcolor={theme.palette.background.alt} p={'1.5rem'} borderRadius={'0.55rem'}>
                    <Typography variant="h6" sx={{color: theme.palette.secondary[100]}}>
                        Sales By Category
                    </Typography>
                    <BreakdownChart isDashboard={true} />
                    <Typography p={'0 0.6rem'} fontSize={'0.8rem'} sx={{color: theme.palette.secondary[200]}}>
                        Breakdown of real states and information via category for revenue made for this year and total sales.
                    </Typography>
                </Box>

            </Box>
            
        </Box>
    )
}

export default Dashboard