import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
    const user = useContext(UserContext);
    console.debug("Homepage", "currentUser=", user);

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">nnTest</h1>
                <p className="lead">nnTest is a way to test out LSTM structures on forecasting tasks.</p>
                {user && user.currentUser
                    ? <h2>
                        Welcome Back, {user.currentUser.firstName || user.currentUser.username}!
                    </h2>
                    : (
                        <p>
                            <Link className="btn btn-primary font-weight-bold mr-3"
                                to="/login">
                                Log in
                            </Link>
                            <Link className="btn btn-primary font-weight-bold"
                                to="/signup">
                                Sign up
                            </Link>
                        </p>
                    )}
            </div>
        </div>
    );
}

export default Homepage;
