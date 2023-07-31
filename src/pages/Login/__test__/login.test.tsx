import { renderWithRouter } from "@/utils/mocks";
import { render, screen } from "@testing-library/react";
import { it } from "vitest";
import Login from "..";
import userEvent from "@testing-library/user-event";

// The two tests marked with concurrent will be run in parallel

beforeEach(() => {
  // Arrange
  renderWithRouter(<Login />);
});

it("renders an error for incorrect form", async () => {
  // Arrannge
  const email = screen.getByLabelText(/email address/i);
  const password = screen.getByLabelText(/password/i);

  const submitBtn = screen.getByText(/login/i);

  // assert
  expect(email).toHaveValue("");
  expect(password).toHaveValue("");

  await userEvent.click(submitBtn);
  const errorValues = screen.getAllByLabelText(/error message/i);

  expect(errorValues).toBeTruthy();
});

it("renders nothing for correct form values", async () => {
  // Arrannge
  const email = screen.getByLabelText(/email address/i);
  const password = screen.getByLabelText(/password/i);

  const submitBtn = screen.getByText(/login/i);

  await userEvent.type(email, "test@mail.com");
  await userEvent.type(password, "password");
  // assert
  expect(email).toHaveValue("test@mail.com");
  expect(password).toHaveValue("password");

  await userEvent.click(submitBtn);
  const errorValues = screen.queryByLabelText(/error message/i);

  expect(errorValues).not.toBeInTheDocument();
});
