import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";
import NeuralNetworkList from "../neuralNetworks/neuralNetworkList";

function Router({ signup, login }) {
    return (
        <div className='pt-5'>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>

                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>

                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route>

                <PrivateRoute exact path="/neuralNetworks">
                    <NeuralNetworkList />
                </PrivateRoute>

                <Redirect to="/" />
            </Switch>
        </div >
    )
}

export default Router;