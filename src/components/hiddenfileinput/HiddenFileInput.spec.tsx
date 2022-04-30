import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { HiddenFileInput } from "./HiddenFileInput"

describe('HiddenFileInput', () => { 
  it("wraps default file input", async () => {
    const ref = {current: null as null | HTMLInputElement}
    const spy = jest.fn();
    const {container} = render(<HiddenFileInput accept="image/*" inputRef={ref} onChange={spy} data-test-id="upload"/>)

    const input = container.firstChild as HTMLInputElement

    expect(input?.accept).toBe("image/*")
    expect(spy).not.toHaveBeenCalled();
    await userEvent.upload(input, new File(['test'], 'test.png', { type: 'image/png' }))
    expect(spy).toHaveBeenCalledTimes(1);
  })
 })