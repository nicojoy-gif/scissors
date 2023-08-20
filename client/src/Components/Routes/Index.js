import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Profile from '../Profile/Profile';
import UserProfile from '../Profile/Userprofile';
import UserUrlsComponent from '../url/Shortened';
import Shortened from '../url/Shortened';
import AnalyticsComponent from '../Analytics/Analytics';
import LogoutPage from '../Home/Logout';
import ErrorPage from '../Error';

function Index() {
  return (
   <>
   <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/url' element={<UserUrlsComponent />}/>
        <Route path='/userprofile' element={<UserProfile />}/>
        <Route path='/Allurls' element={<Shortened />} />
        <Route path='/analytics' element={<AnalyticsComponent />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='*' element={<ErrorPage />} />
   </Routes>
   </>
  )
}

export default Index