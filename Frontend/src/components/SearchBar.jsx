import { Box, FormControl, Input, InputAdornment, Stack } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { updateSearchText } from "../stores/slices/productSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  return (
    <FormControl variant="standard">
      <Input
        onChange={(event) => {
          dispatch(updateSearchText(event?.target?.value));
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchBar;
