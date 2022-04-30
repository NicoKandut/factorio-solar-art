import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { Checkbox } from "./Checkbox"

describe('Checkbox', () => { 
  it("renders children", () => {
    render(<Checkbox value={false} setValue={() => {}} title="A title"><span>TEST</span></Checkbox>)
    expect(screen.getByText("TEST")).toBeDefined();
  })

  it("triggers onclick on click", async () => {
    const spy = jest.fn();
    render(<Checkbox value={false} setValue={spy} title="A title"><span>TEST</span></Checkbox>)
    expect(spy).toHaveBeenCalledTimes(0);
    await userEvent.click(screen.getByText("TEST"));
    expect(spy).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByText("TEST"));
    expect(spy).toHaveBeenCalledTimes(2);
  })
 })