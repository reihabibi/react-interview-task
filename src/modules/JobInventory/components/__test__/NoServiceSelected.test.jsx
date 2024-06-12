import React from 'react';
import { render } from '@testing-library/react';
import NoServiceSelected from '../NoServiceSelected';

describe('NoServiceSelected component', () => {
  it('renders correctly', () => {
    const { getByAltText, getByText } = render(<NoServiceSelected />);
    
    // Check if the image is rendered with correct alt text
    const image = getByAltText('No Service Selected Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/NoServiceSelected.png');

    // Check if the text elements are rendered correctly
    expect(getByText('No Service Selected')).toBeInTheDocument();
    expect(getByText('Please select a service on your left to proceed.')).toBeInTheDocument();
  });

});
