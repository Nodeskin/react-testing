import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { waitFor } from "@testing-library/react";

jest.mock("axios", ()=>({

  __esModule: true,

  default: {
    get: ()=>({
      data: {id: 1, name: "Nodeskin"}
    })
  }

})

)

test("username input should be rendered", () => {
  render(<Login />);
  const userNameInputEl = screen.getByPlaceholderText(/username/i);
  expect(userNameInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/password/i);
  expect(userInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByTestId(/button/i);
  expect(buttonEl).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login />);
  const buttonEl = screen.getByRole(/button/i);
  expect(buttonEl).toBeDisabled();
});


test("Loading should not be rendered", ()=>{
  render(<Login/>)
  const buttonEl = screen.getByRole("button")
  expect(buttonEl).not.toHaveTextContent(/please wait/i)
})

test("error message should not be visible", () => {
  render(<Login />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const userNameInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(userNameInputEl, { target: { value: testValue } });
  expect(userNameInputEl.value).toBe(testValue);
});

test("password input should change", () =>{
  render (<Login/>)
  const passwordInputEl = screen.getByPlaceholderText('password')
  const testValue = "test"
  fireEvent.change(passwordInputEl, {target: {value: testValue}})
  expect(passwordInputEl.value).toBe(testValue)
})

test("button should not be disabled when input exist", () => {
  render(<Login />);
  const buttonEl = screen.getByRole(/button/i);
  const userNameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test'

  fireEvent.change(userNameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(buttonEl).not.toBeDisabled();

});

test("Loading should be rendered when clicked", ()=>{
  render(<Login/>)
  const buttonEl = screen.getByRole("button")
  const userNameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test'

  fireEvent.change(userNameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  expect(buttonEl).toHaveTextContent(/please wait/i)
})

test("Loading should not be rendered after fetching", async()=>{
  render(<Login/>)
  const buttonEl = screen.getByRole("button")
  const userNameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test'

  fireEvent.change(userNameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  await waitFor(()=> expect(buttonEl).not.toHaveTextContent(/please wait/i)
  );
});


test("user should be rendered after fetching", async()=>{
  render(<Login/>)
  const buttonEl = screen.getByRole("button")
  const userNameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test'

  fireEvent.change(userNameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  const userItem  = await screen.findByText("John")
expect(userItem).toBeInTheDocument(/please wait/i)
});