import React, { useState } from "react";
import BarChart from "./BarChart";
import AreaChartComponent from "./AreaChart";
import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/ChartsContainer";
const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "area chart" : "bar chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChartComponent data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
