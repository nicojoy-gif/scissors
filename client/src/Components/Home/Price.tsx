import React from 'react'
import check from '../../Assets/check-circle.png'
import wcheck from '../../Assets/check-circlew.png'
import { NavLink } from 'react-router-dom'
import line from '../../Assets/Line 70.png';
function Price() {
  return (
    <div>
        
<section className='my-5 bg-white'  id="pricing-section">
  <div className='my-5'>
    <div className='flex my-5 flex-col mx-auto justify-center'>
      <div className='flex mt-5 justify-center'>
        <img src={line} alt='line' className='h-8' />
      <h2 className='font-bold text-3xl px-2'>
A <span className='text-blue-500'>price perfect</span> for your needs.
      </h2>
      </div>
      <div className='flex justify-center '>
      <p className='py-2 lg:w-1/3   text-center'>From catering for your personal, business, event, socials needs, you can be rest assured we have you in mind our pricing.</p>
    </div>
    </div>
    <div>
    <div className="container mx-auto  flex justify-center items-center">
  <div className="grid lg:grid-cols-3 grid-cols-1">
    <div className='border border-blue-200 lg:rounded-l-xl my-5 rounded-xl w-72 h-96 content-center lg:m-auto '>
      <div className='flex justify-center flex-col m-auto content-center'>
        <div className='flex justify-center flex-col m-auto content-center '>
          <p className='text-xl py-5'>Basic</p>
          <h3 className='font-bold text-3xl'>Free</h3>
          <p className=' text-lg py-2'>
            Free plan for all users
          </p>
          <ul className='text-sm font-semibold'>
            <li className='flex content-center  py-2'><img src={check} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Unlimited URL Shortening</p></li>
            <li className='flex content-center py-2'><img src={check} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Basic Link Analytics</p></li>
            <li className='flex content-center py-2'><img src={check} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Customizable Short Links</p></li>
            <li className='flex content-center py-2'><img src={check} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Standard Support</p></li>
            <li className='flex content-center py-2'><img src={check} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Ad-supported</p></li>
          </ul>
        </div>
      </div>
    </div>
    <div className='bg-cyan-900 text-white rounded-xl my-5 w-72 py-12 '>
      <div className='flex justify-center flex-col m-auto py-12 content-center'>
        <div className='flex justify-center flex-col m-auto content-center '>
          <p className='text-xl py-5'>Professional</p>
          <h3 className='font-bold text-3xl'>$15/month</h3>
          <p className=' text-lg py-2'>
            Ideal for business creators
          </p>
          <ul className='text-sm font-semibold'>
            <li className='flex content-center  py-2'><img src={wcheck} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Enhanced Link Analytics</p></li>
            <li className='flex content-center py-2'><img src={wcheck} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Custom Branded Domains</p></li>
            <li className='flex content-center py-2'><img src={wcheck} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Advanced Link Customization</p></li>
            <li className='flex content-center py-2'><img src={wcheck} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Priority Support</p></li>
            <li className='flex content-center py-2'><img src={wcheck} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Ad-free Experience</p></li>
          </ul>
        </div>
      </div>
    </div>
    <div className='border border-blue-200  lg:rounded-r-xl rounded-xl w-72 h-96 content-center my-4 lg:m-auto'>
      <div className='flex justify-center flex-col m-auto content-center'>
        <div className='flex justify-center flex-col m-auto content-center '>
          <p className='text-xl py-5'>Teams</p>
          <h3 className='font-bold text-3xl'>$25/month</h3>
          <p className=' text-lg py-2'>
            Share with up to 10 users
          </p>
          <ul className='text-sm font-semibold'>
            <li className='flex content-center  py-2'><img src={check} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Team Collaboration</p></li>
            <li className='flex content-center py-2'><img src={check} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>User Roles and Permissions</p></li>
            <li className='flex content-center py-2'><img src={check} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Enhanced Security</p></li>
            <li className='flex content-center py-2'><img src={check} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>API Access</p></li>
            <li className='flex content-center py-2'><img src={check} alt='checked' className='h-4 w-4 mt-1' /><p className='px-2'>Dedicated Account Manager</p></li>
          </ul>
        </div>
      </div>
    </div>
    
  </div>
</div>
<div className='flex justify-center h-16 mb-12'>
<button>    <NavLink to='' className=" py-2 mx-5 px-7 border-blue-500 text-sm text-blue-500 border font-semibold rounded-full transition duration-200">Get Custom Pricing</NavLink></button>
  <button>    <NavLink to='' className=" py-2 mx-5 px-11 bg-blue-500 hover:bg-blue-600 text-sm text-white font-semibold rounded-full transition duration-200">Select Pricing</NavLink></button>
 
  </div>

</div>


  </div>
</section>
    </div>
  )
}

export default Price