import React from 'react';
import { render } from '@testing-library/react';
import { Label } from './Dialog.test'; 

describe('Label component', () => {
  test('renders label with default props', () => {
    const { container } = render(<Label />);
    const labelElement = container.firstChild;
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('text-sm font-medium leading-none');
  });

  test('renders label with additional className', () => {
    const { container } = render(<Label className="custom-class" />);
    const labelElement = container.firstChild;
    expect(labelElement).toHaveClass('custom-class');
  });

  test('renders label with disabled style', () => {
    const { container } = render(<Label disabled />);
    const labelElement = container.firstChild;
    expect(labelElement).toHaveClass('peer-disabled:cursor-not-allowed peer-disabled:opacity-70');
  });


});
