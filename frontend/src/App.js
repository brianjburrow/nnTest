import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes/Navigation";
import Router from "./routes/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import NeuralNetworkApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
import './App.css';

// set key name for storing token in localStorage for 'remember-me' re-logins

/** nnTest
 * 
 * -infoLoaded: has user data been pulled from API
 * 
 * currentUser: user object from API.  This becomes the way to tell if someone
 * is logged in.  This is passed around via context throughout.
 * 
 * Token : for logged in users, this is their JWT for authentication.
 * This is required to be set for most API calls.  This is initially read
 * from localStorage, and synced to there via useLocalStorage hook.
 */
export const TOKEN_STORAGE_ID = "nntest-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );


  // on initial load, pull user info from API.  Until a user is logged in
  // and they have a token, this shouldn't run.  
  // it only needs to rerun when a user logs out
  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);
    async function getCurrentUser() {
      if (token) {
        // current user is logged in
        try {
          let { username } = jwt.decode(token);
          NeuralNetworkApi.token = token;
          let currentUser = await NeuralNetworkApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          // get the list of jobs they have applied for
        } catch (err) {
          console.error("App loadUserInfo: did not load correctly", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs
    // once data is fetched, this wil be set back to true
    setInfoLoaded(false);
    console.log("GCU", getCurrentUser)
    getCurrentUser();
  }, [token]);

  // handle logouts
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  // handle signup
  // auto log in

  async function signup(signupData) {
    try {
      let token = await NeuralNetworkApi.signup(signupData);
      setToken(token);
      return { sucess: true };
    } catch (err) {
      console.error("signup failed", err);
      return { success: false, errors: err };
    }
  }

  // handle login
  async function login(loginData) {
    try {
      let token = await NeuralNetworkApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (err) {
      return { success: false, errors: err };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Navigation logout={logout} />
          <Router login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
