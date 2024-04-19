import React from 'react';
import { render } from '@testing-library/react';
import { Popover, PopoverTrigger, PopoverContent } from './YourComponentFileName'; // Replace 'YourComponentFileName' with the actual filename

describe('Popover component', () => {
  test('renders Popover with default props', () => {
    const { container } = render(
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    const popoverElement = container.firstChild;
    expect(popoverElement).toBeInTheDocument();
  });

  test('renders Popover with additional classNames', () => {
    const { container } = render(
      <Popover className="custom-popover">
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent className="custom-content">Content</PopoverContent>
      </Popover>
    );
    const popoverElement = container.firstChild;
    expect(popoverElement).toHaveClass('custom-popover');
    const contentElement = container.querySelector('.custom-content');
    expect(contentElement).toBeInTheDocument();
  });

});
