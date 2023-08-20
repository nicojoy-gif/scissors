import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

interface Url {
  _id: string;
  longUrl: string;
  shortUrl: string;
  urlCode: string;
  alias: string;
  clicks: number;
  date: Date;
  // Add other URL properties as needed
}

function Shortened() {
  const [userUrls, setUserUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  function getSessionIdentifier() {
    // Retrieve the session identifier from local storage
    const sessionIdentifier = localStorage.getItem("session_id");
    return sessionIdentifier || "YOUR_DEFAULT_SESSION_IDENTIFIER";
  }

  useEffect(() => {
    // Generate or retrieve the session identifier from cookies or local storage
    const sessionIdentifier = getSessionIdentifier(); // Implement getSessionIdentifier() as needed
    console.log(sessionIdentifier);

    // Fetch the first 5 URLs associated with the session identifier
    const fetchUserUrls = async () => {
      try {
        const response = await axios.get(`https://scissors-avus.onrender.com/api/url/byuser/${sessionIdentifier}`);
        setUserUrls(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user URLs:", error);
      }
    };

    fetchUserUrls();
  }, []);

  const handleShowMore = () => {
    setShowMore(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-t from-white to-pink-50 h-screen">
      <section>
        <Nav />
      </section>
      <h1 className="py-5 text-3xl text-center font-bold">Your Recent Shortened URLs</h1>
      <ul className="flex flex-col items-center">
        {userUrls.slice(0, showMore ? userUrls.length : 5).map((url) => (
          <div className="border my-3 border-blue-200 shadow-lg rounded w-4/6" key={url._id}>
          <li className="p-3">
            <p className="my-2 font-bold text-xl">Long URL:</p>
            <Link
              to={url.longUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 text-blue-700 text-ellipsis flex flex-wrap overflow-hidden"
              style={{ whiteSpace: "pre-wrap" }} // Add this style to allow line breaks and wrap the text
            >
              {url.longUrl}
            </Link>
            <p className="font-bold text-xl my-2">
              Short URL: <span className="text-md font-medium"> <Link to={url.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 text-blue-700 text-ellipsis overflow-hidden"
              >{url.shortUrl} </Link></span>
            </p>
            {/* Display other URL properties as needed */}
          </li>
        </div>
        
        ))}
      </ul>
      {!showMore && userUrls.length > 5 && (
        <button
          className="py-2 px-4 m-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          onClick={handleShowMore}
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default Shortened;
