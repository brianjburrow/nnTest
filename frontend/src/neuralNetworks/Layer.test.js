// tests based on Jobly App (Springboard)

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Layer from "./Layer";
import { UserProvider } from "../testUtils";

let TEST_LAYER = {
    type:'lstm', 
    params:{units:25, inputShape:'3'}, 
    layerIndex:1, 
    insertLayer:()=>{console.log('l')}, 
    deleteLayer:()=>{console.log('d')},
}

it("renders without crashing", function () {
    render(<Layer/>);
});

it("matches snapshot when logged in", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <UserProvider>
            <Layer />
          </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <UserProvider currentUser={null}>
            <Layer />
          </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  