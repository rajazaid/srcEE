import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './label.test'; 

describe('Select component', () => {
  test('renders Select with default props', () => {
    const { container } = render(
      <Select>
        <SelectTrigger>
          <SelectValue>Select an item</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem>Item 1</SelectItem>
          <SelectItem>Item 2</SelectItem>
        </SelectContent>
      </Select>
    );
    const selectElement = container.firstChild;
    expect(selectElement).toBeInTheDocument();
  });

  test('renders Select with custom label', () => {
    const { getByText } = render(
      <Select>
        <SelectTrigger>
          <SelectValue>Select an item</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>Custom Label</SelectLabel>
          <SelectItem>Item 1</SelectItem>
          <SelectItem>Item 2</SelectItem>
        </SelectContent>
      </Select>
    );
    const labelElement = getByText('Custom Label');
    expect(labelElement).toBeInTheDocument();
  });

  // Add more tests as needed
});

describe('SelectItem component', () => {
  test('renders SelectItem with default props', () => {
    const { container } = render(<SelectItem>Item</SelectItem>);
    const itemElement = container.firstChild;
    expect(itemElement).toBeInTheDocument();
  });

});


