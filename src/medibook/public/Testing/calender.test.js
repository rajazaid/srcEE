import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Calendar } from './Calendar';

describe('Calendar component', () => {
  test('renders without crashing', () => {
    render(<Calendar />);
    // Add assertions based on your specific requirements
  });

  test('applies custom classNames', () => {
    render(<Calendar classNames={{ customClass: 'custom-class' }} />);
    const calendarElement = screen.getByRole('calendar');
    expect(calendarElement).toHaveClass('custom-class');
  });

  test('navigates through months with dropdown buttons', () => {
    render(<Calendar />);
    fireEvent.click(screen.getByLabelText('Previous month'));
    fireEvent.click(screen.getByLabelText('Next month'));
    // Add assertions based on your specific requirements
  });

  test('selects and deselects days', () => {
    render(<Calendar />);
    fireEvent.click(screen.getByLabelText('Select day'));
    fireEvent.click(screen.getByLabelText('Deselect day'));
    // Add assertions based on your specific requirements
  });

  test('is accessible', async () => {
    const { container } = render(<Calendar />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
