import React from "react";
import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import BirthdayList from "./BirthdayList";

jest.mock("../context/useBirthdays", () => ({
  useBirthdays: jest.fn(),
}));

import { useBirthdays } from "../context/useBirthdays";

describe("BirthdayList component", () => {
  const mockFetchBirthdays = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useBirthdays as jest.Mock).mockReturnValue({
      birthdays: [],
      loading: true,
      error: "",
      fetchBirthdays: mockFetchBirthdays,
    });

    render(<BirthdayList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error message", () => {
    (useBirthdays as jest.Mock).mockReturnValue({
      birthdays: [],
      loading: false,
      error: "Some error",
      fetchBirthdays: mockFetchBirthdays,
    });

    render(<BirthdayList />);
    expect(screen.getByText(/some error/i)).toBeInTheDocument();
  });

  it("renders birthday items with correct icons", () => {
    (useBirthdays as jest.Mock).mockReturnValue({
      birthdays: [
        { year: "1990", text: "John Doe" },
        { year: "1985", text: "Jane Smith" },
      ],
      loading: false,
      error: "",
      fetchBirthdays: mockFetchBirthdays,
    });

    render(<BirthdayList />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toContain("1990: John Doe");
  });

  it("calls fetchBirthdays on button click", () => {
    (useBirthdays as jest.Mock).mockReturnValue({
      birthdays: [],
      loading: false,
      error: "",
      fetchBirthdays: mockFetchBirthdays,
    });

    render(<BirthdayList />);
    fireEvent.click(screen.getByRole("button", { name: /load/i }));
    expect(mockFetchBirthdays).toHaveBeenCalled();
  });
});
