import reducer, { initialState } from "./auth";
import { authSuccess } from "../actions/auth";

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should store token upon login", () => {
    expect(
      reducer(initialState, authSuccess("test-token", "test-user-id"))
    ).toEqual({
      ...initialState,
      token: "test-token",
      userId: "test-user-id",
      error: false,
      error: false
    });
  });
});
