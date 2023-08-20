import React, { useEffect } from 'react';
import Index from './Components/Routes/Index';
import { v4 as uuidv4 } from "uuid";
import { Firebase } from './Components/Firebase/Firebase';

function App() {
 
    // Check if the session identifier is already set in local storage
    useEffect(() => {
      // Check if the session identifier is already set in local storage
      const existingSessionIdentifier = localStorage.getItem("session_id");
      if (!existingSessionIdentifier) {
        // Generate a unique session identifier
        const sessionIdentifier = uuidv4();
  
        // Set the session identifier in local storage
        localStorage.setItem("session_id", sessionIdentifier);
      }
    }, []);
    useEffect(() => {
      // Log a page view event
      Firebase.analytics().logEvent("page_view", {
        page_title: "Home",
      });
    }, []);
  return (
    <div className="App">
      <header className="App-header">
        
      <Index />
      </header>
    </div>
  );
}

export default App;
