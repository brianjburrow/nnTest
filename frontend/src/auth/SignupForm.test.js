import React from "react";
import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";
import { MemoryRouter } from "react-router";

// tests based on Jobly App (Springboard)
it("renders without crashing", function () {
    render(<SignupForm />);
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <SignupForm />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
