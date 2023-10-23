import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormRow from "../../components/FormRow";

import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { updateUser } from "../../features/user/userSlice";
const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    location: user?.location || "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, lastName, email, location } = userData;
    if (!name || !lastName || !email || !location) {
      toast.error("Please fill all the fields");
      return;
    }
    dispatch(updateUser({ name, lastName, email, location }));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            name="name"
            type="text"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            name="lastName"
            labelText="Last Name"
            type="text"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            name="email"
            type="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            name="location"
            type="text"
            value={userData.location}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
