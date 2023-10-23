import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStats } from "../../features/allJobs/allJobsSlice";
import { ChartsContainer, StatsContainer } from "../../components";
import Loading from "../../components/Loading";
const Stats = () => {
  const dispatch = useDispatch();
  const { stats, monthlyApplications, isLoading } = useSelector(
    (store) => store.allJobs
  );

  useEffect(() => {
    dispatch(getAllStats());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
