import React, { useState, useEffect } from "react";
import { getFirestore, collection, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { Firebase, auth } from "../Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Nav from "../Nav/Nav";

function AnalyticsComponent() {
  const [views, setViews] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    // Initialize Firebase Analytics and Firestore
    const analytics = getAnalytics(Firebase);
    const db = getFirestore(Firebase);

    // Function to fetch views and users data
    const fetchAnalyticsData = async () => {
      try {
        // Fetch views data from Firestore
        const viewsCollectionRef = collection(db, "views");
        const viewsDocRef = doc(viewsCollectionRef, "analytics");
        const viewsDoc = await getDoc(viewsDocRef);

        if (viewsDoc.exists()) {
          const viewsData = viewsDoc.data();
          if (viewsData && viewsData.count !== undefined) {
            setViews(viewsData.count);
          } else {
            console.log("Views data exists, but 'count' field is missing or undefined.");
          }
        } else {
          console.log("Views document does not exist in the 'views' collection.");
        }

        // Fetch users data from Firestore
        const usersCollectionRef = collection(db, "users");
        const usersDocRef = doc(usersCollectionRef, "analytics");
        const usersDoc = await getDoc(usersDocRef);

        if (usersDoc.exists()) {
          const usersData = usersDoc.data();
          if (usersData && usersData.count !== undefined) {
            setUsers(usersData.count);
          } else {
            console.log("Users data exists, but 'count' field is missing or undefined.");
          }
        } else {
          console.log("Users document does not exist in the 'users' collection.");
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    // Function to increment the users count
    const incrementUsersCount = async () => {
      try {
        // Update the users count in the Firestore document using the increment function
        const usersDocRef = doc(collection(db, "users"), "analytics");
        await updateDoc(usersDocRef, {
          count: increment(1)
        });
        console.log("Users count incremented successfully.");
      } catch (error) {
        console.error("Error incrementing users count:", error);
      }
    };

    // Function to handle successful login (increment user count)
    const handleSuccessfulLogin = () => {
      // Call the function to increment users count
      incrementUsersCount();
      // You can also add any other logic related to successful login here
    };

    // Call the function to fetch initial analytics data
    fetchAnalyticsData();

    // Subscribe to auth state changes to detect successful logins
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in (successful login)
        handleSuccessfulLogin();
      } else {
        // User is signed out
        // You can handle logout or other scenarios here if needed
      }
    });
  }, []);
  return (
    <div className="bg-gradient-to-t from-white to-pink-50 h-screen">
      <Nav />
      <h2 className="text-3xl text-center font-bold">Analytics Data</h2>
      <p>Views: {views}</p>
      <p>Users: {users}</p>
      {/* You can add your login UI and call handleSuccessfulLogin after a successful login */}
    </div>
  );
}

export default AnalyticsComponent;
