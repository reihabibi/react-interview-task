import React from "react";
import { render, screen } from "@testing-library/react";
import Statistic from "./../Statistic";

describe("Statistic", () => {
  it("renders with provided props", () => {
    const number = 10;
    const label = "Test Label";
    const color = "#ff0000";
    render(<Statistic number={number} label={label} color={color} />);

    // Check if the element with the provided number and label is rendered
    const renderedElement = screen.getByText(`${number} ${label}`);
    expect(renderedElement).toBeInTheDocument();

    // Check if the style properties are applied correctly
    const styleProps = renderedElement.style;
    expect(rgbToHex(styleProps.backgroundColor)).toBe(color);
    expect(styleProps.fontSize).toBe("30px");
    expect(styleProps.fontWeight).toBe("600");
    expect(styleProps.padding).toBe("32px");
    expect(styleProps.textAlign).toBe("center");
    expect(styleProps.color).toBe("rgb(255, 255, 255)");
    expect(styleProps.borderRadius).toBe("10px");
  });
});

// Function to convert RGB string to hexadecimal string
function rgbToHex(rgbString) {
  // Match RGB values using regex
  const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  // Convert each RGB value to hexadecimal and concatenate them
  return "#" + 
    ("0" + parseInt(match[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(match[2], 10).toString(16)).slice(-2) +
    ("0" + parseInt(match[3], 10).toString(16)).slice(-2);
}
