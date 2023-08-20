import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Google from '../../Assets/logo_googleg_48dp.png';
import apple from '../../Assets/Path.png';
import vector from '../../Assets/Vector.png';
import Footer from '../Home/Footer';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import axios from 'axios';
import {auth} from '../Firebase/Firebase'
import { AuthContext } from '../Context/AuthContext';
import {UPDATE_USER_FROM_STORAGE} from '../Context/AuthActions' 
import { loginCall, signCall } from '../Apicalls';
type Props = {};

const Signup = (props: Props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Repassword, setRepassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRetypePasswordVisible, setIsRetypePasswordVisible] = useState(false);
const {dispatch, users} = useContext(AuthContext)
const Navigate = useNavigate()
const handleSignup = async () => {
  try {
    // Call your backend /register endpoint to handle registration
    const response = await axios.post('https://scissors-avus.onrender.com/api/auth/register', {
      username,
      email,
      password,
    });
    console.log(response);

    // Check if registration was successful on the backend
    if (response.status === 200 || response.status === 201) {
      // Check if the password matches the re-entered password
      if (password !== Repassword) {
        alert('Passwords do not match. Please re-enter the password correctly.');
        return; // Stop the signup process if passwords do not match
      }

      // Create the user in Firebase Authentication
      await auth.createUserWithEmailAndPassword(email, password);
      Navigate('/login', {state: {isNewUser: true}});
      // You can show a success message or redirect to another page here
    } else {
      // Handle registration error
      alert(response.data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Registration failed. Please try again.');
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
      <section className='flex h-screen justify-center content-center m-auto'>
        <div className='w-5/6 lg:w-1/3 m-auto grid content-center'>
          <div>
            <p className='text-gray-500 font-medium text-center py-4'>Sign up with:</p>
            <div>
              <div className="flex mx-auto justify-center items-center ">
                {/* Google Sign Up */}
                <button
                  onClick={signInWithGoogle} className="w-32 shadow-sm mx-3 rounded py-2 bg-blue-700 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                >
                  <div className=" p-1 rounded-full">
                    <img src={Google} alt='google-logo' />
                  </div>
                  <span className="text-white">
                    Google
                  </span>
                </button>

                {/* Apple Sign Up */}
                <button
                  className="w-32 mx-3  shadow-sm rounded py-2 bg-blue-700 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline "
                >
                  <div className="p-1 rounded-full">
                    <img src={apple} alt='apple-logo'/>
                  </div>
                  <span className="text-white">
                    Apple
                  </span>
                </button>
              </div>

              {/* Or */}
              <div>
                <div className="mb-7 border-b text-center">
                  <div
                    className="leading-none px-5 inline-block  text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
                  >
                    Or
                  </div>
                </div>

                {/* Email Sign Up */}
                <div className="mx-auto ">
                  <input
                    className="w-full cursor-pointer px-8 py-2 rounded-lg font-medium  border-2 border-blue-700 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="w-full px-8 py-2 cursor-pointer rounded-lg font-medium  border-2 border-blue-700 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className='relative'>
                  <input
                
                className="w-full px-8 py-2 cursor-pointer rounded-lg font-medium  border-2 border-blue-700 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    placeholder='password'
                type={isPasswordVisible ? 'text' : 'password'}
                
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute cursor-pointer bottom-3 end-0 grid place-content-center px-4"
                onClick={() => setIsPasswordVisible((prev) => !prev)} // Toggle the visibility on click
              >
                    <img src={vector} alt='password-icon'/>
                    </span>
                  </div>

                  {/* Retype Password */}
                  <div className='relative'>
                  <input
                
                className="w-full px-8 py-2 cursor-pointer rounded-lg font-medium  border-2 border-blue-700 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    placeholder='Retype password'
                type={isRetypePasswordVisible ? 'text' : 'password'}
                
                value={Repassword}
                onChange={(e) => setRepassword(e.target.value)}
              />
              <span
                className="absolute cursor-pointer bottom-3 end-0 grid place-content-center px-4"
                onClick={() => setIsRetypePasswordVisible((prev) => !prev)} // Toggle the visibility on click
              > <img src={vector} alt='password-icon'/>
                    </span>
                  </div>

                  {/* Password Requirements */}
                  <div className=''>
                    <p className='text-gray-400 text-xs pt-3'>
                      6 or more characters, one number, one uppercase & one lower case.
                    </p>
                  </div>

                  {/* Sign Up Button */}
                  <button
                    className="mt-5 tracking-wide font-semibold bg-blue-700 text-gray-100 w-full py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={handleSignup}
                  >
                    <span className="ml-3">
                      Sign up with Email
                    </span>
                  </button>

                  {/* Already have an account? */}
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account? <NavLink to='/login' className='text-blue-700'>Log in</NavLink>
                  </p>

                  {/* Terms of Service and Privacy Policy */}
                  <p className='text-gray-400 py-3 text-xs text-center'>
                    By signing in with an account, you agree to Scissor's <span className='text-gray-700'>Terms of Service, Privacy Policy <span className='text-gray-400'> and </span>Acceptable Use Policy.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Signup;
