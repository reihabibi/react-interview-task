Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dashboard from '../Dashboard';
import { useJobs } from '../../context/jobSites';

jest.mock('../../context/jobSites');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Dashboard component', () => {
  it('renders without crashing', async () => {
    useJobs.mockReturnValue({
      jobs: [],
      getJobs: jest.fn(),
      isLoading: false,
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(useJobs).toHaveBeenCalled();
      expect(useJobs().getJobs).toHaveBeenCalled();
    });
  });

  it('displays jobs', async () => {
    const mockJobs = [
      { id: '1', name: 'Job 1', status: 'complete', categories: [] },
      { id: '2', name: 'Job 2', status: 'inProgress', categories: [] },
    ];

    useJobs.mockReturnValue({
      jobs: mockJobs,
      getJobs: jest.fn(),
      isLoading: false,
    });

    const { getByText } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByText('Job 1')).toBeInTheDocument();
      expect(getByText('Job 2')).toBeInTheDocument();
    });
  });

  it('navigates to job inventory page when job name is clicked', async () => {
    const mockJobs = [{ id: '1', name: 'Job 1', status: 'complete', categories: [] }];
    useJobs.mockReturnValue({
      jobs: mockJobs,
      getJobs: jest.fn(),
      isLoading: false,
    });

    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    const { getByText } = render(<Dashboard />);
    const jobNameLink = getByText('Job 1');

    await waitFor(() => {
      expect(jobNameLink).toBeInTheDocument();
      jobNameLink.click();
    });

    expect(navigateMock).toHaveBeenCalledWith('/job-inventory/1');
  });
});
