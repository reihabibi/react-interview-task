Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
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
  import { render, fireEvent, screen } from '@testing-library/react';
  import DataGrid from '../DataGrid';
  
  // Mocking the useJobInventory hook
  jest.mock("../../context/jobInentoryContext", () => ({
    useJobInventory: jest.fn(() => ({
      activeJobInventory: [
        {
          id: '1',
          item: 'G5524',
          quantity: 10,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
      ]
    }))
  }));
  
  describe('DataGrid Component', () => {
    test('renders table with data', () => {
      const { getAllByText } = render(<DataGrid />);
      expect(getAllByText('G5524')).toHaveLength(1);
      expect(getAllByText('10')).toHaveLength(1);
      expect(getAllByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toHaveLength(2);
    });
  
    test('opens modal on row click', () => {
      const { getByText, getByTestId } = render(<DataGrid />);
      fireEvent.click(getByText('G5524'));
      expect(getByTestId('inventory-modal')).toBeInTheDocument();
    });
  
  });
  