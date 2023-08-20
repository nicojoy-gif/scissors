import axios from "axios";

export const loginCall = async (userCredential: any, dispatch: any) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "https://scissors-avus.onrender.com/api/auth/login",
      userCredential
    ); 
    console.log(res)
    const users = res.data;
  
    if (users) {
      dispatch({ type: "LOGIN_SUCCESS", payload: users });
      
      return users; // Return the users object on successful login
    } else {
      throw new Error("Invalid response from the login API");
    }
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    throw err; // Throw the error to be caught in the handleLogin function
  }
};


export const signCall = async (userCredential: any, dispatch: any) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      userCredential
    ); 
    const users = res.data;
    console.log(users)
    if (users) {
      dispatch({ type: "LOGIN_SUCCESS", payload: users });
      
      return users; // Return the users object on successful login
    } else {
      throw new Error("Invalid response from the login API");
    }
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    throw err; // Throw the error to be caught in the handleLogin function
  }
};