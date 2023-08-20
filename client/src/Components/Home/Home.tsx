import React, { useEffect } from 'react'
import Nav from '../Nav/Nav'
import { NavLink } from 'react-router-dom';
import logo from '../../Assets/Vector 3.png'
import image from '../../Assets/Frame 1000001716.png'
import img2 from '../../Assets/Vector 2.png'
import eclipse from '../../Assets/Group 3.png'
import a1 from '../../Assets/Frame 1000001695 (1).png'
import a2 from '../../Assets/Frame 1000001695.png';
import a3 from '../../Assets/Group 6.png'
import a4 from '../../Assets/Frame 1000001718.png';

import c from '../../Assets/bl.png'
import c1 from '../../Assets/bl1.png'
import line from '../../Assets/Line 70.png';
import Price from './Price';
import Faq from './Faq';
import Footer from './Footer';
import Url from './Url';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { auth } from '../Firebase/Firebase';
function Home() {
  useEffect(() => {
    // Initialize Firebase Analytics
    const analytics = getAnalytics();

    // Log an event with the user's ID from Firebase Authentication
    const user = auth.currentUser;
    console.log(user)
    if (user) {
      const userId = user.uid;
      logEvent(analytics, 'home_component_mounted', {
        user_id: userId,
      });
    }
  }, []);
  return (
    <div className='h-screen'>
      <section className='bg-gradient-to-t from-white to-pink-50 h-screen '>
<Nav />
<div className=' '>
  <div className=' text-center font-bold text-4xl h-56 flex justify-center flex-col my-auto '>
    <h1 className=''>
      Optimize Your Online Experience with Our </h1> 
      <h1 className='lg:pt-5 pt-0 '>Advanced <span className='text-blue-500'>URL Shortening </span> Solution
    </h1>
    <div className=' mx-auto my-2 flex justify-center '>
    <img src={logo} alt='logo' className='w-28 ' />
    </div>
  </div>
 
  <div>
    <p className='mx-auto lg:w-1/2 px-5 text-md font-semibold text-center'>
      Personalize your shortened URLs to align with your brand identity. Utilize custom slugs, branded links, and domain customization options to reinforce your brand presence and enhance user engagament.
    </p>
  </div>
  <div className='flex justify-center h-32  m-auto'>
  <button>    <NavLink to='/signup' className=" py-2 mx-5 px-7 bg-blue-500 hover:bg-blue-600 text-sm text-white font-semibold rounded-full transition duration-200">Sign up</NavLink></button>
  <button> <NavLink to='' className=" mx-5 py-2  text-md text-blue-500 font-bold  transition duration-200">Learn more</NavLink></button>
  </div>
</div>
<div className=' relative '>
  <div className='absolute hidden lg:block ml-8 right-1/2'>
<img src={img2} alt='' className='h-48 w-48 '/>
  </div>
  <div className='w-96 lg:absolute mx-auto top-4 lg:mr-8 lg:right-96 '>
  <div className='border-2 border-blue-200 bg-gradient-to-tr from-violet-50 to-white rounded-2xl'>
    <div className='h-40 w-96 flex flex-col justify-center content-center'>
    <div className='flex justify-center my-3'>
    <img src={image} className='w-72 h-14' alt='seamless'/>
    </div>
    <div className=' w-80 flex justify-center mx-auto'>
      <p className='text-center text-sm mx-auto'>
        Seamlessly transform your long URLs into concise and <span className='font-bold'>shareable links</span> with just few clicks.
      </p>
      </div>
    </div>
  </div>
  </div>
</div>

      </section>
      <div className='mt-24  m-auto flex justify-center '>
    <img src={eclipse} alt='logo' className=' ' />
    </div>
   <div className='bg-blue-50 h-36 hidden lg:block'>
  <div className="flex items-center justify-center h-full">
    <div className="container grid grid-cols-6 gap-6">
      <div className='col-span-2'>
        <h1 className='text-3xl font-bold'>
          One Stop.
        </h1>
        <p className='text-3xl font-bold'>
          Four <span className='text-blue-500'>Possibilities</span>
        </p>
      </div>
      <div>
        <h1 className='text-2xl font-bold'>
          3M
        </h1>
        <p className=''>
          Active users
        </p>
      </div>
      <div>
        <h1 className='text-2xl font-bold'>
          60M
        </h1>
        <p className=''>
          Links & QR <br /> codes created
        </p>
      </div>
      <div>
        <h1 className='text-2xl font-bold'>
          1B
        </h1>
        <p className=''>
          Clicked & Scanned connections
        </p>
      </div>
      <div>
        <h1 className='text-2xl font-bold'>
          300K
        </h1>
        <p className=''>
          App Integrations
        </p>
      </div>
    </div>
  </div>
</div><section className='my-5 flex justify-center items-center'>
  <div className="container my-5 flex content-center flex-col ">
    <div className="my-3 grid lg:grid-cols-3 grid-cols-1 gap-6">
      <div className='mx-3'>
        <div className=''>
          <div className='flex my-3'>
            <img src={line} alt='line' className='h-8'/>
            <h2 className='text-3xl px-2 font-bold'>Why choose <span className='text-blue-500'>Scissors</span></h2>
          </div>
          <p className='px-5'>
            Scissors is the hub of everything that has to do with your link management. We shorten your URLs, allow you to create custom ones for your personal, business, event usage. Our swift QR code creation, management, and usage tracking with advanced analytics for all of these is second to none.
          </p>
        </div>
      </div>
      <div>
        <div className='mx-7'>
          <img src={a3} alt='shortening-logo' className='h-10 w-10'/>
          <h2 className='font-semibold text-3xl my-4'>URL Shortening</h2>
          <p className=''>Scissor allows you to shorten URLs of your business, events. Shorten your URL at scale, URL redirects</p>
        </div>
      </div>
      <div>
        <div>
          <div className='mx-7'>
            <img src={a2} alt='shortening-logo' className='h-10 w-10'/>
            <h2 className='font-semibold text-3xl my-4'>Custom URLs</h2>
            <p className=''>With Scissor, you can create custom URLs, with the length you want! A solution for socials and businesses.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid lg:grid-cols-3 mb-5 grid-cols-1 gap-6">
      <div>
        {/* Empty grid item */}
      </div>
      <div>
        <div className='mx-7'>
          <img src={a1} alt='shortening-logo' className='h-10 w-10'/>
          <h2 className='font-semibold text-3xl my-4'>QR Codes</h2>
          <p className=''>Generate QR codes for your business, events. Bring your audience and customers to your doorstep with this scan and go solution.</p>
        </div>
      </div>
      <div>
        <div>
          <div className='mx-7'>
            <img src={a4} alt='shortening-logo' className='h-10 w-10'/>
            <h2 className='font-semibold text-3xl my-4'>Data Analytics</h2>
            <p className=''>Receive data on the usage of either your shortened URL, custom URLs, or generated QR codes. Embedded to monitor progress.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section>
<Price />
</section>
<section className='url-section'>
<Url />
</section>
<section >
<Faq />
</section><section className='bg-cyan-900 relative h-72'>

<div className='absolute hidden lg:block top-0'>
  <img src={c1} className='h-64' alt='background'/>
</div>

<div className='absolute hidden lg:block bottom-0 right-0'>
  <img src={c} className='h-48 filter brightness-20' alt='background'/>
</div>

<div className='flex justify-center items-center h-full'>
  <div className='flex flex-col items-center'>
    <h1 className='text-white font-bold text-3xl my-5 p-auto text-center'>Revolutionizing Link Optimization</h1>
    <button className='text-white bg-blue-500 p-2 rounded-full w-40 my-5 text-center'>Get started</button>
  </div>
</div>

</section>
<Footer />
    </div>
  )
}

export default Home