import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Google from "../../Assets/logo_googleg_48dp.png";
import apple from "../../Assets/Path.png";
import vector from "../../Assets/Vector.png";
import Footer from "../Home/Footer";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { loginCall, signCall } from "../Apicalls";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

type Props = {};
interface UserCredentials {
  email: string;
  password: string;
}
const Login = (props: Props) => {
  const [email, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, users } = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();
  const isNewUser = location.state && location.state.isNewUser;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential: UserCredentials = {
        email: email,
        password: password,
      };
      console.log(userCredential);
      const response = await loginCall(userCredential, dispatch);

      if (response) {
        console.log(users);

        const user = firebase.auth().currentUser;
        console.log(isNewUser);
        console.log(user);
        if (user) {
          await firebase.auth().signInWithEmailAndPassword(email, password);
          console.log(isNewUser);
        }
        if (isNewUser) {
          console.log("New user signed in");
          Navigate("/profile");
        } else {
          console.log("Existing user signed in");
          Navigate("/userprofile");
        }
      } else {
        console.log("unsuccessful");
      }
      localStorage.setItem("authToken", users.token);
      console.log(users.token);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
  
      if (user) {
        const displayName = user.displayName;
        const email = user.email;
        const password = user.uid;
  
        if (displayName && email) {
          const checkResponse = await axios.post('https://scissors-avus.onrender.com/api/auth/check-email', {
            email,
          });
  
          if (checkResponse.data.isRegistered) {
            // Email is already registered, log in the user
            const userCredential = {
              email: email,
              password: password,
            };
  
            try {
              // Call the loginCall function to handle user login
              const loginResponse = await loginCall(userCredential, dispatch);
  
              if (loginResponse) {
                // User logged in successfully
                localStorage.setItem("authToken", loginResponse.token);
  
                if (checkResponse.data.isNewUser) {
                  Navigate('/profile', { state: { isNewUser: false } });
                } else {
                  Navigate('/userprofile', { state: { isNewUser: false } });
                }
              } else {
                console.error('User login failed.');
                // Handle login failure if needed
              }
            } catch (error) {
              console.error('Error during login:', error);
              // Handle login error
            }
          } else {
            // Email is not registered, register the user
            const userCredential = {
              username: displayName, // Use displayName as the username
              email,
              password,
            };
  
            try {
              // Call the signCall function to handle user registration
              const registrationResponse = await signCall(userCredential, dispatch);
  
              if (registrationResponse && (registrationResponse.status === 200 || registrationResponse.status === 201)) {
                // User registered successfully, dispatch LOGIN_SUCCESS
                dispatch({ type: 'LOGIN_SUCCESS', payload: true });
  
                localStorage.setItem("authToken", registrationResponse.data.token);
                // Navigate to the profile page
                Navigate('/userprofile', { state: { isNewUser: false } });
              } else {
                console.error('User registration failed.');
                // Handle registration failure if needed
              }
            } catch (error) {
              console.error('Error during registration:', error);
              // Handle registration error
            }
          }
        } else {
          console.log('Invalid user data from Google authentication.');
        }
      } else {
        console.log('No authenticated user.');
      }
    } catch (error:any) {
      console.log('Error signing in with Google:', error.message);
    }
  };
  
  
  
  return (
    <div>
      {isNewUser && (
        <div className="text-green-500 text-center font-bold mb-4">
          Welcome, new user! You have successfully signed up. Please log in with
          your new account.
        </div>
      )}
      <section className="flex h-screen justify-center content-center m-auto">
        <div className="w-5/6 lg:w-1/3 m-auto grid content-center">
          <form onSubmit={handleLogin}>
            <div>
              <p className="text-gray-500 font-medium text-center py-4">
                Log in with:
              </p>
              <div>
                <div className="flex mx-auto justify-center items-center ">
                  <button
                    onClick={signInWithGoogle}
                    className="w-32 shadow-sm mx-3 rounded py-2 bg-blue-700 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  >
                    <div className=" p-1 rounded-full">
                      <img src={Google} alt="google-logo" />
                    </div>
                    <span className="text-white">Google</span>
                  </button>

                  <button className="w-32 mx-3  shadow-sm rounded py-2 bg-blue-700 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline ">
                    <div className="p-1 rounded-full">
                      <img src={apple} alt="apple-logo" />
                    </div>
                    <span className="text-white">Apple</span>
                  </button>
                </div>

                <div>
                  <div className="mb-7 border-b text-center">
                    <div className="leading-none px-5 inline-block  text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Or
                    </div>
                  </div>

                  <div className="mx-auto ">
                    {/* Email/Username Input */}
                    <input
                      className="w-full cursor-pointer px-8 py-3 rounded-lg font-medium  border-2 border-blue-700 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />

                    <div className="relative ">
                      {/* Password Input */}
                      <input
                        className="w-full px-8 py-2 cursor-pointer rounded-lg font-medium  border-2 border-blue-700 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        placeholder="password"
                        type={isPasswordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className="absolute cursor-pointer bottom-3 end-0 grid place-content-center px-4"
                        onClick={() => setIsPasswordVisible((prev) => !prev)} // Toggle the visibility on click
                      >
                        {" "}
                        <img src={vector} alt="password-icon" />
                      </span>
                    </div>

                    <div className="flex justify-end cursor-pointer">
                      <p className="text-blue-400 text-sm pt-3">
                        Forgot your password?
                      </p>
                    </div>

                    {/* Login Button */}
                    <button className="mt-5 tracking-wide font-semibold bg-blue-700 text-gray-100 w-full py-3 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <span className="ml-3">Log in</span>
                    </button>

                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Don't have an account?{" "}
                      <NavLink to="/signup" className="text-blue-700">
                        Sign up
                      </NavLink>
                    </p>

                    <p className="text-gray-400 py-3 text-xs text-center">
                      By signing in with an account, you agree to Scissor's{" "}
                      <span className="text-gray-700">
                        Terms of Service, Privacy Policy{" "}
                        <span className="text-gray-400">and</span>Acceptable Use
                        Policy.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
