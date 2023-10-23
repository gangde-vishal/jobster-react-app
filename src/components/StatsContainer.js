import React from "react";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useSelector } from "react-redux";
import StatItem from "./StatItem";
const StatsContainer = () => {
  const { stats } = useSelector((store) => store.allJobs);
  const defaultStats = [
    {
      title: "pending applications",
      icon: <FaSuitcaseRolling />,
      count: stats.pending || 0,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interview scheduled",
      icon: <FaCalendarCheck />,
      count: stats.interview || 0,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      icon: <FaBug />,
      count: stats.declined || 0,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
