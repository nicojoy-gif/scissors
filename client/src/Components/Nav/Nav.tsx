import React, { useEffect, useState } from "react";
import logo from "../../Assets/Logo.png";
import chevron from "../../Assets/chevron-down.png";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { getAnalytics, logEvent } from "firebase/analytics";
import { auth } from "../Firebase/Firebase";

function Nav() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    const analytics = getAnalytics();

    // Log an event with the user's ID from Firebase Authentication
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      logEvent(analytics, "nav_component_mounted", {
        user_id: userId,
      });
    } else {
      // Log an event without user ID if not logged in
      logEvent(analytics, "nav_component_mounted");
    }
  }, []);

  return (
    <div>
      <section>
        <div>
          <nav className="relative px-4 py-4 flex fixed justify-between items-center mx-auto mb-5 lg:w-5/6">
            {/* Hide the logo when the navbar is open */}
            {!navbarOpen && (
              <NavLink to="/" className="text-3xl font-bold leading-none">
                <img src={logo} alt="logo" />
              </NavLink>
            )}
            <div className="lg:hidden">
              <button
                className="navbar-burger flex items-center text-blue-600 p-3"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <svg
                  className="block h-6 w-6 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Mobile menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              </button>
            </div>
            <ul className="hidden absolute top-1/2 text-black left-1/2 transform font-semibold text-md -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-8">
             <li>
                <NavLink
                  to="/Allurls"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500" : "text-black"
                  }
                >
                  My URLs
                </NavLink>
              </li>
              <li className="relative ">
                <button
                  id="dropdownNavbarLink"
                  onClick={toggleDropdown}
                  data-dropdown-toggle="dropdownNavbar"
                  className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-semibold flex items-center justify-between w-full md:w-auto"
                >
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : "text-black"
                    }
                  >
                    Features
                  </NavLink>{" "}
                  <img
                    src={chevron}
                    className={`mt-1 ${
                      dropdownOpen ? "transform rotate-180" : ""
                    }`}
                    alt="arrow-down"
                  />
                </button>

                <div
                  id="dropdownNavbar"
                  className={`bg-white text-base absolute  z-10 list-none divide-y divide-gray-100 rounded shadow  w-44 ${
                    dropdownOpen ? "" : "hidden"
                  }`}
                >
                  <ul className="py-1" aria-labelledby="dropdownLargeButton">
                    <li>
                      <NavLink
                        to="/userprofile"
                        className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="#"
                        className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                      >
                        Settings
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="#"
                        className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                      >
                        Earnings
                      </NavLink>
                    </li>
                  </ul>
                  <div className="py-1">
                    <NavLink
                      to="/logout"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                    >
                      Sign out
                    </NavLink>
                  </div>
                </div>
              </li>

              <li>
                <Link
                  activeClass="text-blue-500 cursor-pointer"
                  className="cursor-pointer"
                  to="pricing-section" // ID of the section to scroll to
                  spy={true}
                  smooth={true}
                  offset={-70} // Offset for fixed navbar height (adjust as needed)
                  duration={500}
                >
                  Pricing
                </Link>
              </li>

              <li>
                <NavLink
                  to="/analytics"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500" : "text-black"
                  }
                >
                  Analytics
                </NavLink>
              </li>

              <li>
                <Link
                  activeClass="text-blue-500 cursor-pointer"
                  className="cursor-pointer"
                  to="faq-section" // ID of the section to scroll to
                  spy={true}
                  smooth={true}
                  offset={-70} // Offset for fixed navbar height (adjust as needed)
                  duration={500}
                >
                  FAQs
                </Link>
              </li>
            </ul>
            <NavLink
              to="/login"
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 text-md text-blue-500 font-semibold rounded-xl transition duration-200"
            >
              Log in
            </NavLink>
            <NavLink
              to="/signup"
              className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-semibold rounded-full transition duration-200"
            >
              Try for free
            </NavLink>
          </nav>
          <div
            className={`navbar-menu relative z-50 ${
              navbarOpen ? "block" : "hidden"
            }`}
          >
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
              <div className="flex items-center mb-8">
                {/* Show the logo in the mobile menu */}
                <NavLink
                  to="/"
                  className="mr-auto text-3xl font-bold leading-none"
                >
                  <img src={logo} alt="logo" />
                </NavLink>
                <button
                  className="navbar-close"
                  onClick={() => setNavbarOpen(false)}
                >
                  <svg
                    className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div>
                <ul>
                  <li className="mb-1">
                    <NavLink
                      to="/Allurls"
                      className="block p-4 text-sm font-semibold cursor-pointer text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                    >
                      My URLs
                    </NavLink>
                  </li>
                  <li className="mb-1">
                    <NavLink
                      to=""
                      className="block p-4 text-sm font-semibold text-gray-400 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded"
                    >
                      Features
                    </NavLink>
                  </li>
                  <li className="mb-1">
                    <Link
                      to="pricing-section" // ID of the section to scroll to
                      spy={true}
                      smooth={true}
                      offset={-70} // Offset for fixed navbar height (adjust as needed)
                      duration={500}
                      className="block p-4 text-sm font-semibold text-gray-400 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li className="mb-1">
                    <NavLink
                      to="/analytics"
                      className="block p-4 text-sm font-semibold cursor-pointer text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                    >
                      Analytics
                    </NavLink>
                  </li>
                  <li className="mb-1">
                    <Link
                      to="faq-section" // ID of the section to scroll to
                      spy={true}
                      smooth={true}
                      offset={-70} // Offset for fixed navbar height (adjust as needed)
                      duration={500}
                      className="block p-4 text-sm font-semibold cursor-pointer text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-auto">
                <div className="pt-6">
                  <NavLink
                    to="/login"
                    className="block px-4 py-3 mb-3 cursor-pointer leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="block px-4 py-3 mb-2 cursor-pointer leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
                  >
                    Try for free
                  </NavLink>
                </div>
                <p className="my-4 text-xs text-center text-gray-400">
                  <span>Copyright © 2021</span>
                </p>
              </div>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Nav;
