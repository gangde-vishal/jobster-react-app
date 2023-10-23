import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import moment from "moment";
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import { deleteJob, editJob } from "../features/job/jobSlice";
const Job = ({
  company,
  createdBy,
  createdAt,
  jobLocation,
  jobType,
  position,
  status,
  updatedAt,
  _id,
}) => {
  const dispatch = useDispatch();
  let date = moment(createdAt).format("MMM Do YY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{`${company.slice(0, 3)}`}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-new-job"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  editJob({
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    status,
                    jobType,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteJob(_id))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
