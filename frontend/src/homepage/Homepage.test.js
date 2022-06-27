// tests based on Jobly App (Springboard)

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Homepage from "./Homepage";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(<Homepage />);
});

it("matches snapshot when logged in", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <UserProvider>
            <Homepage />
          </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <UserProvider currentUser={null}>
            <Homepage />
          </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  