import React from "react";
import toJson from "enzyme-to-json";
import AppFn from "../../App";

describe("Component >>> App", () => {
    let App;

    it("Render App", () => {
        expect(toJson(AppFn)).toMatchSnapshot();
    });
});
