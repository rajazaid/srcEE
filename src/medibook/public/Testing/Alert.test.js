import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './YourComponents';

describe('AlertDialog', () => {
  it('renders without crashing', () => {
    render(<AlertDialog />);
  });

  it('opens the dialog when trigger is clicked and closes when cancel is clicked', () => {
    const { getByText, getByRole, queryByRole } = render(
      <>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialog>
          <AlertDialogContent>
            <AlertDialogHeader>Dialog Header</AlertDialogHeader>
            <AlertDialogDescription>Dialog Description</AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction>Action</AlertDialogAction>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );

    // Find the trigger element and click it
    const triggerButton = getByText('Open Dialog');
    fireEvent.click(triggerButton);

    // Assert that the dialog is rendered
    const dialog = getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Find the cancel button and click it
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    // Assert that the dialog is closed
    expect(queryByRole('dialog')).toBeNull();
  });

  it('renders custom dialog title and description', () => {
    const { getByText } = render(
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>Custom Title</AlertDialogHeader>
          <AlertDialogDescription>Custom Description</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    );

    expect(getByText('Custom Title')).toBeInTheDocument();
    expect(getByText('Custom Description')).toBeInTheDocument();
  });

  // Add more test cases as needed to cover edge cases and additional functionality
});
