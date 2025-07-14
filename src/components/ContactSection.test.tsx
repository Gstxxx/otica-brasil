import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
    it('renderiza o título principal', () => {
        render(<ContactSection scrollY={0} />);
        expect(screen.getByText(/Entre em Contato/i)).toBeInTheDocument();
        expect(screen.getByText(/Volta Redonda - RJ/i)).toBeInTheDocument();
        expect(screen.getByText(/Macaé - RJ/i)).toBeInTheDocument();
    });
}); 