import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
    it('renderiza o nome da ótica e direitos autorais', () => {
        render(<Footer />);
        expect(screen.getByText(/Ótica do Brasil/i)).toBeInTheDocument();
        expect(screen.getByText(/© 2024 Ótica do Brasil/i)).toBeInTheDocument();
    });
}); 