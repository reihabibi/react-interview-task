// src/components/InfoText.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InfoText from './../InfoText';

describe('InfoText', () => {
  it('renders info type correctly', () => {
    render(<InfoText text="Information message" type="info" />);

    // Check if the info icon is displayed
    expect(screen.getByTestId('InfoCircleFilled')).toBeInTheDocument();

    // Check if the text is rendered correctly
    expect(screen.getByText('Information message')).toBeInTheDocument();
  });

  it('renders warning type correctly', () => {
    render(<InfoText text="Warning message" type="warning" />);

    // Check if the warning icon is displayed
    expect(screen.getByTestId('ExclamationCircleFilled')).toBeInTheDocument();

    // Check if the text is rendered correctly
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  it('renders error type correctly', () => {
    render(<InfoText text="Error message" type="error" />);

    // Check if the error icon is displayed
    expect(screen.getByTestId('CloseCircleFilled')).toBeInTheDocument();

    // Check if the text is rendered correctly
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders default info type when type is not provided', () => {
    render(<InfoText text="Default info message" />);

    // Check if the info icon is displayed
    expect(screen.getByTestId('InfoCircleFilled')).toBeInTheDocument();

    // Check if the text is rendered correctly
    expect(screen.getByText('Default info message')).toBeInTheDocument();
  });
});
