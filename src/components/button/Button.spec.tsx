import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { Button } from "./Button"

describe('Button', () => { 
  it("renders children", () => {
    render(<Button onClick={() => {}} title="A title"><span>TEST</span></Button>)
    expect(screen.getByText("TEST")).toBeDefined();
  })

  it("triggers onclick on click", async () => {
    const spy = jest.fn();
    render(<Button onClick={spy} title="A title"><span>TEST</span></Button>)
    expect(spy).toHaveBeenCalledTimes(0);
    await userEvent.click(screen.getByText("TEST"));
    expect(spy).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByText("TEST"));
    expect(spy).toHaveBeenCalledTimes(2);
  })
 })