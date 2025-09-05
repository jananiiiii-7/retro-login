import { render, screen } from '@testing-library/react';
import App from './App';


test('renders login screen initially', () => {
render(<App />);
const linkElement = screen.getByText(/LOGIN/i);
expect(linkElement).toBeInTheDocument();
});