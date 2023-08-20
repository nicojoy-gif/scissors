import React, { useContext, useEffect, useState } from "react";
import bg from "../../Assets/unsplash_Evp4iNF3DHQ.png";
import bg1 from "../../Assets/Untitled-1 2.png";
import Nav from "../Nav/Nav";
import Footer from "../Home/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

type Props = {};

const Profile = (props: Props) => {const { users: contextUser, dispatch } = useContext(AuthContext);
const [loading, setLoading] = useState(false);
const [formData, setFormData] = useState({
  userId: contextUser._id,
  firstName: "",
  lastName: "",
  companyName: "",
  email: contextUser.email,
  phoneNumber: "",
  jobTitle: "",
  companySize: "",
  primaryUseCase: "",
  country: "",
});
console.log(contextUser)
const backgroundImageUrl = `url(${bg})`;
const navigate = useNavigate();
const updateUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("users");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  dispatch({ type: "UPDATE_USER_FROM_STORAGE", payload: initialUser });
};

useEffect(() => {
  updateUserFromLocalStorage();
}, []);


const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setLoading(true);
    // Send the form data to the backend API
    await axios.post("https://scissors-avus.onrender.com/api/profile/submit", formData);
    // Update the users context and local storage with the submitted formData
    dispatch({ type: "UPDATE_USER_FROM_STORAGE", payload: formData });
    setLoading(false);
    navigate("/userprofile", {state: formData});
  } catch (error) {
    console.error("Error:", error);
    setLoading(false);
    // Handle error here (display an error message, etc.)
  }
};
if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-12 w-12"></div>
    </div>
  );
}

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `linear-gradient(to bottom, rgba(239, 255, 255, 0.9), rgba(239, 246, 255, 0.2)), ${backgroundImageUrl}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img src={bg1} className=" absolute h-full " alt="Overlay" />
      {/* Your content goes here */}
      <section className="z-50">
        <Nav />
        <div>
          <h1 className="font-bold text-4xl pt-12 text-center">
            Let's get in touch
          </h1>
        </div>

        <div className="flex justify-center items-center content-center flex-col ">
          <div className="bg-slate-300 rounded-xl my-12 z-50 py-14 w-5/6 lg:w-2/6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full my-3">
                    <label className="block   text-sm font-medium mb-2">
                      First Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.firstName}
                      onChange={handleChange}
                      name="firstName"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full my-3">
                    <label className="block   text-sm font-medium mb-2">
                      Last Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.lastName}
                      name="lastName"
                      onChange={handleChange}
                   />
                  </div>
                </div>
              </div>
              <div>
                <div className="w-full px-4">
                  <div className="relative w-full my-3">
                    <label className="block   text-sm font-medium mb-2">
                      Company Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-lg text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.companyName}
                      onChange={handleChange}
                      name="companyName"
                   />
                  </div>
                </div>

                <div className="w-full px-4">
                  <div className="relative w-full my-3">
                    <label className="block  text-sm font-medium mb-2">
                      Business Email Address<sup>*</sup>
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-lg text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="w-full px-4">
                  <div className="relative w-full my-3">
                    <label className="block  text-sm font-medium mb-2">
                      Phone Number<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-lg text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.phoneNumber}
                      name="phoneNumber"
                      onChange={handleChange}
                  />
                  </div>
                </div>

                <div className="w-full px-4 ">
                  <div className="relative w-full my-3">
                    <label className="block  text-sm font-medium mb-2">
                      Job Title<sup>*</sup>
                    </label>
                    <select
                      data-te-select-init
                      className="border-0 text-gray-600 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-lg text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.jobTitle}
                      name="jobTitle"
                      onChange={handleChange}
                  >
                      <option value="">Please Select</option>
                      <option value="Accountant">Accountant</option>
                      <option value="Administrative Manager">Administrative Manager</option>
                      <option value="Frontend Engineer">Frontend Engineer</option>
                      <option value="Developers relation">Developers relation</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Cloud Engineer">Cloud Engineer</option>
                      <option value="Project Manager">Project Manager</option>
                    </select>
                  </div>
                </div>
                <div className="w-full px-4 ">
                  <div className="relative w-full my-3">
                    <label className="block  text-sm font-medium mb-2">
                      Company Size<sup>*</sup>
                    </label>
                    <select
                      data-te-select-init
                      className="border-0 text-gray-600 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-lg text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.companySize}
                      name="companySize"
                      onChange={handleChange}
                  >
                      <option value="1">Please Select</option>
                      <option value="Two">Two</option>
                      <option value="Three">Three</option>
                      <option value="Four">Four</option>
                      <option value="Five">Five</option>
                      <option value="Six">Six</option>
                      <option value="Seven">Seven</option>
                      <option value="Eight">Eight</option>
                    </select>
                  </div>
                </div>
                <div className="w-full px-4 ">
                  <div className="relative w-full my-3">
                    <label className="block   text-sm font-medium mb-2">
                      Primary Use Case<sup>*</sup>
                    </label>
                    <select
                      data-te-select-init
                      className="border-0 text-gray-600 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-lg text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.primaryUseCase}
                      name="primaryUseCase"
                      onChange={handleChange}
                   >
                      <option value="">Please Select</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Branding">Branding</option>
                      <option value="Analytics">Analytics</option>
                    </select>
                  </div>
                </div>
                <div className="w-full px-4 ">
                  <div className="relative w-full my-3">
                    <label className="block   text-sm font-medium mb-2">
                      Country<sup>*</sup>
                    </label>
                    <select
                      data-te-select-init
                      className="border-0 text-gray-600 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-lg text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.country}
                      name="country"
                      onChange={handleChange}
                    >
                      <option value="">Please Select</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Algeria">Algeria</option>
                      <option value="Canada">Canada</option>
                      <option value="France">France</option>
                      <option value="Egypt">Egypt</option>
                    </select>
                  </div>
                </div>
                <div className="w-full px-4">
                  <p className="text-gray-500 text-xs">
                    Scissor requires the contact information you provide in
                    order to reach out to you regarding our products and
                    services. You have the option to unsubscribe from these
                    communications whenever you wish. To learn more about how to
                    unsubscribe, our privacy practices, and our dedication to
                    safeguarding your privacy. please refer to our Privacy
                    Policy.
                  </p>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full my-5">
                    <button className="border-0 px-3 py-2 text-center text-white font-medium bg-blue-700 rounded-full text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                   >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;