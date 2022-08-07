import { fireEvent, render, screen } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("button has correct initial values", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });

  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("button turns blue when clicked, and button text changes to red", () => {
  render(<App />);
  //check if button exists
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });

  //click the button
  fireEvent.click(colorButton);

  //expect the color to change to blue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  //after the color has changed, expect the text to be "Change to red"
  expect(colorButton.textContent).toBe("Change to Medium Violet Red");
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
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(checkbox);

  expect(colorButton).toBeDisabled();

  //Click on the checked chedkbox, and check if the button is enabled again
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();

});

test("When checkbox is checked, the disabled button turns gray" , () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  // Click on the button, it's red color should change to blue
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  //Click on the checkbox, the button color should go gray and be disabled
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  //Click on the button, the color should remain gray and stay disabled
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  //Click on the checkbox, and now the button should be blue
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("Take color as input strings, and add a space before each camel cased letter" , () => {
  test("works for no inner capital letter", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});