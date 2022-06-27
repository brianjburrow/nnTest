// tests based on Jobly App (Springboard)
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NeuralNetworkList from "./neuralNetworkList";
import { UserProvider } from "../testUtils";


it("renders without crashing", function () {
    render(<NeuralNetworkList/>);
});

it("matches snapshot when logged in", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <UserProvider>
            <NeuralNetworkList/>
          </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <UserProvider currentUser={null}>
            <NeuralNetworkList/>
          </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  