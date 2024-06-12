import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './../Header';
import { useJobs } from '../../context/jobSites';

jest.mock('../../context/jobSites', () => ({
  useJobs: jest.fn(),
}));

describe('Header', () => {
  const mockOpenModal = jest.fn();
  const mockGetJobs = jest.fn();
  const mockSearchJobsByName = jest.fn();

  beforeEach(() => {
    useJobs.mockReturnValue({
      getJobs: mockGetJobs,
      searchJobsByName: mockSearchJobsByName,
    });
  });

  it('renders correctly', () => {
    render(<Header openModal={mockOpenModal} />);

    expect(screen.getByText("Informative piece of text that can be used regarding this modal.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search a driver")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create new/i })).toBeInTheDocument();
  });

  it('calls openModal when "Create New" button is clicked', () => {
    render(<Header openModal={mockOpenModal} />);

    fireEvent.click(screen.getByRole("button", { name: /create new/i }));

    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });

  it('updates searchValue and calls searchJobsByName when input value changes', () => {
    render(<Header openModal={mockOpenModal} />);

    const searchInput = screen.getByPlaceholderText("Search a driver");

    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(searchInput.value).toBe('test');
    expect(mockSearchJobsByName).toHaveBeenCalledWith('test');
  });
});
