import React from "react";
import { FormRow, FormSelect } from "./index";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/SearchContainer";
import { clearFilters, handleChange } from "../features/allJobs/allJobsSlice";

const SearchContainer = () => {
  const { search, searchStatus, searchType, sort, sortOptions, isLoading } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOption } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    dispatch(clearFilters());
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>Search Form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          {/* status */}
          <FormSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOption]}
          />
          {/* type */}
          <FormSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          {/* <button
            className="btn btn-block"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Search
          </button> */}
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
