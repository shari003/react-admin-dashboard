/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import { GridToolbarDensitySelector, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton } from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween.jsx";

const DataGridCustomToolbar = ({searchInput, setSearchInput, setSearch}) => {
    return (
        <GridToolbarContainer>
            <FlexBetween width={"100%"}>
                <FlexBetween>
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </FlexBetween>
                <TextField label="Search..." variant="standard" sx={{
                    mb: "0.5rem",
                    width: "15rem"
                }} 
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => {
                                    setSearch(searchInput);
                                    setSearchInput("");
                                }}
                            >
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                />
            </FlexBetween>
        </GridToolbarContainer>
    )
}

export default DataGridCustomToolbar