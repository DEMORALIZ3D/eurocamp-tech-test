import { render, screen, waitFor } from "@testing-library/react";
import ParcById from "../ParcById";
import axios from "axios";
import "@testing-library/jest-dom";
import { setupStore } from "../../store";
import { Provider } from "react-redux";
import { parcIntitialState } from "../../store/Parcs";
import { act } from "react-dom/test-utils";

//mock axios to allow us to mock the API call
jest.mock("axios");
const mockedAxios = axios;

//mock react-router-dom to ensure we get the id from the param. We dont need to test the param in the URL as that is a feature of react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1",
  }),
}));

describe("ParcById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    (mockedAxios as jest.Mocked<typeof axios>).get.mockResolvedValue(
      Promise.resolve({
        data: {
          id: 1,
          name: "test",
          description: "test",
        },
      })
    );

    act(() => {
      render(
        <Provider store={setupStore({ parcs: parcIntitialState })}>
          <ParcById />
        </Provider>
      );
    });

    expect(screen.getByText("Loading...")).toBeVisible();

    waitFor(() => {
      expect(screen.getByText("test", { selector: "h1" })).toBeInTheDocument();
    });
  });
});
