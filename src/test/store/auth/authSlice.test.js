import { authSlice } from "../../../store/auth/AuthSlice";
import { initialState } from "../../fixtures/authFixtures";

describe("test in authSlice ", () => {
  test("should return the initial state and called 'auth'", () => {
    const state = authSlice.reducer(initialState, {});

    expect(authSlice.name).toBe("auth");
    expect(state).toEqual(initialState);
  });
});
