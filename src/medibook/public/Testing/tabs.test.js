import React from 'react';
import { render } from '@testing-library/react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './calender.test'; 

describe('Tabs component', () => {
  test('renders Tabs with default props', () => {
    const { container } = render(<Tabs />);
    const tabsElement = container.firstChild;
    expect(tabsElement).toBeInTheDocument();
  });

});

describe('TabsList component', () => {
  test('renders TabsList with default props', () => {
    const { container } = render(<TabsList />);
    const tabsListElement = container.firstChild;
    expect(tabsListElement).toBeInTheDocument();
  });

});

describe('TabsTrigger component', () => {
  test('renders TabsTrigger with default props', () => {
    const { container } = render(<TabsTrigger />);
    const tabsTriggerElement = container.firstChild;
    expect(tabsTriggerElement).toBeInTheDocument();
  });

});

describe('TabsContent component', () => {
  test('renders TabsContent with default props', () => {
    const { container } = render(<TabsContent />);
    const tabsContentElement = container.firstChild;
    expect(tabsContentElement).toBeInTheDocument();
  });

});
