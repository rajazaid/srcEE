import React from 'react';
import { render } from '@testing-library/react';
import { ScrollArea, ScrollBar } from './YourComponentFileName'; // Replace 'YourComponentFileName' with the actual filename

describe('ScrollArea component', () => {
  test('renders ScrollArea with default props', () => {
    const { container } = render(
      <ScrollArea>
        <div style={{ height: '200px', width: '200px' }}>Content</div>
      </ScrollArea>
    );
    const scrollAreaElement = container.firstChild;
    expect(scrollAreaElement).toBeInTheDocument();
  });

  test('renders ScrollArea with additional classNames', () => {
    const { container } = render(
      <ScrollArea className="custom-scroll-area">
        <div style={{ height: '200px', width: '200px' }}>Content</div>
      </ScrollArea>
    );
    const scrollAreaElement = container.firstChild;
    expect(scrollAreaElement).toHaveClass('custom-scroll-area');
  });

  // Add more tests as needed
});

describe('ScrollBar component', () => {
  test('renders ScrollBar with default props', () => {
    const { container } = render(<ScrollBar />);
    const scrollBarElement = container.firstChild;
    expect(scrollBarElement).toBeInTheDocument();
  });

  test('renders ScrollBar with additional classNames', () => {
    const { container } = render(<ScrollBar className="custom-scroll-bar" />);
    const scrollBarElement = container.firstChild;
    expect(scrollBarElement).toHaveClass('custom-scroll-bar');
  });


});
