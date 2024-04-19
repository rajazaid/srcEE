import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './use-client'; // Import your component from the correct path

describe('DropdownMenu component', () => {
  test('renders dropdown menu', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>Content</DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});

describe('DropdownMenuTrigger component', () => {
  test('renders dropdown menu trigger', () => {
    const { getByText } = render(
      <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
    );
    expect(getByText('Trigger')).toBeInTheDocument();
  });
});

describe('DropdownMenuContent component', () => {
  test('renders dropdown menu content', () => {
    const { getByText } = render(
      <DropdownMenuContent>Content</DropdownMenuContent>
    );
    expect(getByText('Content')).toBeInTheDocument();
  });
});

