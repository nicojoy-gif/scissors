import React, { useEffect, useState } from "react";
import b from "../../Assets/Vector2.png";
import b1 from "../../Assets/Vector (1).png";
import b2 from "../../Assets/Vector (2).png";
import b3 from "../../Assets/Vector (3).png";
import b4 from "../../Assets/Vector (4).png";
import b5 from "../../Assets/magic wand.png";
import axios from "axios";
import link from '../../Assets/linkicon.png'
import facebook from '../../Assets/i.fi-social-facebook.png'
import twitter from '../../Assets/i.fi-social-twitter.png'
import email from '../../Assets/email.png'
import whatsapp from '../../Assets/whatsapp.png'
import wand from '../../Assets/magic-wand_820798.png'
import qr from '../../Assets/code.png'
import arrow from '../../Assets/share_2958791.png'
import share from '../../Assets/share_929539.png'
import copy from '../../Assets/copy_1621635.png'
import { NavLink } from "react-router-dom";
import { Firebase } from "../Firebase/Firebase";
function Url() {
  const [longUrl, setLongUrl] = useState("");
  const [aliasAvailable, setAliasAvailable] = useState(true);
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrUrl, setqrUrl] = useState("");
  const [qrCodeDataUrl, setQRCodeDataUrl] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); 
  const [showQRModal, setShowQRModal] = useState(false);
  const [showSharingPopover, setShowSharingPopover] = useState(false);
  const [showSharingModal, setShowSharingModal] = useState(false);
  const [showCopiedPopover, setShowCopiedPopover] = useState(false);
  const handleShareClick = () => {
    setShowSharingPopover(!showSharingPopover);
  };
  const closeCopiedPopover = () => {
    setShowCopiedPopover(false);
  };
