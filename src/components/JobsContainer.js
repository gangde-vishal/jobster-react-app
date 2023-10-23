import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./Loading";
import { getAllJobs } from "../features/allJobs/allJobsSlice";
import PaginationContainer from "./PaginationContainer";

const JobsContainer = () => {
  const {
    isLoading,
    jobs,
    totalJobs,
    numOfPages,
    page,
    searchStatus,
    searchType,
    sortOptions,
    search,
  } = useSelector((store) => store.allJobs);
  console.log(numOfPages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchStatus, searchType, sortOptions, search]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PaginationContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
