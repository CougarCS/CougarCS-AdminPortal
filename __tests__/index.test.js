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
describe("Test Index", () => {
  it("Checks if there exist one Admin Portal text", () => {
    const {getByTest } = render(<Home />);

    const Dashboard = screen.getAllByText('Admin Portal');

    expect(Dashboard[0]).toBeInTheDocument();
  });
});
