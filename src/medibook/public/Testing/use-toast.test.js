

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from './toast.test'; 

describe('Toast component', () => {
  test('renders a toast notification', () => {
    const TestComponent = () => {
      const { toast } = useToast();

      const showToast = () => {
        toast({
          title: 'Test Toast',
          description: 'This is a test toast notification.',
        });
      };

      return (
        <div>
          <button onClick={showToast}>Show Toast</button>
        </div>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    userEvent.click(screen.getByRole('button', { name: /Show Toast/i }));

    expect(screen.getByText('Test Toast')).toBeInTheDocument();
    expect(screen.getByText('This is a test toast notification.')).toBeInTheDocument();
  });
});


