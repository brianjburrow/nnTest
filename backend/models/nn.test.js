"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");


const { SECRET_KEY } = require("../config");
const testJwt = jwt.sign({ username: "test"}, SECRET_KEY);
const badJwt = jwt.sign({ username: "test" }, "wrong");


it("is a fake test", function(){
    expect(true).toEqual(true)
})