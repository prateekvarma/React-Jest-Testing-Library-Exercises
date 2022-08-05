import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('button has correct initial values', () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  expect(colorButton).toHaveStyle({backgroundColor: "red"});
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
})
