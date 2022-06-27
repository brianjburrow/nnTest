// tests based on Jobly App (Springboard)
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NeuralNetworkCard from "./neuralNetworkCard";
import { UserProvider } from "../testUtils";

let TEST_LAYER = [
    { type: "lstm", params: { units: 25, activation: 'relu', inputShape: `3` } },
    { type: "dense", params: { units: 1 } }
]

it("renders without crashing", function () {
    render(<NeuralNetworkCard layerList = {TEST_LAYER}/>);
});

it("matches snapshot when logged in", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <UserProvider>
            <NeuralNetworkCard layerList = {TEST_LAYER}/>
          </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <UserProvider currentUser={null}>
            <NeuralNetworkCard layerList = {TEST_LAYER}/>
          </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  