import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("button has correct initial values", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("button turns blue when clicked, and button text changes to red", () => {
  render(<App />);
  //check if button exists
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  //click the button
  fireEvent.click(colorButton);

  //expect the color to change to blue
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  //after the color has changed, expect the text to be "Change to red"
  expect(colorButton.textContent).toBe("Change to red");
});

test("Initial setup: if button starts off enabled, and the checkbox is unchecked" , () => {
  render(<App />);
  
  //check if the button is enabled
  const colorButton = screen.getByRole("button");
  expect(colorButton).toBeEnabled();

  //check if the checkbox is unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked()
});

test("When checkbox is checked, the button should be disabled, and vice-versa", () => {
  render(<App />);

  //Click on the unchecked checkbox, and check if the button is disabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(checkbox);

  expect(colorButton).toBeDisabled();

  //Click on the checked chedkbox, and check if the button is enabled again
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();

});