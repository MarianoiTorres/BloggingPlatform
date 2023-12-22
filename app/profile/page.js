'use client'
import React, { useEffect, useState } from "react";
import { Hub } from "aws-amplify/utils";

import { signInWithRedirect, signOut, getCurrentUser, AuthUser, fetchUserAttributes  } from "aws-amplify/auth";
import '../../src/configureAmplify'
import { useDispatch, useSelector } from "react-redux";
import { getUserAsync } from "@/redux/features/userSlice";

const Profile = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null);
  const [customState, setCustomState] = useState(null);

  const userData = useSelector(state => state.userReducer.user)

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
          setCustomState(payload.data);
          break;
      }
    });

    getUser();

    return unsubscribe;
  }, []);

  const getUser = async () => {
    try {
      dispatch(getUserAsync())
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }

  };


  return (
    <div className="container mx-auto mt-6 w-1/2">
      <h1 className="text-3xl font-semibold tracking-wide mb-2 text-center">Profile</h1>
      {
      userData?.username  === undefined && (
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
        userData?.username !== undefined && <div className="text-center">
          <p><b className="text-blue-500">Email: </b>{userData?.email}</p>
          <p><b className="text-blue-500">Username: </b>{userData?.username}</p>
          <p><b className="text-blue-500">UserId: </b>{userData?.userId}</p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      }
    </div>
  );
}

export default Profile