import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
const pushMock = jest.fn()
useRouter.mockReturnValue({
  query: {},
  push: pushMock,
});
// What do we expect from Index?
describe("Test Index", () => {
  it("Checks if there exist one Admin Portal text", () => {
    const {getByTest } = render(<Home />);

    const Dashboard = screen.getAllByText('Admin Portal');

    expect(Dashboard[0]).toBeInTheDocument();
  });
  it("Check if there is a logout botton", () => {
    const { getByText } = render(<Home />);
    const logout = screen.getByText('Logout');
    expect(logout).toBeInTheDocument();
  
  });    
});
