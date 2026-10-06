import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './contexts/authContext';

jest.mock('axios', () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn() },
}));

test('renders the sign-in screen when logged out', () => {
  render(<AuthProvider><App /></AuthProvider>);
  expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
});
