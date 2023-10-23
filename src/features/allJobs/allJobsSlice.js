import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { authHeader } from "../../utils/authHeader";

const initialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};
const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFilterState,
};

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkAPI) => {
    const { page, searchStatus, searchType, sortOptions, search } =
      thunkAPI.getState().allJobs;
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sortOptions}`;
    if (search) {
      url = `${url}&search=${search}`;
    }
    try {
      const res = await customFetch.get(url, authHeader(thunkAPI));
      console.log(res.data);
      return res.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const getAllStats = createAsyncThunk(
  "allJobs/getAllStats",
  async (_, thunkAPI) => {
    try {
      const res = await customFetch.get("/jobs/stats", authHeader(thunkAPI));
      console.log(res.data);
      return res.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFilterState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobs: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // get all jobs
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload;
        state.totalJobs = payload.totalJobs;
        state.numOfPages = payload.numOfPages;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // get last six month stats
      .addCase(getAllStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(getAllStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const {
  showLoading,
  hideLoading,
  clearFilters,
  handleChange,
  changePage,
  clearAllJobs,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
