/* eslint-disable no-unused-vars */
import { useState } from "react"
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "../../state/api.js";
import Header from "../../components/Header.jsx";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";

const Transactions = () => {
  const theme = useTheme();

  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  // to avoid debouncing
  const [searchInput, setSearchInput] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0
  });

  const {pageSize, page} = paginationModel;

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

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
            <Header title={"TRANSACTIONS"} subtitle={"Entire list of transactions..."} />
            <Box height={"80vh"} sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
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
                    backgroundColor: theme.palette.primary.light,
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
                    rowCount={(data && data.total) || 0}
                    pageSizeOptions={[20, 50, 100]}
                    pagination 
                    paginationMode="server" 
                    sortingMode="server" 
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{Toolbar: DataGridCustomToolbar}}
                    componentsProps={{
                        toolbar: {searchInput, setSearchInput, setSearch}
                    }}
                />
            </Box>
        </Box>
    )
}

export default Transactions