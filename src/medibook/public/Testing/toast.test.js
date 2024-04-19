import React from 'react';
import { render } from '@testing-library/react';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from './YourComponentFileName';

describe('ToastProvider component', () => {
  test('renders ToastProvider with default props', () => {
    const { container } = render(<ToastProvider />);
    const toastProviderElement = container.firstChild;
    expect(toastProviderElement).toBeInTheDocument();
  });
});

describe('ToastViewport component', () => {
  test('renders ToastViewport with default props', () => {
    const { container } = render(<ToastViewport />);
    const toastViewportElement = container.firstChild;
    expect(toastViewportElement).toBeInTheDocument();
  });
});

describe('Toast component', () => {
  test('renders Toast with default props', () => {
    const { container } = render(<Toast />);
    const toastElement = container.firstChild;
    expect(toastElement).toBeInTheDocument();
  });
});

describe('ToastTitle component', () => {
  test('renders ToastTitle with default props', () => {
    const { container } = render(<ToastTitle />);
    const toastTitleElement = container.firstChild;
    expect(toastTitleElement).toBeInTheDocument();
  });
});

describe('ToastDescription component', () => {
  test('renders ToastDescription with default props', () => {
    const { container } = render(<ToastDescription />);
    const toastDescriptionElement = container.firstChild;
    expect(toastDescriptionElement).toBeInTheDocument();
  });
});

describe('ToastClose component', () => {
  test('renders ToastClose with default props', () => {
    const { container } = render(<ToastClose />);
    const toastCloseElement = container.firstChild;
    expect(toastCloseElement).toBeInTheDocument();
  });
});

describe('ToastAction component', () => {
  test('renders ToastAction with default props', () => {
    const { container } = render(<ToastAction />);
    const toastActionElement = container.firstChild;
    expect(toastActionElement).toBeInTheDocument();
  });
});
