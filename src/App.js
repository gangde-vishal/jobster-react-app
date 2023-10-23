import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing, Error, Register } from "./pages";
import {
  AddNewJob,
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
} from "./pages/dashboard";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-new-job" element={<AddNewJob />} />
        </Route>
        <Route path="landing" element={<Landing />} />

        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" theme="dark" />
    </BrowserRouter>
  );
}

export default App;
