import React from 'react';
import { render } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './YourComponentFileName'; 

describe('Table component', () => {
  test('renders Table with default props', () => {
    const { container } = render(<Table />);
    const tableElement = container.firstChild;
    expect(tableElement).toBeInTheDocument();
  });

});

describe('TableHeader component', () => {
  test('renders TableHeader with default props', () => {
    const { container } = render(<TableHeader />);
    const tableHeaderElement = container.firstChild;
    expect(tableHeaderElement).toBeInTheDocument();
  });

});

describe('TableBody component', () => {
  test('renders TableBody with default props', () => {
    const { container } = render(<TableBody />);
    const tableBodyElement = container.firstChild;
    expect(tableBodyElement).toBeInTheDocument();
  });

});

describe('TableFooter component', () => {
  test('renders TableFooter with default props', () => {
    const { container } = render(<TableFooter />);
    const tableFooterElement = container.firstChild;
    expect(tableFooterElement).toBeInTheDocument();
  });

});

describe('TableRow component', () => {
  test('renders TableRow with default props', () => {
    const { container } = render(<TableRow />);
    const tableRowElement = container.firstChild;
    expect(tableRowElement).toBeInTheDocument();
  });

});

describe('TableHead component', () => {
  test('renders TableHead with default props', () => {
    const { container } = render(<TableHead />);
    const tableHeadElement = container.firstChild;
    expect(tableHeadElement).toBeInTheDocument();
  });

});

describe('TableCell component', () => {
  test('renders TableCell with default props', () => {
    const { container } = render(<TableCell />);
    const tableCellElement = container.firstChild;
    expect(tableCellElement).toBeInTheDocument();
  });

});

describe('TableCaption component', () => {
  test('renders TableCaption with default props', () => {
    const { container } = render(<TableCaption />);
    const tableCaptionElement = container.firstChild;
    expect(tableCaptionElement).toBeInTheDocument();
  });

});
