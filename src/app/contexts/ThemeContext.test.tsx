import React from 'react';
import { render, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext'; // Assuming Theme is exported or use string

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    length: 0, // Added length property
    key: jest.fn((index: number) => null) // Added key method
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true // Important for Jest to be able to override
});

// Mock document.head.appendChild and document.getElementById for link element manipulation
// to avoid errors related to DOM manipulation in a non-browser environment.
let mockLinkElement: HTMLLinkElement | null = null;

beforeAll(() => {
  document.getElementById = jest.fn((id: string) => {
    if (id === 'theme-stylesheet') {
      return mockLinkElement;
    }
    return null;
  });

  const originalCreateElement = document.createElement;
  document.createElement = jest.fn((tagName: string): HTMLElement => {
    if (tagName === 'link') {
      mockLinkElement = {
        id: '',
        rel: '',
        href: '',
        remove: jest.fn(() => { mockLinkElement = null; })
      } as any;
      return mockLinkElement as unknown as HTMLElement;
    }
    // Fallback for other elements, though not expected in these tests
    return originalCreateElement.call(document, tagName);
  });

  document.head.appendChild = jest.fn();
});


describe('ThemeProvider with localStorage', () => {
  beforeEach(() => {
    // Clear mocks and storage before each test
    localStorageMock.clear();
    (localStorageMock.getItem as jest.Mock).mockClear();
    (localStorageMock.setItem as jest.Mock).mockClear();

    mockLinkElement = null;
    (document.getElementById as jest.Mock).mockClear().mockImplementation((id: string) => {
        if (id === 'theme-stylesheet') return mockLinkElement;
        return null;
    });
    (document.createElement as jest.Mock).mockClear().mockImplementation((tagName: string): HTMLElement => {
        if (tagName === 'link') {
            mockLinkElement = { id: '', rel: '', href: '', remove: jest.fn(() => { mockLinkElement = null; }) } as any;
            return mockLinkElement as unknown as HTMLElement;
        }
        // This path should ideally not be hit if mocks are comprehensive for the component's needs
        return document.createElement(tagName);
    });
    (document.head.appendChild as jest.Mock).mockClear();
  });

  const TestComponent = () => {
    const { theme, setTheme } = useTheme();
    return (
      <div>
        <div data-testid="theme-name">{theme}</div>
        <button onClick={() => setTheme('classic')}>Set Classic</button>
        <button onClick={() => setTheme('typewriter')}>Set Typewriter</button>
      </div>
    );
  };

  test('should load theme from localStorage on mount if available', () => {
    localStorageMock.setItem('theme', 'classic');
    // Spy on setItem before rendering to ensure it's the initial load we're capturing
    const setItemSpy = jest.spyOn(localStorageMock, 'setItem');

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    expect(getByTestId('theme-name').textContent).toBe('classic');
    // The theme 'classic' is loaded, and then the useEffect runs, saving 'classic' back.
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'classic');
  });

  test('should initialize with default theme if localStorage is empty', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    expect(getByTestId('theme-name').textContent).toBe('default');
    // And then 'default' is saved to localStorage due to the useEffect
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'default');
  });

  test('should save theme to localStorage when theme changes', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Initial theme 'default' should be saved by useEffect
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'default');
    (localStorageMock.setItem as jest.Mock).mockClear(); // Clear mock for the next check

    act(() => {
      getByText('Set Classic').click();
    });
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'classic');
    expect(getByTestId('theme-name').textContent).toBe('classic');

    (localStorageMock.setItem as jest.Mock).mockClear();

    act(() => {
      getByText('Set Typewriter').click();
    });
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'typewriter');
    expect(getByTestId('theme-name').textContent).toBe('typewriter');
  });
});
