import React, { useContext, useEffect, useState } from "react";
import del from '../../Assets/delete-icon.png'
import avatar from "../../Assets/avatar.png";
import edit from "../../Assets/edit-423.png";
import firebase from "firebase/compat/app";
import "firebase/auth";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Nav from "../Nav/Nav";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Link } from "react-router-dom";

interface AccountSettingProps {}
interface FormData {
  firstName: string;
  lastname: string;
  username: string;
  email: string;
  jobTitle: string;
  country: string;
  companyName: string;
  phoneNumber: string;
  companySize: string;
  primaryUseCase: string;
}

const UserProfile: React.FunctionComponent<AccountSettingProps> = () => {
  const storedFormData = localStorage.getItem("editedForm");
  const editedFormDatas: FormData | null = storedFormData
    ? JSON.parse(storedFormData)
    : null;
  const [isEditing, setIsEditing] = useState(false);

  const [editedForm, setEditedFormData] = useState<FormData | null>(
    editedFormDatas
  );
  const [editedBlock, setEditedBlock] = useState("");
  const { users } = useContext(AuthContext);
  useEffect(() => {
    fetchFormData();
  });
  console.log(users)
  const fetchFormData = async () => {
    try {
      const response = await axios.get(
        `https://scissors-avus.onrender.com/api/profile/fetchData/${users._id || users.userId}`
      );
     
      const data: FormData[] = response.data;
      setEditedFormData(data[0]);
     
     
    } catch (error) {
      console.error("Failed to fetch submitted form data:", error);
    }
  };
  const handleEditClick = (blockName: string) => {
    setIsEditing(true);
    setEditedBlock(blockName);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    localStorage.setItem("editedForm", JSON.stringify(editedForm));
    setIsEditing(false);
  };
  

  const handleDeleteAccount = async () => {
    try {
      await firebase.auth().currentUser?.delete();
      const response = await fetch(
        `https://scissors-avus.onrender.com/api/users/${users._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: users._id,
            isAdmin: false,
          }),
        }
      );

      if (response.ok) {
        console.log("Account deleted successfully");
      } else {
        console.error("Account deletion failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // Initialize Firebase Analytics
    const analytics = getAnalytics();

    // Log an event when the UserProfile component mounts
    logEvent(analytics, 'user_profile_mounted');

    // Fetch form data and other component logic
    // ...
  }, []);
  return (
    <div>
      <Nav />
      {editedForm ? (
        <div className="flex justify-center items-center w-full bg-white">
          <div className="container mx-auto my-4 px-4">
            <div className="p-8 my-4  lg:w-10/12 w-full mx-auto rounded-2xl shadow-2xl">
              <div className="">
                <div className="grid lg:grid-cols-[15vw_minmax(100vw,_1fr)_80vw] grid-cols-1">
                  <div className="lg:border-r border-gray-200 ">
                    <ul className="list-style-none text-gray-600 my-5  lg:mxfont-medium lg:space-y-6 flex lg:block justify-end">
                      
                      <li>
                        <button onClick={handleDeleteAccount}>
                      <img src={del} alt="delete-icon" className="h-12 w-12"/>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="mx-5 lg:w-1/2 w-full">
                    <h2 className="font-bold text-2xl py-3 ">My Profile</h2>
                    <div className="border border-gray-100 rounded-2xl my-2">
                      <div className="flex m-4 justify-between content-center">
                        <div className="lg:flex ">
                          <div className="w-14 rounded-full h-14 mr-3">
                            <img
                              src={avatar}
                              alt="profile"
                              className="rounded-full"
                            />
                          </div>
                          <div className="text-gray-500 fnt-medium">
                            <>
                              <h3 className="text-black">
                                {editedForm.firstName}
                              </h3>
                              <p>{editedForm.jobTitle}</p>
                              <p>
                                {editedForm.companyName}, {editedForm.country}
                              </p>
                            </>
                          </div>
                        </div>
                        <div className="lg:my-auto"></div>
                      </div>
                    </div>
                    <div className="border border-gray-100 rounded-2xl my-2">
                      <div className="m-4">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">
                            Personal Information
                          </h3>
                          {isEditing && editedBlock === "personalInfo" ? (
                            <button
                              className="border flex content-center rounded-2xl px-3 py-1 border-gray-300 text-gray-400 font-medium"
                              onClick={handleSaveClick}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              className="border flex content-center rounded-2xl px-3 py-1 border-gray-300 text-gray-400 font-medium"
                              onClick={() => handleEditClick("personalInfo")}
                            >
                              Edit
                              <img
                                src={edit}
                                alt="editicon"
                                className="w-4 my-1 h-4"
                              />
                            </button>
                          )}
                        </div>
                        <div className="grid lg:grid-cols-2 grid-cols-1">
                          {isEditing && editedBlock === "personalInfo" ? (
                            <div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  name="firstName"
                                  value={editedForm.firstName}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2 border-2 p-1"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={editedForm.email}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2 border-2 p-1"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">
                                 Job Title
                                </label>
                                <input
                                  type="text"
                                  name="jobTitle"
                                  value={editedForm.jobTitle}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2 border-2 p-1"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">
                                  Phone Number
                                </label>
                                <input
                                  type="tel"
                                  name="phoneNumber"
                                  value={editedForm.phoneNumber}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2 border-2 p-1"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">
                                  Display Name
                                </label>
                                <input
                                  type="text"
                                  name="Display"
                                  value={users.username}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2 border-2 p-1"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <ul className="list-style-none font-medium py-2">
                                <li className="text-gray-500">First Name</li>
                                <li className="text-sm">
                                  {editedForm.firstName}
                                </li>
                              </ul>
                              <ul className="list-style-none font-medium py-2">
                                <li className="text-gray-500">Email address</li>
                                <li className="text-sm">
                                  {users.email}
                                </li>
                              </ul>
                              <ul className="list-style-none font-medium py-2">
                                <li className="text-gray-500">Company Name</li>
                                <li className="text-sm">
                                  {editedForm.companyName}
                                </li>
                              </ul>
                              <ul className="list-style-none font-medium py-2">
                                <li className="text-gray-500">Phone Number</li>
                                <li className="text-sm">
                                  {editedForm.phoneNumber}
                                </li>
                              </ul>
                              <ul className="list-style-none font-medium py-2">
                                <li className="text-gray-500">Display Name</li>
                                <li className="text-sm">
                                  {users.username}
                                </li>
                              </ul>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-100 rounded-2xl my-2">
                      <div className="m-4">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">
                            Additional Information
                          </h3>
                          {isEditing && editedBlock === "Additional" ? (
                            <button
                              className="border flex content-center rounded-2xl px-3 py-1 border-gray-300 text-gray-400 font-medium"
                              onClick={handleSaveClick}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              className="border flex content-center rounded-2xl px-3 py-1 border-gray-300 text-gray-400 font-medium"
                              onClick={() => handleEditClick("Additional")}
                            >
                              Edit
                              <img
                                src={edit}
                                alt="editicon"
                                className="w-4 my-1 h-4"
                              />
                            </button>
                          )}
                        </div>
                        <div className="grid lg:grid-cols-2 grid-cols-1">
                          {isEditing && editedBlock === "Additional" ? (
                            <div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">Country</label>
                                <input
                                  type="text"
                                  name="country"
                                  value={editedForm.country}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">Company Name</label>
                                <input
                                  type="text"
                                  name="companyName"
                                  value={editedForm.companyName}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">
                                  Company size 
                                </label>
                                <input
                                  type="text"
                                  name="jobTitle"
                                  value={editedForm.companySize}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2"
                                />
                              </div>
                              <div className="flex flex-col my-2">
                                <label className="text-gray-500">
                                  PrimaryUse case
                                </label>
                                <input
                                  type="text"
                                  name="primaryUseCase"
                                  value={editedForm.primaryUseCase}
                                  onChange={handleInputChange}
                                  className="text-sm w-1/2"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <div>
                                <ul className="list-style-none font-medium py-2">
                                  <li className="text-gray-500">Country</li>
                                  <li className="text-sm">
                                    {editedForm.country}
                                  </li>
                                </ul>
                                <ul className="list-style-none font-medium py-2">
                                  <li className="text-gray-500">Company Name</li>
                                  <li className="text-sm">
                                    {editedForm.companyName}
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <ul className="list-style-none font-medium py-2">
                                  <li className="text-gray-500">
                                    Company Size Profile
                                  </li>
                                  <li className="text-sm">
                                    {editedForm.companySize}
                                  </li>
                                </ul>
                                <ul className="list-style-none font-medium py-2">
                                  <li className="text-gray-500">
                                    PrimaryUse Case
                                  </li>
                                  <li className="text-sm">
                                    {editedForm.primaryUseCase}
                                  </li>
                                </ul>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No data available. Please fill out the <Link to='/profile'> form.</Link></p>
      )}
    </div>
  );
};

export default UserProfile;