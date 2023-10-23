import { authHeader } from "../../utils/authHeader";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearAllJobs } from "../allJobs/allJobsSlice";
import { clearAllInputs } from "../job/jobSlice";
import { logoutUser } from "./userSlice";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await customFetch.post(url, user);
    return res.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await customFetch.post(url, user);
    return res.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await customFetch.patch(url, user, authHeader(thunkAPI));
    return res.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearAllStore = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobs());
    thunkAPI.dispatch(clearAllInputs());
    return Promise.resolve();
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
