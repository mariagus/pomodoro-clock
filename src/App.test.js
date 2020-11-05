import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders work text", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/work/i);
  expect(linkElement).toBeInTheDocument();
});
