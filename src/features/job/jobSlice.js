import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { authHeader } from "../../utils/authHeader";
const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOption: ["interview", "pending", "declined"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => {
    try {
      const res = await customFetch.post("/jobs", job, authHeader(thunkAPI));
      thunkAPI.dispatch(clearAllInputs());
      return res.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const editJobById = createAsyncThunk(
  "job/editJob",
  async ({ jobId, job }, thunkAPI) => {
    try {
      const res = await customFetch.patch(
        `/jobs/${jobId}`,
        job,
        authHeader(thunkAPI)
      );
      thunkAPI.dispatch(clearAllInputs());
      return res.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const res = await customFetch.delete(
        `/jobs/${jobId}`,
        authHeader(thunkAPI)
      );
      thunkAPI.dispatch(getAllJobs());
      return res.data.msg;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearAllInputs: () => {
      return { ...initialState };
    },
    editJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // add new job
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // delete a job using id
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      // edit a job using id
      .addCase(editJobById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJobById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Job Edited Successfully");
      })
      .addCase(editJobById.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearAllInputs, editJob } = jobSlice.actions;

export default jobSlice.reducer;
