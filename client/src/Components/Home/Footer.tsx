import React from 'react'
import bg from '../../Assets/b1.png';
import b1 from '../../Assets/bg.png'
import logo from '../../Assets/Logo (1).png'
import a from '../../Assets/i.fi-social-facebook.png'
import a1 from '../../Assets/i.fi-social-linkedin.png'
import a2 from '../../Assets/i.fi-social-twitter.png'
import a3 from '../../Assets/svg.feather.png'
function Footer() {
  return (
    <div>

      <section className='bg-white  relative'>
                 
<div className='absolute  bottom-0 '>
  <img src={b1} className='h-5/6 w-5/6 ' alt='background'/>
</div>

<div className='absolute  bottom-0 right-0 '>
  <img src={bg} className='h-96 w-96' alt='background'/>
</div>
<div className="">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
        <div className="md:max-w-md lg:col-span-2">
           <img src={logo} alt='logo'/>
            <div className='flex my-5'>
              <img src={a2} alt='twitter-logo' className='mx-3'/>
              <img src={a3} alt='instagram-logo' className='mx-3'/>
              <img src={a1} alt='linked-logo' className='mx-3'/>
              <img src={a} alt='facebook-logo' className='mx-3'/>
            </div>
           
          </div>
          <div className="grid grid-cols-2 gap-5  row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-bold tracking-wide text-black">
                Why Scissor ?
              </p>
              <ul className="mt-2 space-y-1 text-sm font-medium">
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Scissor 101
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Integrations & API
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Pricing
                  </a>
                </li>
               
              </ul>
            </div>
            <div>
              <p className="font-bold tracking-wide ">Solutions</p>
              <ul className="mt-2 space-y-1 text-sm font-medium">

                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Social Media
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Digital Marketing
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Customer Service
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    For Developer
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold tracking-wide">Products</p>
              <ul className="mt-2 space-y-1 text-sm font-medium">
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Link Management
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                  QR Codes
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Link-in-bio
                  </a>
                </li>
                
                
               
              </ul>
            </div>
            <div>
              <p className="font-bold tracking-wide ">
                Company
              </p>
              <ul className="mt-2 space-y-1 text-sm font-medium">
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    About Scissor
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                   Partners
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                   Press
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                   Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                   Reviews
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:max-w-md lg:col-span-2">
          
           
          </div>
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-bold tracking-wide text-black">
               Resources
              </p>
              <ul className="mt-2 space-y-1 text-sm font-medium">
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Resource Library
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Developers
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    App Connectors
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Trust Center
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Browser Extension
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold tracking-wide ">Features</p>
              <ul className="mt-2 space-y-1 text-sm font-medium">

                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                   Branded Links
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Mobile Links
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Campaign
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                   Management &
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    QR Code generation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold tracking-wide">Legal</p>
              <ul className="mt-2 space-y-1 text-sm font-medium">
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                  Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                  Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                 Acceptable Use Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                Code of Conduct
                  </a>
                </li>                
               
              </ul>
            </div>
            
             
          
          </div>
          
        </div>
        <div className="flex flex-col text-sm  justify-end pt-5 pb-10 sm:flex-row">
         
          <div className="flex items-center mt-4 mr-0  space-x-3 sm:mt-0 text-sm" >
            <p>Term of Service |</p>
            <p>Security |</p>
            <p>Scissor 2023</p>
          </div>
        </div>
      </div>
    </div>
      </section>
    </div>
  )
}

export default Footer