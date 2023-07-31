import { screen } from "@testing-library/react";
import { it } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "@/utils/mocks";
import OtpVerification from "..";


beforeEach(() => {
    // Arrange
    renderWithRouter( <OtpVerification onCodeFilled={()=>{}}/>)
  });

it.concurrent("renders the otp values when a user posts", async () => {
  // Arrange
  const otp1 = screen.getByRole("textbox", { name: "otp input 1" });
  const otp3 = screen.getByRole("textbox", { name: "otp input 3" });
  const otp4 = screen.getByRole("textbox", { name: "otp input 4" });
  
  userEvent.type(otp1, "1234");

  // assert
  expect(otp1).toHaveValue("1");
  expect(otp3).toHaveValue("3");
  expect(otp4).toHaveValue("4");
 
});
