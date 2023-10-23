import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormRow from "../../components/FormRow";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormSelect from "../../components/FormSelect";
import {
  clearAllInputs,
  createJob,
  editJobById,
  handleChange,
} from "../../features/job/jobSlice";

const AddNewJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOption,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill all the fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editJobById({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
    } else {
      dispatch(createJob({ position, company, jobLocation, jobType, status }));
    }
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Job" : "Add New Job"}</h3>
        <div className="form-center">
          {/* position */}
          <FormRow
            name="position"
            type="text"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            name="company"
            type="text"
            value={company}
            handleChange={handleJobInput}
          />
          {/* job location */}
          <FormRow
            labelText="job location"
            name="jobLocation"
            type="text"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* status */}
          <FormSelect
            name="status"
            id="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOption}
          />
          {/* jobTypeOptions */}
          <FormSelect
            name="jobType"
            id="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              className="btn btn-block clear-btn"
              type="button"
              onClick={() => dispatch(clearAllInputs())}
            >
              Clear
            </button>
            <button
              className="btn btn-block"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddNewJob;
