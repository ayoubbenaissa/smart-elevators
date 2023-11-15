import { render, screen } from "@testing-library/react";
import { ActionButton } from "../../components/UI/ActionButton";

import "@testing-library/jest-dom";

describe(`testing "ActionButton" component`, () => {
  it("should runder button with default props", () => {
    render(<ActionButton buttonText="mock button" clickAction={(e) => {console.log(e)}} />);

    const actionButton = screen.getByTestId("action-btn");
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toHaveTextContent("mock button");
    expect(actionButton).toHaveClass('btn', 'primary')
  });
  // buttonType="mock_class"

  it("should runder button with custom props", () => {
    render(<ActionButton buttonText="mock button" buttonType="seconday" className="mock_class" clickAction={(e) => {console.log(e)}} />);

    const actionButton = screen.getByTestId("action-btn");
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toHaveTextContent("mock button");
    expect(actionButton).toHaveClass('btn', 'seconday', 'mock_class');
  });
});
