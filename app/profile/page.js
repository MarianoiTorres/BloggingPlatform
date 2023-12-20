'use client'
import React, { useEffect, useState } from "react";
import { Hub } from "aws-amplify/utils";

import { signInWithRedirect, signOut, getCurrentUser, AuthUser } from "aws-amplify/auth";
import '../../src/configureAmplify'

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {

    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          getUser();
          break;
        case "signInWithRedirect_failure":
          setError("An error has ocurred during the OAuth flow.");
          break;
        case "customOAuthState":
          console.log(payload.data);
          setCustomState(payload.data);
          break;
      }
    });

    getUser();

    return unsubscribe;
  }, []);

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      console.log(currentUser);
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }

  };


  return (
    <div className="container mx-auto mt-6 w-1/2">
      <h1 className="text-3xl font-semibold tracking-wide mb-2 text-center">Profile</h1>
      {user === null && (
        <div className="flex items-center justify-center mt-20 ">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-800"
            onClick={() => signInWithRedirect({ provider: "Facebook", customState: "shopping-cart" })}
          >
            Signup with Facebook
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800"
            onClick={() => signInWithRedirect({ provider: "Google", customState: "shopping-cart" })}
          >
            Signup with Google
          </button>
        </div>
      )}
      {
        user !== null && <div className="text-center">
          <p><b className="text-blue-500">Username: </b>{user?.username}</p>
          <p><b className="text-blue-500">UserId: </b>{user?.userId}</p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      }
    </div>
  );
}

export default Profile