const sessionIdentifier = getSessionIdentifier()
  function getSessionIdentifier() {
    // Retrieve the session identifier from local storage
    const sessionIdentifier = localStorage.getItem("session_id");
    return sessionIdentifier || "YOUR_DEFAULT_SESSION_IDENTIFIER";
  }
  useEffect(() => {
    // Generate or retrieve the session identifier from cookies or local storage
    const sessionIdentifier = getSessionIdentifier(); // Implement getSessionIdentifier() as needed
console.log(sessionIdentifier)
  })
  const handleSharingOptionClick = (platform:any) => {
    switch (platform) {
      case "WhatsApp":
        shareToWhatsApp();
        break;
      case "Facebook":
        shareToFacebook();
        break;
        case "Twitter":
      shareToTwitter();
      break;
    case "Email":
      shareToEmail();
      break;
      // Add more cases for other platforms...
      default:
        break;
    }
  };
  const shareToTwitter = () => {
    // Check if the shortUrl is a valid URL (including the protocol)
    if (!shortUrl || !shortUrl.startsWith("http")) {
      console.error("Invalid short URL:", shortUrl);
      return;
    }
  
    // Create a Twitter sharing URL
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shortUrl)}`;
  
    // Open the Twitter sharing URL in a new window
    window.open(twitterShareUrl, "_blank");
  };
  
  const shareToEmail = () => {
    // Check if the shortUrl is a valid URL (including the protocol)
    if (!shortUrl || !shortUrl.startsWith("http")) {
      console.error("Invalid short URL:", shortUrl);
      return;
    }
  
    // Create the subject and body for the email
    const emailSubject = "Check out this link";
    const emailBody = `I wanted to share this link with you:\n\n${shortUrl}`;
  
    // Create a mailto link with the subject and body
    const emailLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  
    // Open the email link in a new window
    window.open(emailLink);
  };
  const shareToWhatsApp = () => {
    // Assuming you have a URL or message you want to share
    const shareUrl = "https://example.com";

    // Create a link that opens WhatsApp with a pre-filled message
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
      `Check out this link: ${shareUrl}`
    )}`;

    // Open the WhatsApp sharing link
    window.open(whatsappLink, "_blank");
  };

  const shareToFacebook = () => {
    // Check if the shortUrl is a valid URL (including the protocol)
    if (!shortUrl || !shortUrl.startsWith("http")) {
      console.error("Invalid short URL:", shortUrl);
      return;
    }
  
    // Create a Facebook sharing URL
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shortUrl)}`;
  
    // Open the Facebook sharing URL in a new window
    window.open(facebookShareUrl, "_blank");
  };
  
  const copyToClipboard = () => {
    // Check if the shortUrl is a valid URL (including the protocol)
    if (!shortUrl || !shortUrl.startsWith("http")) {
      console.error("Invalid short URL:", shortUrl);
      return;
    }
  console.log(sessionIdentifier)
    // Create a temporary input element to copy the text to clipboard
    const tempInput = document.createElement("input");
    tempInput.value = shortUrl;
    document.body.appendChild(tempInput);
  
    // Select the text in the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
  
    // Copy the text to clipboard
    document.execCommand("copy");
  
    // Remove the temporary input element
    document.body.removeChild(tempInput);
  
    // You can show a notification or update the UI to indicate the URL was copied
    console.log("Short URL copied to clipboard:", shortUrl);
    setShowCopiedPopover(true);

    // Automatically hide the popover after a few seconds (adjust the duration as needed)
    setTimeout(() => {
      closeCopiedPopover();
    }, 3000); // Hide the popover after 3 seconds
  };
  useEffect(() => {
    // Log a page view event
    Firebase.analytics().logEvent("page_view", {
      page_title: "Url Page",
    });
  }, []);

  const handleSharingModalClose = () => {
    setShowSharingModal(false);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://scissors-avus.onrender.com/api/url/shorten",
        { url: longUrl, alias, sessionIdentifier }
      );
      setAliasAvailable(true);
      setShortUrl(response.data.shortUrl);
      setqrUrl(response.data.urlCode);
      setFormSubmitted(true);
      console.log(qrUrl);
      console.log(response);
    } catch (error:any) {
      if (error.response) {
        // 409 status code indicates conflict or alias in use
        setAliasAvailable(false);
        if (error.response && error.response.status === 404) {
          console.log('URL not found error:', error.response.data.error);
        } else if (error.response && error.response.status === 409) {
          console.log('Alias in use:', error.response.data.error);
        } else {
          console.error(error);
        }
       
        // Alias is not available
      } else {
        console.error(error);
      }
    }
  };
  const handleModalClose = () => {
    setShowQRModal(false); // Close the modal
  };
  const handleGenerateQRCode = async () => {
    try {
      const response = await axios.post(
        `https://scissors-avus.onrender.com/api/url/scan/${qrUrl}`
      );
      setQRCodeDataUrl(response.data.qrCodeDataUrl);
      setShowQRModal(true);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadQRCode = () => {
    // Create an anchor element and set the QR code data URL as the href
    const link = document.createElement("a");
    link.href = qrCodeDataUrl;
    link.download = "qr_code.png"; // Set the filename for the downloaded QR code
    link.click(); // Trigger the download
  };
  return (
    <div>
      <section className="h-96 bg-cyan-900 flex relative">
        <div className="absolute hidden lg:block  bottom-0 ">
          <img
            src={b}
            className="h-96 w-96 filter brightness-50"
            alt="background"
          />
        </div>

        <div className="absolute hidden lg:block bottom-0 ">
          <img
            src={b1}
            className="h-96 w-80 filter brightness-20"
            alt="background"
          />
        </div>

        <div className="absolute hidden lg:block bottom-0">
          <img
            src={b2}
            className="h-96 filter brightness-10"
            alt="background"
          />
        </div>
        <div className="absolute hidden lg:block right-0 bottom-0 ">
          <img
            src={b3}
            className="h-48 w-96 filter brightness-50"
            alt="background"
          />
        </div>

        <div className="absolute hidden lg:block right-0 bottom-0 ">
          <img
            src={b4}
            className="h-24 w-80 filter brightness-20"
            alt="background"
          />
        </div>
        <div className="m-auto   h-80 lg:w-2/6 w-4/6 rounded-2xl flex items-center justify-center">
        {!formSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="relative py-3 sm:max-w-xl  sm:mx-auto">
              <div className="relative px-4  bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                <div className="max-w-md mx-auto">
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="flex flex-col">
                        <input
                          type="text"
                          className="px-4 py-2 font-medium border-2 focus:ring-blue-300 cursor-pointer focus:border-blue-300 w-full sm:text-sm border-blue-300 rounded-md focus:outline-none text-blue-300 placeholder-blue-300"
                          placeholder="Paste URL here..."
                          value={longUrl}
                          onChange={(e) => setLongUrl(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <div className="relative focus-within:text-blue-300 text-blue-300">
                            <select
                              className=" px-3 font-medium py-2 border-2 cursor-pointer focus:ring-blue-300 focus:border-blue-300 w-full sm:text-sm border-blue-300 rounded-md focus:outline-none text-blue-300"
                              id="grid-state"
                            >
                              <option className="font-medium cursor-pointer">Choose Domain</option>
                              <option className="font-medium cursor-pointer">http://localhost:5000</option>
                            </select>
                            <div className="absolute left-3 top-2"></div>
                          </div>
                        </div>
                        <div className="flex flex-col">
  <div className="relative focus-within:text-blue-300 text-blue-300">
    <input
      type="text" 
      className={`px-4 placeholder-blue-300 font-medium cursor-pointer py-2 border-2 focus:ring-blue-300 cursor-pointer focus:border-blue-300 w-full sm:text-sm border-blue-300 rounded-md focus:outline-none  ${!aliasAvailable ? 'text-red-500' : 'text-blue-300'}`}
      placeholder="Type Alias here"
      value={alias}
      onChange={(e) => {
        setAlias(e.target.value);
        setAliasAvailable(true); // Reset alias availability on input change
      }}
    />
   
  </div>
  {!aliasAvailable && (
      <div className="absolute left-3 top-2 text-red-500">Alias is already in use</div>
    )}
</div>

                      </div>
                    </div>
                    <div className="py-4 flex items-center space-x-4">
                      <button className="bg-blue-500 font-medium flex justify-center items-center w-full text-white px-4 py-3 rounded-full focus:outline-none">
                        Trim URL <img src={b5} alt="magicwand" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
          </form>
        ) : ( // Show result div if formSubmitted is true
        <div className="relative  sm:max-w-xl  sm:mx-auto">
              <div className="relative px-4 py-3 bg-white mx-8 md:mx-0 shadow rounded-3xl ">
                <div className="max-w-md mx-auto">
                 
                      
           
          <div className="flex my-2">
  <img src={link} alt="link-icon" className="h-6 w-6 mr-2" />
  <p className="font-medium text-gray-700 ">Your Long URL</p>
</div>
<p className="border cursor-pointer border-gray-500 h-12 text-blue-600 px-2 py-2 rounded overflow-hidden">
  <span
    className="  flex whitespace-nowrap overflow-auto scrollbar-hide md:scrollbar-default"
  >
    {longUrl}
  </span>
</p>
</div>

<div className="my-4">
  <div className="flex my-2">
  <img src={wand} alt="link-icon" className="h-6 w-6 mr-2" />

<p className="font-medium text-gray-700 ">Your Shorten URL</p>
</div>
<p className="border cursor-pointer border-gray-500 h-12 rounded text-blue-600 px-2 py-2">{shortUrl} </p>
</div><div className="flex mt-5 text-white font-medium">
<NavLink to={shortUrl} target="_blank" rel="noopener noreferrer">
  <div className="w-14 cursor-pointer hover:bg-blue-900 h-10 border border-blue-700 rounded flex items-center justify-center" title="Visit URL">
    <img src={arrow} alt="redirect-arrow" className="h-6 w-6" />
  </div>
</NavLink>

  <div  onClick={handleGenerateQRCode} className="h-10 w-40 cursor-pointer hover:bg-blue-900  mx-1 bg-blue-800 rounded flex items-center justify-center" title="Generate QR Code">
    <img src={qr} alt="qrcode icon" className="h-6 w-6 mx-2" onClick={handleGenerateQRCode} /> QR Code
    {showQRModal && (
        <div className="fixed top-0 left-0 w-full h-full flex  items-center justify-center bg-gray-800 bg-opacity-50">
          {/* Modal content */}
          <div className="bg-white p-6 rounded shadow-md">
            {/* Display your QR code image */}
            {qrCodeDataUrl && <img src={qrCodeDataUrl} alt="QR code" />}
            <div className="flex justify-between">
            <button
              className="mt-4 bg-blue-500 text-white cursor-pointer py-2 px-4 rounded"
              onClick={(e) => {
                e.stopPropagation(); // Stop event propagation
                handleModalClose();
              }}
            >
              Close
            </button>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 cursor-pointer rounded"
              onClick={handleDownloadQRCode}
            >
              Download
            </button>
            </div>
          </div>
        </div>
      )}
   
  </div>
  <div className="relative">
        {/* Share button */}
        <div
          className="h-10 px-5 cursor-pointer hover:bg-blue-900  mx-1 bg-blue-800 rounded flex items-center justify-center"
          title="Share your url"
          onClick={handleShareClick}
        >
          <img src={share} alt="share-icon" className="h-4 w-4 mx-2" /> Share
        </div>

        {/* Sharing options popover */}
        {showSharingPopover && (
          <div className="absolute right-0 bottom-12 mt-2 bg-white border border-gray-300 shadow-md rounded-md p-7">
            {/* Share to WhatsApp */}
            <div
              className="mb-2 cursor-pointer flex items-center space-x-2"
             
            >
              <img src={share} alt="WhatsApp" className="h-4 w-4" />
              <p className="text-gray-700">Share It</p>
            </div>
            <div
              className="mb-2 cursor-pointer flex items-center space-x-2"
              onClick={() => handleSharingOptionClick("WhatsApp")}
            >
              <img src={whatsapp} alt="WhatsApp" className="h-6 w-6" />
              <p className="text-gray-700"> WhatsApp</p>
            </div>

            {/* Share to Facebook */}
            <div
              className="mb-2 cursor-pointer flex items-center space-x-2"
              onClick={() => handleSharingOptionClick("Facebook")}
            >
              <img src={facebook} alt="Facebook" className="h-6 w-6" />
              <p className="text-gray-700">Facebook</p>
            </div>
            <div
              className="mb-2 cursor-pointer flex items-center space-x-2"
              onClick={() => handleSharingOptionClick("Twitter")}
            >
              <img src={twitter} alt="WhatsApp" className="h-6 w-6" />
              <p className="text-gray-700"> Twitter</p>
            </div>
            <div
              className="mb-2 cursor-pointer flex items-center space-x-2"
              onClick={() => handleSharingOptionClick("Email")}
            >
              <img src={email} alt="WhatsApp" className="h-6 w-6" />
              <p className="text-gray-700"> Email</p>
            </div>

            {/* Add more sharing options here... */}
          </div>
        )}
      </div>
  <div onClick={copyToClipboard} className="px-5 cursor-pointer hover:bg-green-900 bg-green-800 flex rounded items-center justify-center" title="Copy to clipboard">
    <img src={copy} alt="redirect-arrow" className="h-4 w-4 mx-2" /> Copy
  </div>
  {showCopiedPopover && (
          <div className="absolute right-0 bottom-12 mt-2 bg-green-400 border border-gray-300 shadow-md rounded-md p-3">
            <p className="text-gray-800">Copied to clipboard!</p>
          </div>
        )}
</div>
<div className="flex item-center my-5 justify-center">
  <button className="p-2 rounded-full text-white font-medium w-72 bg-blue-700"
   onClick={() => {
    setLongUrl("");       // Reset the long URL input
    setAlias("");         // Reset the alias input
    setFormSubmitted(false); // Reset formSubmitted to initial value
    setShortUrl("");      // Reset the short URL
    setqrUrl("");         // Reset the qrUrl
    setQRCodeDataUrl(""); // Reset the QR code data URL
    setShowQRModal(false); // Close the QR modal
  }}>Shorten Another One</button>
  </div>
</div>


</div>
      )}
      
        </div>
      </section>
    </div>
  );
}

export default Url;
